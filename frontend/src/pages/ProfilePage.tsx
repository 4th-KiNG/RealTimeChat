import { observer } from "mobx-react-lite";
import { Button, Image, UserInfo } from "../share/ui";
import { IUserInfo } from "../share/types/userInfoTypes";
import { useAuth } from "../lib/hooks/useAuth";
import { useRef } from "react";

const ProfilePage = observer(() => {
  const { user, SignOut, ChangeAvatarData, userAvatar } = useAuth();
  const avatarRef = useRef<HTMLInputElement>(null);
  const userData: IUserInfo[] = [
    {
      title: "Почта",
      content: user.email,
    },
    {
      title: "Имя",
      content: user.name,
    },
  ];
  return (
    <>
      <div className="p-10 grid grid-cols-layout max-[900px]:flex flex-col max-[900px]:items-center gap-6">
        <div className="flex flex-col gap-4">
          <Image
            src={userAvatar ? userAvatar : ""}
            className="rounded-lg w-[250px] h-[250px] object-cover"
            onClick={() => avatarRef.current?.click()}
          />
          <Button label="Выйти" onClick={SignOut} />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-thin">Данные о пользователе</h3>
          {userData.map((data, index) => (
            <UserInfo key={index} {...data} />
          ))}
        </div>
      </div>
      <input
        type="file"
        ref={avatarRef}
        className="hidden"
        onChange={() => {
          if (avatarRef.current && avatarRef.current.files)
            ChangeAvatarData(avatarRef.current.files[0]);
        }}
      />
    </>
  );
});

export default ProfilePage;
