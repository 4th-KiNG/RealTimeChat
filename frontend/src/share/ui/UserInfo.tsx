import { IUserInfo } from "../types/userInfoTypes";

const UserInfo = (props: IUserInfo) => {
  const { title, content } = props;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-base text-white/70">{title}</span>
      <p className="text-lg font-thin">{content}</p>
    </div>
  );
};

export default UserInfo;
