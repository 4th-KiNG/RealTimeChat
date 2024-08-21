export interface IUser {
  id: string;
  email: string;
  name: string;
  avatarURL: string | null;
  chatsId: string[] | null;
}
