import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateChat, DeleteChat, GetChats } from "../api/chatApi";
import { IFormValues } from "../../share/types/inputTypes";

export const useChats = () => {
  const { data: chats, refetch: refetchChats } = useQuery({
    queryKey: ["chats"],
    queryFn: GetChats,
  });

  const { mutate: createChat } = useMutation({
    mutationKey: ["create chat"],
    mutationFn: (data: IFormValues) => CreateChat(data),
    onSuccess: () => refetchChats(),
  });

  const { mutate: deleteChat } = useMutation({
    mutationKey: ["delete chat"],
    mutationFn: (chatId: string) => DeleteChat(chatId),
    onSuccess: () => refetchChats(),
  });

  return { chats, refetchChats, createChat, deleteChat };
};
