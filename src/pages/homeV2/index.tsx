import BaseButton from "components/BaseButton";
import PlaylistCard from "components/PlaylistCard";
import SVG from "components/SVG";
import { IPlaylist } from "typings";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import Dialog from "components/Dialog";
import TextField from "components/TextField";
import { Form, Formik } from "formik";
import * as yup from "yup";
import useLocalStorage from "hooks/useLocalStorage";
import { randomId } from "util/random";

interface IHomeV2Props {}

const HomeV2: React.FC<IHomeV2Props> = props => {
  const [listPlaylist, setListPlaylist] = useState<IPlaylist[]>([]);
  const [bool, reRender] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const listPlaylist: IPlaylist[] = [];
    const allLocalStorage = { ...window.localStorage };
    for (let key in allLocalStorage) {
      listPlaylist.push(JSON.parse(allLocalStorage[key]));
    }
    setListPlaylist(listPlaylist);
  }, [bool]);

  return (
    <div className="mt-7">
      <h1 className="text-5xl font-bold text-black">Your playlists</h1>
      <hr className="opacity-50 border-silver" />
      <div className="grid mt-5 grid-cols-2 sm:grid-cols-4 w-full gap-3.5">
        {listPlaylist.map(playlist => (
          <PlaylistCard
            key={playlist._id}
            playlist={playlist}
            onClick={() => {
              history.push(`/playlist/${playlist._id}`);
            }}
            onRemove={() => {
              console.log("Remove ", playlist._id);
              window.localStorage.removeItem(playlist._id);
              reRender(!bool);
            }}
          />
        ))}
        <AddPlaylistCard />
      </div>
    </div>
  );
};

export default HomeV2;

const validateSchema = yup.object().shape<{ name: any }>({
  name: yup.string().max(20, "Too long!").required("This field is required!"),
});

const AddPlaylistCard: React.FC<{}> = props => {
  const history = useHistory();
  const [id] = useState(randomId());
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [_, setLocalStorage] = useLocalStorage<IPlaylist | null>(id, null);
  return (
    <>
      <BaseButton
        onClick={() => setIsOpenDialog(true)}
        className="flex items-center justify-center w-full h-full cursor-pointer rounded-15 bg-alice-blue "
        style={{ minHeight: "200px" }}
      >
        <SVG name="playlist/add-new" className="w-10 h-10" />
      </BaseButton>
      <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
        <h1 className="text-3xl font-bold">Create new playlist</h1>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={values => {
            const newPlaylist: IPlaylist = {
              _id: id,
              name: values.name,
              songs: [],
              createdAt: new Date().toString(),
            };
            setLocalStorage(newPlaylist);
            setIsOpenDialog(false);
            history.push(`/playlist/${id}`);
          }}
          validationSchema={validateSchema}
        >
          <Form className="mt-2">
            <TextField label="Playlist name" name="name" />

            <div className="flex flex-row justify-end w-full gap-2 mt-3 font-bold text-md">
              <BaseButton className="px-2 py-1 font-bold text-black bg-alice-blue rounded-8">
                Close
              </BaseButton>
              <BaseButton
                className="px-2 py-1 text-white bg-black rounded-8"
                type="submit"
              >
                Create
              </BaseButton>
            </div>
          </Form>
        </Formik>
      </Dialog>
    </>
  );
};
