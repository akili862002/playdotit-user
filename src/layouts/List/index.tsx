import { PropsWithChildren } from "react";

interface IListLayoutProps {
  className?: string;
  title: string;
  subTitle?: string | number;
  rightSide?: React.ReactNode;
}

const ListLayout: React.FC<PropsWithChildren<IListLayoutProps>> = ({
  children,
  className = "",
  title = "",
  subTitle = "",
  rightSide = null,
}) => {
  return (
    <div className={"w-full " + className}>
      <div className="flex flex-row justify-between">
        <h2 className="sm:text-3xl text-xl  dark:text-white font-bold mb-0.5">
          {title}
          <p className="inline-block ml-1 text-sm font-normal dark:text-silver text-gray">
            {subTitle}
          </p>
        </h2>
        {rightSide}
      </div>
      <hr className="w-full opacity-50 border-silver" />
      <div className="w-full mt-1.5">{children}</div>
    </div>
  );
};

export default ListLayout;
