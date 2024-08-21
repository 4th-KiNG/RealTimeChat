import { useState } from "react";
import { Button } from "../share/ui";
import { Chat, CreateChatForm } from "../share/components";
import { IChat } from "../share/types/chatTypes";
import { useChats } from "../lib/hooks/useChats";

const MainPage = () => {
  const [isShowForm, setShowForm] = useState(false);

  const { chats } = useChats();

  return (
    <>
      <div className="flex p-4 flex-col">
        <div className="max-w-36 ml-auto">
          <Button label="Создать чат +" onClick={() => setShowForm(true)} />
        </div>
        <div className="grid mt-3 grid-cols-4 gap-3 max-[1500px]:grid-cols-3 max-[1200px]:grid-cols-2 max-[900px]:grid-cols-1">
          {chats
            ? chats.map((chat: IChat) => <Chat {...chat} key={chat.id} />)
            : ""}
        </div>
      </div>
      {isShowForm && <CreateChatForm setShowForm={() => setShowForm(false)} />}
    </>
  );
};

export default MainPage;
