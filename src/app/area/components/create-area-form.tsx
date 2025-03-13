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

export const AreaForm = ({ title, description }: FormProps) => {
  const { session } = useAuth();
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const defaultValues: AreaValues = {
    name: "",
  };

  const onSubmitForm: SubmitHandler<AreaValues> = async (formData) => {
    await createArea(session, formData);
    setShowMessage(true);
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (
    <div>
      <FormCard<AreaValues>
        schema={areaSchema}
        onSubmit={onSubmitForm}
        description={description}
        defaultValues={defaultValues}
        weight="md"
        title={title}
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
