import { useMutation, useQuery } from "@tanstack/react-query";
import { GetUser, SignInUser, SignUpUser } from "../api/userApi";
import { IUser } from "../../share/types/userTypes";
import { IFormValues } from "../../share/types/inputTypes";

const defaultUser: IUser = {
  id: "",
  email: "",
  name: "",
  avatarURL: null,
  chatsId: null,
};

export const useAuth = () => {
  const {
    data: user,
    error,
    refetch: refetchUserData,
  } = useQuery<IUser>({
    queryKey: ["user"],
    queryFn: GetUser,
    enabled: !!localStorage.getItem("jwt"),
    initialData: defaultUser,
    retry: 0,
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

  const SignOut = () => {
    localStorage.clear();
    refetchUserData();
  };

  return {
    user,
    error,
    SignInData,
    SignUpData,
    SignOut,
    refetchUserData,
    SignInErrors,
    SignUpErrors,
  };
};
