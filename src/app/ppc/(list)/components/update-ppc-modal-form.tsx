import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormItem,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectGroup,
} from "@/app/_components/ui/select";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";

import { ppcSchema, PPCValues } from "@/types/validation/ppc_form";
import { Session } from "@/types/session";
import { usePatchPPC } from "@/hooks/react-query/ppc";
import { useGetAllCourses } from "@/hooks/react-query/courses";
import { PPC } from "@/types/ppc";
import { UpdateDialogForm } from "@/app/_components/dialogs/update-dialog-form";

interface UpdatePPCmodalFormProps {
  session: Session;
  data: PPC;
}

export function UpdatePPCmodalForm({ session, data }: UpdatePPCmodalFormProps) {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 20 }, (_, i) => currentYear - i);

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const getCourses = useGetAllCourses(session);
  const patchPPC = usePatchPPC(session);

  const form = useForm<PPCValues>({
    resolver: zodResolver(ppcSchema),
    defaultValues: {
      hasTCC: data?.hasTCC ?? false,
      status: data?.status ?? true,
      year: data?.year ?? currentYear,
      complementaryHours: data?.complementaryHours ?? 0,
      workload: data?.workload ?? 0,
      extensionCourses: data?.extensionCourses ?? 0,
      stageHours: data?.stageHours ?? 0,
      description: data?.description ?? "",
      course_id: data?.course_id ?? "",
      document: data?.document,
    },
  });

  function onSubmit(formData: PPCValues) {
    patchPPC.mutate(
      { formData, ppc_id: data.id },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <UpdateDialogForm<PPCValues>
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      form={form}
      onSubmit={onSubmit}
      title="Criar PPC"
      description="Preencha os detalhes para a criação do PPC"
    >
      <>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="course_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-xs">Curso</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-8 text-sm">
                      <SelectValue placeholder="Selecione um curso" />
                    </SelectTrigger>
                    <SelectContent>
                      {getCourses?.data?.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs">Ano</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value.toString()}
                      onValueChange={(value) =>
                        field.onChange(value.toString())
                      }
                    >
                      <SelectTrigger id="year" className="h-8 text-sm">
                        <SelectValue placeholder="Ano" />
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        className="max-h-[200px]"
                      >
                        <SelectGroup>
                          {yearOptions.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasTCC"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs">TCC</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? "true" : "false"}
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                    >
                      <SelectTrigger id="hasTCC" className="h-8 text-sm">
                        <SelectValue placeholder="TCC" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectGroup>
                          <SelectItem value="true">Sim</SelectItem>
                          <SelectItem value="false">Não</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs">Ativo</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? "true" : "false"}
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                    >
                      <SelectTrigger id="status" className="h-8 text-sm">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectGroup>
                          <SelectItem value="true">Sim</SelectItem>
                          <SelectItem value="false">Não</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs mt-4 font-medium text-muted-foreground">
            Carga Horária
          </div>

          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="workload"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...formProps } }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs">
                    Horas Totais
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...formProps}
                      type="number"
                      placeholder="Horas totais"
                      id="workload"
                      className="h-8 text-sm"
                      onChange={(e) =>
                        onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="extensionCourses"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...formProps } }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs">
                    Horas de extensão
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...formProps}
                      placeholder="Horas totais"
                      type="number"
                      id="extensionCourses"
                      className="h-8 text-sm"
                      onChange={(e) =>
                        onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="complementaryHours"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...formProps } }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs">
                    Horas complementares
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...formProps}
                      type="number"
                      placeholder="Horas"
                      id="complementaryHours"
                      className="h-8 text-sm"
                      onChange={(e) =>
                        onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stageHours"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xs">
                    Horas de estágio
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="number"
                      placeholder="Horas"
                      id="stageHours"
                      className="h-8 text-sm"
                      onChange={(e) =>
                        onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-xs">
                  Descrição
                </FormLabel>
                <FormControl>
                  <Textarea
                    value={field.value}
                    onChange={field.onChange}
                    id="description"
                    className="resize-none h-[100px] text-sm"
                    placeholder="Descreva o projeto pedagógico..."
                  />
                </FormControl>
                <FormMessage className="text-[10px]" />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-2">
          <FormField
            control={form.control}
            name="document"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel className="font-semibold text-xs">
                  Documento do Projeto Pedagógico de Curso
                </FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="image/*, application/pdf"
                    onChange={(e) => handleFileChange(e, onChange)}
                    placeholder="Insira o documento"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </>
    </UpdateDialogForm>
  );
}
