import { Textarea as UITextArea } from "@nextui-org/react";
import { ITextArea } from "../types/textArea";

const TextArea = (props: ITextArea) => {
  const { placeholder, value, onChange } = props;
  return (
    <>
      <UITextArea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full"
        size="lg"
      />
    </>
  );
};

export default TextArea;
