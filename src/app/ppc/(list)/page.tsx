"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/app/_components/ui/card";

import { useAuth } from "@/app/_components/auth/AuthContext";
import { Role } from "@/types/user";
import { useGetAllPPC } from "@/hooks/react-query/ppc";
import { CreatePPCmodalForm } from "@/app/ppc/(list)/components/create-ppc-modal-form";
import ClipLoader from "react-spinners/ClipLoader";
import { PPCCard } from "@/app/ppc/(list)/components/ppc-card";
import { useGetAllCourses } from "@/hooks/react-query/courses";

export default function ListPpc() {
  const { session, user } = useAuth();

  const getPPCs = useGetAllPPC(session);
  const getAllCourses = useGetAllCourses(session);

  return (
    <section className="min-h-screen flex flex-col">
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Projetos Pedagógicos</h1>
          {user?.role === Role.COORDINATOR && (
            <CreatePPCmodalForm session={session} />
          )}
        </div>

        <div className="mt-6 flex-1">
          <Card className="w-full">
            <CardHeader />
            <CardContent className="grid gap-8 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {getPPCs.isLoading || getPPCs.isLoading ? (
                <div className="flex items-center justify-center col-span-full">
                  <ClipLoader size={64} />
                </div>
              ) : (
                getPPCs.data?.map((ppc, index) => (
                  <PPCCard
                    key={ppc.id}
                    courseName={
                      getAllCourses.data?.find(
                        (course) => course.id === ppc.course_id,
                      )?.name
                    }
                    index={index}
                    ppc={ppc}
                    session={session}
                  />
                ))
              )}
            </CardContent>
            <CardFooter />
          </Card>
        </div>
      </div>
    </section>
  );
}
