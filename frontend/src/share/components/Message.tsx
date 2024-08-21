import { useAuth } from "../../lib/hooks/useAuth";
import { IMessage } from "../types/messageTypes";

const Message = (props: IMessage) => {
  const { ownerId, content, createDate } = props;
  const { user } = useAuth();
  const time = createDate.split(" ")[1];
  return (
    <>
      <div
        className={`py-2 p-4 flex flex-col text-xl ${
          user.id === ownerId ? "bg-blue-600 ml-auto" : "bg-[#27262b]"
        } max-w-[280px] w-max rounded-lg text-wrap break-words max-[700px]:text-base`}
      >
        <p>{content}</p>
        <span className="text-[14px] ml-auto w-max">
          {time.split(":")[0] + ":" + time.split(":")[1]}
        </span>
      </div>
    </>
  );
};

export default Message;
