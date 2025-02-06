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
import { submitPPC } from "./actions";
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

export const PPCForm = () => {
  // Initialize useForm with the Zod resolver
  const form = useForm<PPCSchema>({
    resolver: zodResolver(ppcSchema),
    defaultValues: {
      hasTCC: 0,
      PPCYear: 2025,
      additionalHours: undefined,
      semesterQuantity: 5,
      workload: undefined,
      extensionCourses: undefined,
      internshipHours: undefined,
      description: undefined,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const semesters = Array.from({ length: 10 }, (_, i) => i + 1).map((val) =>
    val.toString(),
  );

  const onSubmitForm: SubmitHandler<PPCSchema> = async (data) => {
    await submitPPC(data);
  };

  const onErrorForm: SubmitErrorHandler<PPCSchema> = (data) => {
    console.log(data);
  };

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle> Criar PPC </CardTitle>
        <CardDescription>
          Preencha os detalhes do Projeto Pedagógico de Curso
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmitForm, onErrorForm)}>
            <div className="grid w-full items-center gap-6 mb-4">
              <FormField
                control={form.control}
                name="PPCYear"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="font-semibold text-sm">
                        Ano de Criação
                      </FormLabel>
                      <FormControl>
                        <Select
                          name="PPCYear"
                          onValueChange={field.onChange}
                          required
                          defaultValue="2025"
                        >
                          <SelectTrigger {...field} id="PPCyear">
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
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-row justify-between">
                <FormField
                  control={form.control}
                  name="semesterQuantity"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Quantidade de semestres
                        </FormLabel>
                        <FormControl>
                          <Select
                            name="semesterQuantity"
                            required
                            defaultValue="5"
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger {...field} id="semesterQuantity">
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectGroup>
                                {semesters.map((number) => (
                                  <SelectItem key={number} value={number}>
                                    {number}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
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
                            defaultValue="0"
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger
                              {...field}
                              className="w-[170px]"
                              id="hasTCC"
                            >
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectGroup>
                                <SelectItem value="0">Sim</SelectItem>
                                <SelectItem value="1">Não</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
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
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex flex-row justify-between">
                <FormField
                  control={form.control}
                  name="additionalHours"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Horas complementares
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Número de aulas"
                            id="additionalHours"
                            className="w-[165px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="internshipHours"
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
                            id="internshipHours"
                            className="w-[170px]"
                            {...field}
                          />
                        </FormControl>
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <CardFooter className="flex justify-between mt-8">
              <Button type="reset" variant={"outline"}>
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
