import axios from "axios";
import { IP } from "../utils/consts";
import { IMessage } from "../../share/types/messageTypes";

export const GetMessages = async (chatId: string) => {
  const { data } = await axios<IMessage[]>({
    method: "get",
    url: `${IP}/message?chatId=${chatId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return data;
};
