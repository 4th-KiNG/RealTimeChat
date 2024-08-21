import { useMutation, useQuery } from "@tanstack/react-query";
import { CreateChat, GetChats } from "../api/chatApi";
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

  return { chats, refetchChats, createChat };
};
