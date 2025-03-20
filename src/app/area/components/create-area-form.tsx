"use client";
import { useAuth } from "@/app/_components/auth/AuthContext";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/ui/form";
import { areaSchema, AreaValues } from "@/types/validation/area_form";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { Input } from "@/app/_components/ui/input";
import { createArea } from "@/app/_actions/area/createArea";
import { FormCard } from "@/app/_components/ui/form-card";
import { FormProps } from "@/types/form-props";
import { MessageBox } from "@/app/_components/ui/messageBox";
import { Area } from "@/types/area";
import { updateArea } from "@/app/_actions/area/updateArea";

interface AreaFormProps extends Readonly<FormProps> {
  data?: Area;
}

export const AreaForm = ({
  title,
  description,
  isUpdate,
  data,
  onCompleteUpdate,
}: AreaFormProps) => {
  const { session } = useAuth();
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const defaultValues: AreaValues = {
    name: data?.name ?? "",
  };

  const onSubmitForm: SubmitHandler<AreaValues> = async (formData) => {
    if (isUpdate && data?.id && onCompleteUpdate) {
      await updateArea(session, data.id, formData);
      onCompleteUpdate();
    } else {
      await createArea(session, formData);
      setShowMessage(true);
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (
    <div>
      <FormCard<AreaValues>
        schema={areaSchema}
        defaultValues={defaultValues}
        title={title}
        description={description}
        onSubmit={onSubmitForm}
        width="sm"
        isUpdate={isUpdate}
      >
        {(form) => (
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-sm">Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome da área"
                      type="text"
                      id="name"
                      className="h-8 text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
          </div>
        )}
      </FormCard>
      <MessageBox
        description="Uma nova área foi criada."
        state={showMessage}
        onClose={handleCloseMessage}
        title="Área criada"
      />
    </div>
  );
};
