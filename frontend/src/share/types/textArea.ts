import { ChangeEvent } from "react";

export interface ITextArea {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
