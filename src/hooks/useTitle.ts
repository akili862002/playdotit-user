import { useEffect, useState } from "react";

const APP_NAME = "Play.it";

export const renderTitle = (title: string | undefined = undefined) => {
  if (!title) return APP_NAME;
  return [title, APP_NAME].join(" | ");
};

export const useTitle = (initTitle: string = "") => {
  const [title, setTitle] = useState(initTitle);
  useEffect(() => {
    if (title) document.title = renderTitle(title);
  }, [title]);
  return { title, setTitle };
};
