"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Textarea } from "@/app/_components/ui/textarea";
import { MdCheck, MdOutlineClose } from "react-icons/md";
import { type SubmitHandler, useForm } from "react-hook-form";
import { ppcSchema, type PPCValues } from "@/types/validation/ppc_form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { useCourses } from "@/hooks/useCourses";
import { useState, useCallback, useMemo } from "react";
import { MessageBox } from "@/app/_components/ui/messageBox";
import { useRouter } from "next/navigation";
import { createPpc } from "@/app/_actions/pedagogical-project/createPpc";
import { updatePpc } from "@/app/_actions/pedagogical-project/updatePpc";
import { PPC } from "@/types/ppc";

interface PPCFormProps {
  title?: string;
  data?: PPC;
  isUpdate?: boolean;
}

export const PPCForm = ({ title, data, isUpdate }: PPCFormProps) => {
  const { session } = useAuth();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const courses = useCourses();
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 20 }, (_, i) => currentYear - i);
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      hasTCC: data?.hasTCC ?? false,
      status: data?.status ?? true,
      year: data?.year ?? currentYear,
      complementaryHours: data?.complementaryHours ?? 0,
      workload: data?.workload ?? 0,
      extensionCourses: data?.extensionCourses ?? 0,
      stageHours: data?.stageHours ?? 0,
      description: data?.description ?? "",
      course_id: data?.course_id ?? "",
    }),
    [data, currentYear],
  );

  const form = useForm<PPCValues>({
    resolver: zodResolver(ppcSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
  } = form;

  const onSubmitForm: SubmitHandler<PPCValues> = async (formData) => {
    try {
      if (isUpdate && data?.id) {
        await updatePpc(data.id, formData, session);
        form.reset(defaultValues);
        router.refresh();
      } else {
        await createPpc(formData, session);
        form.reset(defaultValues);
        router.refresh();
      }
      setShowMessage(true);
    } catch (err) {
      throw err;
    }
  };

  const handleReset = useCallback(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const handleCloseMessage = useCallback(() => {
    setShowMessage(false);
  }, []);

  if (!courses)
    return <p className="text-md text-muted-foreground">Carregando...</p>;

  return (
    <Card className="w-full max-w-md mx-auto shadow-sm">
      <CardHeader className="border-b pb-2 pt-4 px-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-xs">
          Preencha os detalhes do Projeto Pedagógico de Curso
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 px-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="course_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-xs">
                      Curso
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full h-8 text-sm">
                          <SelectValue placeholder="Selecione um curso" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses?.map((course) => (
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
                      <FormLabel className="font-semibold text-xs">
                        Ano
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value.toString()}
                          onValueChange={(value) => value.toString()}
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
                      <FormLabel className="font-semibold text-xs">
                        TCC
                      </FormLabel>
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
                      <FormLabel className="font-semibold text-xs">
                        Ativo
                      </FormLabel>
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

            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">
                Carga Horária
              </div>

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="workload"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xs">
                        Horas Totais
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Horas totais"
                          id="workload"
                          className="h-8 text-sm"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10) || 0)
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xs">
                        Horas de extensão
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Horas totais"
                          type="number"
                          id="extensionCourses"
                          className="h-8 text-sm"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10) || 0)
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xs">
                        Horas complementares
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Horas"
                          id="complementaryHours"
                          className="h-8 text-sm"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10) || 0)
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-xs">
                        Horas de estágio
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Horas"
                          id="stageHours"
                          className="h-8 text-sm"
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10) || 0)
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

            <CardFooter className="flex justify-between pt-2 px-0 pb-0">
              <Button
                type="button"
                onClick={handleReset}
                variant="outline"
                size="sm"
                className="h-8"
              >
                <MdOutlineClose className="h-3 w-3 mr-1" />
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || (!isDirty && isUpdate)}
                variant="default"
                size="sm"
                className="h-8"
              >
                <MdCheck className="h-3 w-3 mr-1" />
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </CardFooter>
          </form>
        </Form>
        {!data && (
          <MessageBox
            title="Ação bem sucedida"
            description={"A criação do PPC foi bem sucedida."}
            state={showMessage}
            onClose={handleCloseMessage}
          />
        )}
      </CardContent>
    </Card>
  );
};
