"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../_components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../_components/ui/select";
import { Button } from "../../_components/ui/button";
import { Area } from "@/types/area";
import { updateArea } from "./actions";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { areaSchema } from "@/types/validation/area_form";
import { AreaValues } from "@/types/validation/area_form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../_components/ui/form";
import { MdCheck } from "react-icons/md";
import { useAuth } from "@/app/_components/auth/AuthContext";
import { deleteUserToken } from "@/app/_actions/deleteUserToken";

interface areaFormProps {
  data: Area[] | undefined;
}

export const AreaForm = ({ data }: areaFormProps) => {
  const form = useForm<AreaValues>({
    resolver: zodResolver(areaSchema),
  });
  const { session } = useAuth();

  const onSubmitArea: SubmitHandler<AreaValues> = async (data) => {
    if (session) {
      await updateArea(data.area, session);
    }
    deleteUserToken();
  };

  const onError: SubmitErrorHandler<AreaValues> = async (data) => {
    console.log(data.area);
  };

  return (
    <Card className="w-[350px] self-center m-auto">
      <CardHeader>
        <CardTitle>Selecione sua área</CardTitle>
        <CardDescription>Selecione a área à qual você pertence</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitArea, onError)}
            className="p-0"
          >
            <div className="flex flex-col gap-3 space-y-1.0">
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="font-bold">Área</FormLabel>
                      <FormControl>
                        <Select
                          name="area"
                          onValueChange={field.onChange}
                          required
                          value={field.value}
                        >
                          <SelectTrigger {...field} id="area">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {data &&
                              data.map((area) => (
                                <SelectItem key={area.id} value={area.id}>
                                  {area.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <CardFooter className="mt-4 flex justify-end ">
              <Button type="submit" disabled={form.formState.isSubmitting}>
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
