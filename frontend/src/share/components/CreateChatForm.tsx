import { useForm } from "react-hook-form";
import { Button, ErrorMessage, Input, Select } from "../ui";
import { IFormValues } from "../types/inputTypes";
import { useChats } from "../../lib/hooks/useChats";

const CreateChatForm = ({ setShowForm }: { setShowForm: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const { createChat } = useChats();

  const handleCreateChat = (data: IFormValues) => {
    createChat(data);
    setShowForm();
  };
  return (
    <>
      <div className="fixed top-0 left-0 bg-black/80 w-screen h-screen flex items-center justify-center">
        <form
          action=""
          className="flex flex-col max-w-2xl w-full bg-black p-4 gap-4"
        >
          <Input
            type="text"
            label="Имя чата"
            name="name"
            register={register}
            required
            requireMessage="Поле имени чата является обязательным"
          />
          {errors.name?.message && (
            <ErrorMessage message={errors.name.message} />
          )}
          <Select
            label="Статус чата"
            name="private"
            register={register}
            required
            requireMessage="Выберите статус чата"
            variants={["Публичный", "Приватный"]}
          />
          {errors.private?.message && (
            <ErrorMessage message={errors.private.message} />
          )}
          <div className="flex gap-3">
            <Button
              label="Создать чат"
              onClick={handleSubmit(handleCreateChat)}
            />
            <Button label="Отмена" onClick={setShowForm} />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateChatForm;
