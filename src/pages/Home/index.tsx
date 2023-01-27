import BaseButton from "@/components/BaseButton";
import PlaylistCard from "@/components/PlaylistCard";
import { IPlaylist } from "@/typings";
import { useEffect, useState } from "react";
import Dialog from "@/components/Dialog";
import TextField from "@/components/TextField";
import { Form, Formik } from "formik";
import * as yup from "yup";
import AddNewSongIcon from "@/icons/AddNewSong";
import { PLAYLIST_LOCAL_STORAGE_KEY_SIGN } from "@/constants/localStorage";
import { renderPlaylistId } from "@/util/playlist";
import ErrorBoundary from "@/components/ErrorBoundary";
import AlertDialog from "@/components/AlertDialog";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "@/routes";
import { useLocales } from "@/hooks/useLanguage";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = (props) => {
  const { t } = useLocales(["home"]);
  const [listPlaylist, setListPlaylist] = useState<IPlaylist[]>([]);
  const [bool, reRender] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const listPlaylist: IPlaylist[] = [];
    const allLocalStorage = { ...window.localStorage };
    for (let key in allLocalStorage) {
      if (key.includes(PLAYLIST_LOCAL_STORAGE_KEY_SIGN))
        listPlaylist.push(JSON.parse(allLocalStorage[key]));
    }
    setListPlaylist(listPlaylist);
  }, [bool]);

  return (
    <div className="mb-5 mt-7">
      <h1 className="text-5xl font-bold text-black dark:text-white">
        {t("home.my-playlists")}
      </h1>
      <hr className="opacity-50 border-silver" />
      <div className="grid mt-5 grid-cols-2 sm:grid-cols-4 w-full gap-2  sm:gap-3.5">
        <ErrorBoundary>
          <AddPlaylistCard />
        </ErrorBoundary>
        {listPlaylist.map((playlist) => (
          <ErrorBoundary key={playlist._id}>
            <Link to={PATHS.PLAYLIST.replace(":id", playlist._id)}>
              <PlaylistCard
                playlist={playlist}
                onRemove={() => {
                  setConfirmDeleteId(
                    PLAYLIST_LOCAL_STORAGE_KEY_SIGN + playlist._id
                  );
                  reRender(!bool);
                }}
              />
            </Link>
          </ErrorBoundary>
        ))}
      </div>

      <AlertDialog
        title={"Xóa playlist"}
        message={"Bạn có chắc chắn muốn xóa playlist này không ?"}
        open={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={(closeDialog) => {
          window.localStorage.removeItem(confirmDeleteId || "");
          reRender(!bool);
          closeDialog();
        }}
      />
    </div>
  );
};

export default Home;

type IFormValues = {
  name: string;
};

const AddPlaylistCard: React.FC<{}> = (props) => {
  const { t } = useLocales(["home", "common"]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [initValues] = useState<IFormValues>({ name: "" });
  const nav = useNavigate();

  const [validateSchema] = useState(
    yup.object().shape<{ [k in keyof IFormValues]: any }>({
      name: yup
        .string()
        .max(20, t("common.too-long"))
        .required(t("common.required-field")),
    })
  );

  return (
    <>
      <BaseButton
        onClick={() => setIsOpenDialog(true)}
        className="w-full h-full cursor-pointer group rounded-15 bg-linear"
        style={{
          minHeight: "200px",
          background:
            "linear-gradient(39.12deg, rgba(164, 171, 184, 0.74) -9.53%, #F3F5F7 126.43%)",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-1 transition duration-300 transform group-hover:scale-110">
          <AddNewSongIcon className="w-10 h-10" />
          <p className="text-sm font-semibold text-gray ">
            {t("home.create-playlist")}
          </p>
        </div>
      </BaseButton>

      <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
        <Dialog.Header>{t("home.create-playlist")}</Dialog.Header>
        <Dialog.Content>
          <Formik
            initialValues={initValues}
            onSubmit={(values) => {
              const id = renderPlaylistId(values.name);
              const newPlaylist: IPlaylist = {
                _id: id,
                name: values.name,
                storedId: PLAYLIST_LOCAL_STORAGE_KEY_SIGN + id,
                songs: [],
                createdAt: new Date().toString(),
              };
              window.localStorage.setItem(
                newPlaylist.storedId,
                JSON.stringify(newPlaylist)
              );
              setIsOpenDialog(false);
              nav(`/playlist?id=${id}`);
            }}
            validationSchema={validateSchema}
          >
            <Form>
              <TextField label={t("home.playlist-name")} name="name" />
              <Dialog.ActionButtons onClose={() => setIsOpenDialog(false)} />
            </Form>
          </Formik>
        </Dialog.Content>
      </Dialog>
    </>
  );
};
