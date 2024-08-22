import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/hooks/useAuth";
import { IChat } from "../types/chatTypes";
import { Button } from "../ui";
import { basket } from "../../assets/images";
import { useChats } from "../../lib/hooks/useChats";

const Chat = (props: IChat) => {
  const { name, id, ownerId, isPrivate, usersId } = props;
  const { user } = useAuth();
  const { deleteChat } = useChats();
  const nav = useNavigate();
  return (
    <>
      <div className="flex relative flex-col gap-4 p-4 bg-black max-w-full w-full rounded-lg items-center mx-auto max-[900px]:max-w-full">
        {ownerId === user.id && (
          <img
            src={basket}
            className="w-5 h-5 absolute right-3 top-3"
            onClick={() => deleteChat(id)}
            alt=""
          />
        )}
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
