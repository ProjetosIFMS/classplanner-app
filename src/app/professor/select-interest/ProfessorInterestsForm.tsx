"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/app/_components/ui/form";

interface ProfessorInterestsFormProps {
  children?: React.ReactNode;
  form: ReturnType<typeof useForm>;
  onSubmit: (data: z.infer<typeof professorInterestsFormSchema>) => void;
}

export const professorInterestsFormSchema = z.object({
  disciplines_ids: z.array(z.string().uuid()),
});

export function ProfessorInterestsForm(props: ProfessorInterestsFormProps) {
  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
        {props.children}
      </form>
    </Form>
  );
}
