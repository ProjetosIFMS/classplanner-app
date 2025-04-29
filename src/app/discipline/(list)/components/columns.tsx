"use client";

import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { validate as isUUID } from "uuid";

import { Button } from "@/app/_components/ui/button";

import type { Discipline } from "@/types/discipline";
import { UpdateDisciplineModalForm } from "@/app/discipline/(list)/components/update-discipline-modal-form";
import { DeleteDisciplineModal } from "@/app/discipline/(list)/components/delete-discipline-modal";
import ClipLoader from "react-spinners/ClipLoader";
import { RenderSortingIcon } from "@/app/_components/table/render-sorting-icon";
import { useGetAllCourses } from "@/hooks/react-query/courses";
import { Course } from "@/types/course";
import { generateCourseAcronym } from "@/utils/generateCourseAcronym";

export const createColumns = (
  session: string | undefined,
  courses: Course[]
): ColumnDef<Discipline>[] => {
  return [
    {
      accessorKey: "code",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            COD.
            <RenderSortingIcon column={column} />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("code")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Nome
            <RenderSortingIcon column={column} />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate font-medium">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "course_id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Nome
            <RenderSortingIcon column={column} />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate font-medium">
          {generateCourseAcronym(
            courses.find((course) => course.id == row.getValue("course_id"))
              ?.name ?? ""
          )}
        </div>
      ),
    },
    {
      accessorKey: "semester",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Semestre
            <RenderSortingIcon column={column} />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">
          <p>{row.getValue("semester")}º</p>
        </div>
      ),
    },
    {
      accessorKey: "totalHours",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Carga Horária Total
            <RenderSortingIcon column={column} />
          </Button>
        );
      },
      accessorFn: (discipline) => {
        const totalHours =
          discipline?.practicalHours +
          discipline?.theoreticalHours +
          discipline?.extensionHours;

        return totalHours;
      },
      cell: ({ row }) => {
        const discipline = row.original;
        const totalHours =
          discipline?.practicalHours +
          discipline?.theoreticalHours +
          discipline?.extensionHours;

        return <div className="text-center font-medium">{totalHours}h</div>;
      },
    },
    {
      accessorKey: "practicalHours",
      header: "CH Prática",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("practicalHours")}h</div>
      ),
    },
    {
      accessorKey: "theoreticalHours",
      header: "CH Teórica",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("theoreticalHours")}h</div>
      ),
    },
    {
      accessorKey: "extensionHours",
      header: "CH Extensão",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("extensionHours")}h</div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-center">Ações</div>,
      cell: ({ row }) => (
        <>
          {isUUID(row.original.id) ? (
            <>
              <UpdateDisciplineModalForm
                session={session}
                data={row.original}
              />
              <DeleteDisciplineModal session={session} data={row.original} />
            </>
          ) : (
            <ClipLoader />
          )}
        </>
      ),
    },
  ];
};
