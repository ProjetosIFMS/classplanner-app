"use client";

import { type SubmitHandler } from "react-hook-form";
import {
  modalitySchema,
  type ModalityValues,
} from "@/types/validation/modality_form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../_components/ui/form";
import { useAuth } from "../../_components/auth/AuthContext";
import { Input } from "../../_components/ui/input";
import { useState } from "react";
import { Modality } from "@/types/modality";
import { useRouter } from "next/navigation";
import { updateModality } from "../../_actions/modality/updateModality";
import { createModality } from "../../_actions/modality/createModality";
import { MessageBox } from "../../_components/ui/messageBox";
import { FormCard } from "@/app/_components/ui/form-card";

interface ModalityFormProps {
  data?: Modality;
  isUpdate?: boolean;
  title: string;
  description: string;
}

const ModalityForm = ({
  data,
  isUpdate,
  title,
  description,
}: ModalityFormProps) => {
  const {
    session,
    commonData: { modalities },
  } = useAuth();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const router = useRouter();

  const defaultValues: ModalityValues = {
    name: "",
  };

  const onSubmitForm: SubmitHandler<ModalityValues> = async (formData) => {
    if (isUpdate && data?.id) {
      await updateModality(formData, session, data.id);
      router.refresh();
    } else {
      await createModality(formData, session);
      setShowMessage(true);
      router.refresh();
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  if (!modalities)
    return <p className="text-muted-foreground text-md">Carregando...</p>;

  return (
    <div>
      <FormCard
        schema={modalitySchema}
        onSubmit={onSubmitForm}
        defaultValues={defaultValues}
        weight="md"
        title={title}
        description={description}
      >
        {(form) => (
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
        )}
      </FormCard>
      <MessageBox
        title={"Ação bem sucedida"}
        description={"A modalidade foi registrada."}
        state={showMessage}
        onClose={handleCloseMessage}
      />
    </div>
  );
};

export default ModalityForm;
