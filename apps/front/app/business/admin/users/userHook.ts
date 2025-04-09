import { useState } from "react";
import FormSchemaUsers from "./formSchema";
import { toast } from "@/hooks/use-toast";
import { set } from "react-hook-form";
import { z } from "zod";

const users = [
  {
    id: 1,
    name: "User 1",
    email: "user1@example.com",
    password: "password1",
    actived: "Administrador",
  },
  {
    id: 2,
    name: "User 2",
    email: "user2@example.com",
    password: "password2",
    actived: "Membro",
  },
  {
    id: 3,
    name: "User 3",
    email: "user3@example.com",
    password: "password3",
    actived: "Membro",
  },
];

export default function UsersHook() {
  const { formSchema } = FormSchemaUsers();

  const initiation: z.infer<typeof formSchema> = {
    name: "",
    email: "",
    password: "",
    actived: undefined,
  };
  const [value, setValue] = useState<z.infer<typeof formSchema>>(initiation);

  const filterUsers = users.filter((item) => {
    return (
      (!value.name ||
        item.name.toLowerCase().includes(value.name.toLowerCase())) &&
      (value.actived === "Administrador" ||
        value.actived === "Membro" ||
        value.actived === undefined)
    );
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);

    setValue({ ...data });
    toast({
      title: "Usuário criado com sucesso!",
    });
  };

  const resetForm = () => {
    setValue(initiation);
  };

  return { formSchema, onSubmit, filterUsers, resetForm };
}
