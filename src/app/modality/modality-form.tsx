"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import {
  modalitySchema,
  type ModalitySchema,
} from "@/types/validation/modality_form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_components/ui/form";
import { useAuth } from "../_components/auth/AuthContext";
import { Input } from "../_components/ui/input";
import { Button } from "../_components/ui/button";
import { useMemo, useState } from "react";
import { Modality } from "@/types/modality";
import { useRouter } from "next/navigation";
import { updateModality } from "../_actions/modality/updateModality";
import { createModality } from "../_actions/modality/createModality";
import { MessageBox } from "../_components/ui/messageBox";
import { MdCheck, MdOutlineClose } from "react-icons/md";

interface ModalityFormProps {
  data?: Modality;
  isUpdate?: boolean;
  title: string;
}

const ModalityForm = ({data, isUpdate }: ModalityFormProps) => {
  const {
    session,
    commonData: { modalities },
  } = useAuth();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const router = useRouter();

  const defaultValues = useMemo<ModalitySchema>(
    () => ({
      name: data?.name ?? "",
    }),
    [data],
  );

  const form = useForm<ModalitySchema>({
    resolver: zodResolver(modalitySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = form;

  const onSubmitForm: SubmitHandler<ModalitySchema> = async (formData) => {
    if (isUpdate && data?.id) {
      await updateModality(formData, session, data.id);
      form.reset(defaultValues);
      router.refresh();
    } else {
      await createModality(formData, session);
      setShowMessage(true);
      form.reset();
      router.refresh();
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  if (!modalities)
    return <p className="text-muted-foreground text-md">Carregando...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100/50">
      <Card className="w-full max-w-md border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-medium">Crie uma modalidade</CardTitle>
          <CardDescription>Crie a modalidade à qual as disciplinas estarão vinculadas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      Nome <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da modalidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  onClick={() => {
                  form.reset();
                  }}
                  variant={"outline"}
                >
                  Cancelar
                  <MdOutlineClose className="ml-2" />
                </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || (!isDirty && isUpdate)}
                    variant={"default"}
                  >
                  {isSubmitting ? "Salvando..." : "Salvar"}
                    <MdCheck className="ml-2" />
                  </Button>
              </div>
            </form>
          </Form>
          <MessageBox
            title={"Ação bem sucedida"}
            description={"A modalidade foi registrada."}
            state={showMessage}
            onClose={handleCloseMessage}
          />
        </CardContent>
      </Card>
    </div>
  )
};

export default ModalityForm;
