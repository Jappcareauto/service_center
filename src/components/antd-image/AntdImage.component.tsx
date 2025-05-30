import { Image, ImageProps } from "antd";

const AntdImage = ({ ...props }: ImageProps) => {
  return <Image {...props} />;
};

export default AntdImage;
