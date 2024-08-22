import { useAuth } from "../../lib/hooks/useAuth";
import { IMessage } from "../types/messageTypes";
import { Image } from "../ui";

const Message = (props: IMessage) => {
  const { ownerId, content, createDate } = props;
  const { user, userById, userByIdAvatar } = useAuth(ownerId);
  const time = createDate.split(" ")[1];
  return (
    <>
      {user.id === ownerId ? (
        <div
          className={`py-2 p-4 flex flex-col text-xl bg-blue-600 ml-auto max-w-[280px] w-max rounded-lg text-wrap break-words max-[700px]:text-base`}
        >
          <p>{content}</p>
          <span className="text-[14px] ml-auto w-max">
            {time.split(":")[0] + ":" + time.split(":")[1]}
          </span>
        </div>
      ) : (
        <div className="flex items-end gap-3">
          <Image
            src={userByIdAvatar ? userByIdAvatar : ""}
            className="w-[35px] h-[35px] rounded-full"
          />
          <div
            className={`py-2 p-4 flex flex-col text-xl bg-black max-w-[280px] w-max rounded-lg text-wrap break-words max-[700px]:text-base`}
          >
            <span className="text-small mb-2">{userById.name}</span>
            <p>{content}</p>
            <span className="text-[14px] ml-auto w-max">
              {time.split(":")[0] + ":" + time.split(":")[1]}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
