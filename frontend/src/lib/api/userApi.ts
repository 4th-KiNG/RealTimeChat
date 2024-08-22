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

export const ChangeAvatar = async (avatar: File, id: string) => {
  const sendAvatar = new FormData();
  sendAvatar.append("avatar", avatar);
  sendAvatar.append("id", id);
  const { data } = await axios({
    method: "post",
    url: `${IP}/user/avatar`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    data: sendAvatar,
  });
  return data;
};

export const GetAvatar = async (userId: string) => {
  const { data } = await axios({
    method: "get",
    url: `${IP}/user/avatar/${userId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    responseType: "blob",
  });
  const imageURL = URL.createObjectURL(data);
  return imageURL;
};

export const GetUserById = async (userId: string) => {
  const { data } = await axios({
    method: "get",
    url: `${IP}/user/${userId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });

  return data;
};
