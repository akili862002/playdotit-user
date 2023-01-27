import slugify from "slugify";
import { randomShortId } from "./random";

export const renderPlaylistId = (text: string) => {
  const id = slugify(text + " " + randomShortId(), { lower: true, trim: true });
  return id;
};
