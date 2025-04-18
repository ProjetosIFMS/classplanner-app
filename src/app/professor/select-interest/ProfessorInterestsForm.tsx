"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/app/_components/ui/form";

import { professorInterestsSelectionSchema } from "@/types/validation/interests-selection_form";

interface ProfessorInterestsFormProps {
  children?: React.ReactNode;
  form: ReturnType<
    typeof useForm<z.infer<typeof professorInterestsSelectionSchema>>
  >;
  onSubmit: (data: z.infer<typeof professorInterestsSelectionSchema>) => void;
}

export function ProfessorInterestsForm(props: ProfessorInterestsFormProps) {
  return (
    <Form {...props.form}>
      <form onSubmit={props.form.handleSubmit(props.onSubmit)}>
        {props.children}
      </form>
    </Form>
  );
}
