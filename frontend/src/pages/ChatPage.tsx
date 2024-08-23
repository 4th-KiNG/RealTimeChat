import { useParams } from "react-router-dom";
import { sendArrow } from "../assets/images";
import { Message } from "../share/components";
import { IMessage } from "../share/types/messageTypes";
import { TextArea } from "../share/ui";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMessages } from "../lib/hooks/useMessages";
import { socket } from "../lib/sockets/messageSocket";
import { useAuth } from "../lib/hooks/useAuth";

const ChatPage = () => {
  const { chatId } = useParams<string>();
  const { messages } = useMessages(chatId ? chatId : "");
  const [Messages, setMessages] = useState<IMessage[]>([]);
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [areaValue, setAreaValue] = useState("");

  useEffect(() => {
    if (messages) setMessages(messages);
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  useEffect(() => {
    scrollToBottom();
    if (chatId) {
      socket.emit("joinChat", chatId);
      socket.on("receiveMessage", GetMessage);
      socket.on("updateMessages", UpdateMessage);

      return () => {
        socket.off("receiveMessage", GetMessage);
        socket.off("updateMessages", UpdateMessage);
      };
    }
  }, []);

  const GetMessage = (message: IMessage) =>
    setMessages((prevMessages) => [...prevMessages, message]);

  const UpdateMessage = (messageId: string) =>
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId)
    );
  const sendMessage = () => {
    if (areaValue !== "") {
      socket.emit("sendMessage", {
        ownerId: user.id,
        ownerName: user.name,
        content: areaValue,
        chatId: chatId,
      });
      setAreaValue("");
      scrollToBottom();
    }
  };

  const deleteMessage = (messageId: string) => {
    socket.emit("deleteMessage", {
      chatId: chatId,
      messageId: messageId,
    });
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) =>
    setAreaValue(e.target.value);

  return (
    <>
      <div className="relative h-[calc(100vh-80px)] grid grid-rows-[1fr_auto] max-[700px]:flex max-[700px]:justify-end flex-col">
        {Messages.length > 0 ? (
          <div className="flex flex-col gap-2 overflow-y-auto p-4">
            {Messages.map((message, index) => (
              <Message {...message} deleteFn={deleteMessage} key={index} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="flex justify-center items-center text-center max-[700px]:absolute top-1/2 left-1/2 max-[700px]:-translate-y-1/2 max-[700px]:-translate-x-1/2">
            <p>В этом чате пока нет сообщений</p>
          </div>
        )}
        <div className="items-center flex p-3 bg-black gap-2 max-w-[calc(100vw-250px)] max-[700px]:max-w-full w-full">
          <TextArea
            placeholder="Сообщение"
            value={areaValue}
            onChange={handleChangeValue}
          />
          <img
            src={sendArrow}
            className="w-7 cursor-pointer"
            alt="Send"
            onClick={sendMessage}
          />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
