import { useQuery } from "@tanstack/react-query";
import { GetMessages } from "../api/messageApi";
import { IMessage } from "../../share/types/messageTypes";

export const useMessages = (chatId: string) => {
  const { data: messages } = useQuery<IMessage[]>({
    queryKey: [`${chatId}`],
    queryFn: () => GetMessages(chatId),
  });

  return { messages };
};
