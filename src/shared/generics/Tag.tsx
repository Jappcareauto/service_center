import { FC } from "react";
import { formatStatusText } from "../utils/formatText";

type Props = {
  tagText?: string;
};
const Tag: FC<Props> = ({ tagText }) => {
  const text = formatStatusText(tagText || "");
  return (
    <div
      className={
        "text-sm rounded-2xl px-3 first-letter:uppercase lowercase py-2 bg-primaryAccent whitespace-nowrap text-primary"
      }
    >
      {text}
    </div>
  );
};

export default Tag;
