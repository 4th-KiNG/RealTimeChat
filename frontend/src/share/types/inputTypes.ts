import { Path, UseFormRegister } from "react-hook-form";

export interface IInput {
  type: string;
  label: string;
  name: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  requireMessage: string;
  required: boolean;
  pattern?: { value: RegExp; message: string };
}

export interface ISelect {
  label: string;
  variants: string[];
  name: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  requireMessage: string;
  required: boolean;
}

export interface IFormValues {
  email?: string;
  name?: string;
  password?: string;
  private?: boolean;
}
