export interface IMessage {
  id: string;
  ownerId: string;
  content: string;
  createDate: string;
  chatId: string;
  deleteFn: (messageId: string) => void;
}
