import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/hooks/useAuth";
import { IChat } from "../types/chatTypes";
import { Button } from "../ui";

const Chat = (props: IChat) => {
  const { name, id, ownerId, isPrivate, usersId } = props;
  const { user } = useAuth();
  const nav = useNavigate();
  return (
    <>
      <div className="flex flex-col gap-4 p-4 bg-black max-w-full w-full rounded-lg items-center mx-auto max-[900px]:max-w-full">
        <h3 className="text-xl font-thin">{name}</h3>
        <div className="flex justify-between w-full text-lg">
          <p>Статус</p>
          <p className="font-thin">{isPrivate ? "Приватный" : "Публичный"}</p>
        </div>
        <div className="flex justify-between w-full text-lg">
          <p>Количество пользователей</p>
          <p className="font-thin">{usersId.length}</p>
        </div>
        <Button
          label={`${user.id === ownerId ? "Открыть чат" : "Вступить в чат"}`}
          onClick={() => nav(`chat/${id}`)}
        />
      </div>
    </>
  );
};

export default Chat;
