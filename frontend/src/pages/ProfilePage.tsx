import { observer } from "mobx-react-lite";
import { defaultAvatar } from "../assets/images";
import { Button, UserInfo } from "../share/ui";
import { IUserInfo } from "../share/types/userInfoTypes";
import { useAuth } from "../lib/hooks/useAuth";

const ProfilePage = observer(() => {
  const { user, SignOut } = useAuth();
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
      <div className="p-10 grid grid-cols-layout gap-6">
        <div className="flex flex-col gap-4">
          <img src={defaultAvatar} className="rounded-lg" alt="" />
          <Button label="Выйти" onClick={SignOut} />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-thin">Данные о пользователе</h3>
          {userData.map((data, index) => (
            <UserInfo key={index} {...data} />
          ))}
        </div>
      </div>
    </>
  );
});

export default ProfilePage;
