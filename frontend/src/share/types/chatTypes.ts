export interface IChat {
  id: string;
  name: string;
  ownerId: string;
  isPrivate: boolean;
  usersId: string[];
}
