import "./styles.scss";

interface ITooltipProps {
  text: string;
  className?: string;
}

const Tooltip: React.FC<ITooltipProps> = ({
  className,
  children,
  text = "",
}) => {
  return (
    <div
      className={`tooltip-container group relative inline-block ${className}`}
    >
      {children}
      {text && (
        <p className="absolute z-50 invisible px-1 text-xs text-center text-white transition bg-black rounded-sm opacity-0 tooltip-text -bottom-3 move-center-x rounded-4 whitespace-nowrap">
          {text}
        </p>
      )}
    </div>
  );
};

export default Tooltip;
