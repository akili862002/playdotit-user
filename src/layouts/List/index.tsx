interface IListLayoutProps {
  className?: string;
  title: string;
  leftSide?: React.ReactNode;
}

const ListLayout: React.FC<IListLayoutProps> = ({
  children,
  className = "",
  title = "",
  leftSide = null,
}) => {
  return (
    <div className={"w-full " + className}>
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-bold mb-0.5">{title}</h2>
        {leftSide}
      </div>
      <hr className="w-full border-silver opacity-50" />
      <div className="w-full mt-1.5">{children}</div>
    </div>
  );
};

export default ListLayout;
