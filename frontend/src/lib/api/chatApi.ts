import axios from "axios";
import { IFormValues } from "../../share/types/inputTypes";
import { IP } from "../utils/consts";

export const CreateChat = async (form: IFormValues) => {
  const { data } = await axios({
    method: "post",
    url: `${IP}/chat`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    data: {
      name: form.name,
      private: false,
    },
  });
  return data;
};

export const GetChats = async () => {
  const { data } = await axios({
    method: "get",
    url: `${IP}/chat`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return data;
};
