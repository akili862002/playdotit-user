import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import LinkCopy from "@/components/LinkCopy";
import { APP_DOMAIN } from "@/constants/env";
import { SHARE_KEY } from "@/constants/localStorage";
import { shareSignFormat } from "@/constants/share";
import useLocalStorage from "@/hooks/useLocalStorage";
import ShareIcon from "@/icons/Share";
import Share2Icon from "@/icons/Share2";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { createSharePlaylistLinkAPI } from "@/services/sharePlaylist";
import { randomShortId } from "@/util/random";
import { useLocales } from "@/hooks/useLanguage";
import { PATHS } from "@/routes";
import toast from "react-hot-toast";

interface ISharePlaylistProps {}

const SharePlaylist: React.FC<ISharePlaylistProps> = (props) => {
  const { t } = useLocales(["playlist"]);
  const [sharedSign, setSharedSign] = useLocalStorage(SHARE_KEY, "");
  const { playlist } = useSelector((state: IRootState) => state.playlist);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");

  useEffect(() => {
    if (!localStorage.getItem(SHARE_KEY)) {
      setSharedSign(shareSignFormat(randomShortId()));
    }
  }, []);

  useEffect(() => {
    // If something change in playlist, reset it
    setLink("");
  }, [playlist]);

  const handleSharePlaylist = async () => {
    if (link) return setIsOpen(true);

    try {
      setLoading(true);
      const { id } = (await createSharePlaylistLinkAPI(playlist, sharedSign)) || {};
      if (!id) return;
      setIsOpen(true);
      setLink(`${APP_DOMAIN}${PATHS.SHARE}?id=${id}`);
    } catch (error) {
      console.error(error);
      toast.error("Share link has some error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        loading={loading}
        onClick={handleSharePlaylist}
        className="px-2 mb-0.5 "
        icon={<ShareIcon className="w-2 h-2" />}
      >
        <p className="hidden sm:block">{t("playlist.share-playlist.button")}</p>
      </Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Header className="flex flex-row items-center gap-1">
          <Share2Icon />
          {t("playlist.share-playlist.title")}
        </Dialog.Header>
        <p className="font-normal text-md text-gray">
          {t("playlist.share-playlist.sub-title").replace("$1", playlist.name)}
        </p>
        <Dialog.Content>
          <LinkCopy link={link} />
        </Dialog.Content>

        <Dialog.ActionButtons
          variant="confirm"
          onConfirm={() => {}}
          onClose={() => setIsOpen(false)}
        />
      </Dialog>
    </>
  );
};

export default SharePlaylist;
