import {
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useAuth } from "../../lib/hooks/useAuth";
import { IMessage } from "../types/messageTypes";
import { Image } from "../ui";
import { copyIco, deleteIco, successIco } from "../../assets/images";
import { useOverlayTriggerState } from "react-stately";
import { useState } from "react";

const Content = ({
  deleteFn,
  closeFn,
  copiedMessage,
}: {
  deleteFn: () => void;
  closeFn: () => void;
  copiedMessage: string;
}) => {
  const [isCopied, setCopied] = useState(false);
  return (
    <PopoverContent>
      <Listbox>
        <ListboxItem key={"copy"}>
          {!isCopied ? (
            <div
              className="flex items-center gap-2"
              onClick={() => {
                setCopied(true);
              }}
            >
              <p>Copy</p>
              <img src={copyIco} className="w-3 h-3" alt="" />
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <p className="text-success">Copied</p>
              <img src={successIco} className="w-6 h-6" alt="" />
            </div>
          )}
        </ListboxItem>
        <ListboxItem key={"delete"}>
          <div
            className="flex items-center gap-2"
            onClick={() => {
              deleteFn();
              closeFn();
            }}
          >
            <p className="text-danger">Delete</p>
            <img src={deleteIco} className="w-3 h-3" alt="" />
          </div>
        </ListboxItem>
      </Listbox>
    </PopoverContent>
  );
};

const Message = (props: IMessage) => {
  const { ownerId, content, createDate, deleteFn, id } = props;
  const { user, userById, userByIdAvatar } = useAuth(ownerId);
  const time = createDate.split(" ")[1];
  const initialState = useOverlayTriggerState({});
  return (
    <>
      {user.id === ownerId ? (
        <Popover
          showArrow
          offset={10}
          placement="right"
          backdrop="blur"
          state={initialState}
        >
          <PopoverTrigger>
            <div
              className={`py-2 p-4 flex flex-col text-xl bg-blue-600 ml-auto max-w-[280px] w-max rounded-lg text-wrap break-words max-[700px]:text-base`}
            >
              <p>{content}</p>
              <span className="text-[14px] ml-auto w-max">
                {time.split(":")[0] + ":" + time.split(":")[1]}
              </span>
            </div>
          </PopoverTrigger>

          <Content
            deleteFn={() => deleteFn(id)}
            closeFn={() => initialState.close()}
            copiedMessage={content}
          />
        </Popover>
      ) : (
        <div className="flex items-end gap-3">
          <Image
            src={userByIdAvatar ? userByIdAvatar : ""}
            className="w-[35px] h-[35px] rounded-full"
          />
          <Popover showArrow offset={10} placement="right" backdrop="blur">
            <PopoverTrigger>
              <div
                className={`py-2 p-4 flex flex-col text-xl bg-black max-w-[280px] w-max rounded-lg text-wrap break-words max-[700px]:text-base`}
              >
                <span className="text-small mb-2">{userById.name}</span>
                <p>{content}</p>
                <span className="text-[14px] ml-auto w-max">
                  {time.split(":")[0] + ":" + time.split(":")[1]}
                </span>
              </div>
            </PopoverTrigger>
            <Content
              deleteFn={() => deleteFn(id)}
              closeFn={() => initialState.close()}
              copiedMessage={content}
            />
          </Popover>
        </div>
      )}
    </>
  );
};

export default Message;
