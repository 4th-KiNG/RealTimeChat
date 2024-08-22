import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ChangeAvatar,
  GetAvatar,
  GetUser,
  GetUserById,
  SignInUser,
  SignUpUser,
} from "../api/userApi";
import { IUser } from "../../share/types/userTypes";
import { IFormValues } from "../../share/types/inputTypes";

const defaultUser: IUser = {
  id: "",
  email: "",
  name: "",
  chatsId: null,
};

export const useAuth = (userId?: string) => {
  const {
    data: user,
    error,
    refetch: refetchUserData,
  } = useQuery<IUser>({
    queryKey: [`user`],
    queryFn: GetUser,
    enabled: !!localStorage.getItem("jwt"),
    initialData: defaultUser,
    retry: 0,
  });

  const { data: userById } = useQuery<IUser>({
    queryKey: [userId],
    queryFn: () => GetUserById(userId ? userId : ""),
    enabled: !!userId,
    initialData: defaultUser,
  });

  const { data: userByIdAvatar } = useQuery({
    queryKey: [`avatar ${userId}`],
    queryFn: () => GetAvatar(userId ? userId : ""),
    enabled: !!userId,
  });

  const { data: userAvatar, refetch: refetchAvatar } = useQuery({
    queryKey: [`user avatar ${localStorage.getItem("jwt")}`],
    queryFn: () => GetAvatar(user.id),
    enabled: !!user.id,
  });

  const { mutate: SignInData, isError: SignInErrors } = useMutation({
    mutationKey: ["sign in user"],
    mutationFn: (data: IFormValues) => SignInUser(data),
    onSuccess: () => refetchUserData(),
  });

  const { mutate: SignUpData, isError: SignUpErrors } = useMutation({
    mutationKey: ["sign up user"],
    mutationFn: (data: IFormValues) => SignUpUser(data),
    onSuccess: () => refetchUserData(),
  });

  const { mutate: ChangeAvatarData } = useMutation({
    mutationKey: ["change user avatar"],
    mutationFn: (avatar: File) => ChangeAvatar(avatar, user.id),
    onSuccess: () => {
      refetchUserData(), refetchAvatar();
    },
  });

  const SignOut = () => {
    localStorage.clear();
    refetchUserData();
  };

  return {
    user,
    userById,
    error,
    userAvatar,
    userByIdAvatar,
    SignInData,
    SignUpData,
    SignOut,
    refetchUserData,
    ChangeAvatarData,
    SignInErrors,
    SignUpErrors,
  };
};
