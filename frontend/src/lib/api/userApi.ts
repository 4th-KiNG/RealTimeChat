import { IFormValues } from "../../share/types/inputTypes";
import axios from "axios";
import { IUser } from "../../share/types/userTypes";
import { IP } from "../utils/consts";

export const SignUpUser = async (form: IFormValues) => {
  const { data } = await axios({
    method: "post",
    url: `${IP}/auth/signup`,
    data: form,
  });
  localStorage.setItem("jwt", data.jwt);
};

export const SignInUser = async (form: IFormValues) => {
  const { data } = await axios({
    method: "post",
    url: `${IP}/auth/signin`,
    data: form,
  });
  localStorage.setItem("jwt", data.jwt);
};

export const GetUser = async () => {
  const { data } = await axios<IUser>({
    method: "get",
    url: `${IP}/user`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return data;
};
