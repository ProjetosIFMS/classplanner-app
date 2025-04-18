"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Card, CardContent } from "@/app/_components/ui/card";
import { FormField, FormItem, FormControl } from "@/app/_components/ui/form";
import { Checkbox } from "@/app/_components/ui/checkbox";

import { useAuth } from "@/app/_components/auth/AuthContext";
import { useCourses } from "@/hooks/useCourses";
import { usePedagogicalProjects } from "@/hooks/usePedagogicalProjects";
import { CoursesPedagogicalProjectsDisciplines } from "@/app/_components/courses-pedagogical-projects-disciplines";
import { useGetAllDisciplines } from "@/hooks/react-query/disciplines";
import { ProfessorInterestsForm } from "@/app/professor/select-interest/ProfessorInterestsForm";
import { professorInterestsSelectionSchema } from "@/types/validation/interests-selection_form";
import {
  useGetMyInterestsSelection,
  usePostInterestsSelection,
} from "@/hooks/react-query/interests-selection";
import "./style.css";
import { MessageBox } from "@/app/_components/ui/messageBox";

export default function SelectInterest() {
  const { session } = useAuth();
  const courses = useCourses();
  const pedagogicalProjects = usePedagogicalProjects();
  const disciplines = useGetAllDisciplines(session);
  const getMyInterestsSelection = useGetMyInterestsSelection(session);
  const postInterestsSelection = usePostInterestsSelection(session);
  const [showMessage, setShowMessage] = React.useState<boolean>(false);
  const [workload, setWorkload] = React.useState<number>(0);

  const form = useForm<z.infer<typeof professorInterestsSelectionSchema>>({
    resolver: zodResolver(professorInterestsSelectionSchema),
    defaultValues: {
      disciplines_ids: [],
    },
  });

  React.useEffect(() => {
    form.setValue(
      "disciplines_ids",
      getMyInterestsSelection.data
        ?.map((interestSelection) => {
          if (interestSelection.status == "INACTIVE") {
            return null;
          }
          return interestSelection.discipline_id;
        })
        .filter((id): id is string => id !== null) || [],
    );
  }, [getMyInterestsSelection.data, form]);

  function onSubmit(data: z.infer<typeof professorInterestsSelectionSchema>) {
    postInterestsSelection.mutate(data, {
      onSuccess: () => {
        setShowMessage(true);
      },
      onError: () => {
        toast.error("Erro ao salvar seleção de interesses");
      },
    });
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center mx-auto">
        <div>
          <div className="py-6">
            <h1 className="text-2xl font-extrabold">Seleção de interesses</h1>
            <h2 className="text-lg text-muted-foreground">
              Selecione unidades curriculares de interesse
            </h2>
          </div>
          <Card className="pt-6 w-full min-w-[80rem]">
            <CardContent>
              <ProfessorInterestsForm form={form} onSubmit={onSubmit}>
                <CoursesPedagogicalProjectsDisciplines
                  posting={postInterestsSelection.isPending}
                  courses={courses ?? []}
                  pedagogicalProjects={pedagogicalProjects ?? []}
                  disciplines={disciplines.data ?? []}
                  workload={workload}
                  renderDisciplineForm={(discipline) => (
                    <FormField
                      control={form.control}
                      name={`disciplines_ids`}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(discipline.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setWorkload(
                                    (prev) =>
                                      prev + discipline.theoreticalHours,
                                  );
                                  field.onChange([
                                    ...field.value,
                                    discipline.id,
                                  ]);
                                } else {
                                  setWorkload(
                                    (prev) =>
                                      prev - discipline.theoreticalHours,
                                  );
                                  field.onChange(
                                    field.value?.filter(
                                      (id) => id !== discipline.id,
                                    ),
                                  );
                                }
                              }}
                              disabled={
                                postInterestsSelection.isPending ||
                                getMyInterestsSelection.isPending
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                />
              </ProfessorInterestsForm>
            </CardContent>
          </Card>
          <MessageBox
            description="Interesses salvos com sucesso, eles serão analisados pela coordenação do curso."
            title="Seleção de Interesse bem sucedida!"
            countdown={5}
            state={showMessage}
            onClose={() => setShowMessage(false)}
            redirectPath="/professor/dashboard"
          />
        </div>
      </div>
    </section>
  );
}
