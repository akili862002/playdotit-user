import { PropsWithChildren } from "react";

interface IBlogContentProps {
  className?: string;
}

const BlogContent: React.FC<PropsWithChildren<IBlogContentProps>> = ({
  children,
  className = "",
}) => {
  return <div className={"blog-content " + className}>{children}</div>;
};

export default BlogContent;
