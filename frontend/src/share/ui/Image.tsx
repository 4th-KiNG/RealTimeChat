import { IImage } from "../types/imageTypes";
import { Image as UIImage } from "@nextui-org/react";

const Image = (props: IImage) => {
  const { src, className, onClick } = props;
  return (
    <>
      <UIImage
        src={src}
        className={`${className} relative z-0`}
        onClick={onClick}
      />
    </>
  );
};

export default Image;
