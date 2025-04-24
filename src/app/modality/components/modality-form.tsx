"use client";

import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../_components/ui/form";
import { MessageBox } from "../../_components/ui/messageBox";
import { Input } from "../../_components/ui/input";
import { LoadingCard } from "@/app/_components/ui/loading-card";
import { FormCard } from "@/app/_components/ui/form-card";

import {
  modalitySchema,
  type ModalityValues,
} from "@/types/validation/modality_form";
import { useAuth } from "../../_components/auth/AuthContext";
import { Modality } from "@/types/modality";
import { FormProps } from "@/types/form-props";
import {
  usePatchModality,
  usePostModality,
} from "@/hooks/react-query/modalities";

interface ModalityFormProps extends Readonly<FormProps> {
  data?: Modality;
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
  const postModality = usePostModality(session);
  const patchModality = usePatchModality(session);

  const defaultValues: ModalityValues = {
    name: "",
  };

  const onSubmitForm: SubmitHandler<ModalityValues> = async (formData) => {
    if (isUpdate && data?.id) {
      await patchModality.mutateAsync({ data: formData, modality_id: data.id });
    } else {
      await postModality.mutateAsync(formData);
      setShowMessage(true);
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  if (!modalities) return <LoadingCard />;

  return (
    <div>
      <FormCard
        schema={modalitySchema}
        onSubmit={onSubmitForm}
        defaultValues={defaultValues}
        width="md"
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
