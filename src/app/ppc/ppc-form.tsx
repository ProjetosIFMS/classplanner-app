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
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { ppcSchema, PPCSchema } from "@/types/validation/forms";
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
import { useEffect, useState } from "react";
import { getCourses } from "@/app/_actions/getCourses";
import { Course } from "@/types/course";
import { useRouter } from "next/navigation";
import { PPC } from "@/types/ppc";
import { createPpc, updatePpc } from "./actions";

interface PPCFormProps {
  title: string;
  data?: PPC;
}

export const PPCForm = ({ title, data }: PPCFormProps) => {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const isUpdate = Boolean(data?.id);
  const { session } = useAuth();
  const router = useRouter();
  const form = useForm<PPCSchema>({
    resolver: zodResolver(ppcSchema),
    defaultValues: {
      hasTCC: data?.hasTCC ? data.hasTCC : false,
      status: data?.status ? data.status : true,
      year: data?.year ? data.year : 2025,
      complementaryHours: data?.complementaryHours
        ? data.complementaryHours
        : 0,
      workload: data?.workload ? data.workload : 0,
      extensionCourses: data?.extensionCourses ? data.extensionCourses : 0,
      stageHours: data?.stageHours ? data.stageHours : 0,
      description: data?.description ? data.description : "",
      course_id: data?.course_id ? data.course_id : "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    const fetchCourses = async (session: string) => {
      const res = await getCourses(session);
      setCourses(res);
    };

    if (!session) {
      return;
    }
    fetchCourses(session);
  }, [session]);

  const onSubmitForm: SubmitHandler<PPCSchema> = async (formData) => {
    if (isUpdate && data?.id) {
      updatePpc(data.id, formData, session);
    } else {
      createPpc(formData, session);
    }
    form.reset();
    router.push("/");
  };

  const onErrorForm: SubmitErrorHandler<PPCSchema> = (data) => {
    console.log(data);
  };

  const stringToBoolean = (value: string): boolean => {
    return value === "true";
  };

  const booleanToString = (value: boolean): string => {
    return value ? "true" : "false";
  };

  return (
    <Card className="w-[450px] max-h-[800px]">
      <CardHeader>
        <CardTitle> {title}</CardTitle>
        <CardDescription>
          Preencha os detalhes do Projeto Pedagógico de Curso
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmitForm, onErrorForm)}>
            <div className="grid w-full items-center gap-6 mb-4">
              <div className="flex flex-row justify-center w-full">
                <FormField
                  control={form.control}
                  name="course_id"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Curso
                        </FormLabel>
                        <FormControl>
                          <Select
                            name="course_id"
                            onValueChange={field.onChange}
                            defaultValue={
                              form.formState.defaultValues?.course_id
                            }
                            required
                          >
                            <SelectTrigger className="w-[400px] min-w-[150px]">
                              <SelectValue placeholder="Selecione um curso" />
                              <SelectContent>
                                {courses?.map((values, index) => (
                                  <SelectItem key={index} value={values.id}>
                                    {values.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </SelectTrigger>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex flex-row justify-center w-full">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Ano de Criação
                        </FormLabel>
                        <FormControl>
                          <Select
                            name="year"
                            onValueChange={field.onChange}
                            required
                            defaultValue={form.formState.defaultValues?.year?.toString()}
                          >
                            <SelectTrigger
                              {...field}
                              className="w-[400px]"
                              id="year"
                            >
                              <SelectValue placeholder="Selecione o ano" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectGroup>
                                <SelectItem value="2025"> 2025</SelectItem>
                                <SelectItem value="2021"> 2021</SelectItem>
                                <SelectItem value="2016"> 2016</SelectItem>
                                <SelectItem value="2011"> 2011</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-row justify-between">
                <FormField
                  control={form.control}
                  name="hasTCC"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          TCC
                        </FormLabel>
                        <FormControl>
                          <Select
                            name="hasTCC"
                            required
                            defaultValue="false"
                            onValueChange={(value) =>
                              field.onChange(stringToBoolean(value))
                            }
                          >
                            <SelectTrigger
                              {...field}
                              className="w-[170px]"
                              id="hasTCC"
                              value={booleanToString(field.value)}
                            >
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectGroup>
                                <SelectItem value={"true"}>Sim</SelectItem>
                                <SelectItem value={"false"}>Não</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Ativo
                        </FormLabel>
                        <FormControl>
                          <Select
                            name="hasTCC"
                            required
                            defaultValue="true"
                            onValueChange={(value) =>
                              field.onChange(stringToBoolean(value))
                            }
                          >
                            <SelectTrigger
                              {...field}
                              className="w-[170px]"
                              id="hasTCC"
                              value={booleanToString(field.value)}
                            >
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectGroup>
                                <SelectItem value={"true"}>Sim</SelectItem>
                                <SelectItem value={"false"}>Não</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex flex-row justify-between">
                <FormField
                  control={form.control}
                  name="extensionCourses"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Aulas de extensão
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="w-[165px]"
                            placeholder="Número de aulas"
                            type="number"
                            id="extensionCourses"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="workload"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Carga horária
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Número total de horas"
                            id="workload"
                            className="w-[170px]"
                            {...field}
                            onChange={(event) =>
                              field.onChange(event.target.value)
                            }
                          />
                        </FormControl>
                        <FormMessage className="text-[10px] absolute" />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex flex-row justify-between">
                <FormField
                  control={form.control}
                  name="complementaryHours"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Horas complementares
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Número total de horas"
                            id="complementaryHours"
                            className="w-[165px]"
                            {...field}
                            onChange={(event) =>
                              field.onChange(event.target.value)
                            }
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="stageHours"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Horas de estágio
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Total de horas"
                            id="stageHours"
                            className="w-[170px]"
                            {...field}
                            onChange={(event) =>
                              field.onChange(event.target.value)
                            }
                          />
                        </FormControl>
                        <FormMessage className="text-[10px] absolute" />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Descrição
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            name="description"
                            id="description"
                            className="resize-none h-[130px]"
                            onChange={(event) =>
                              field.onChange(event.target.value)
                            }
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <CardFooter className="flex justify-between mt-8">
              <Button
                type="reset"
                onClick={() => form.reset()}
                variant={"outline"}
              >
                Cancelar
                <MdOutlineClose />
              </Button>
              <Button type="submit" disabled={isSubmitting} variant={"default"}>
                Salvar
                <MdCheck />
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
