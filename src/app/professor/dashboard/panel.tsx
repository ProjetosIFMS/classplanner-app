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
import { cn } from "@/lib/utils";
import { MdOutlineEmail } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";

type PanelMessages = {
  title: string;
  description: string;
};

interface PanelProps {
  name: string;
  panelDescription?: string;
  messages: PanelMessages[];
  loading?: boolean;
}

export const Panel = ({
  name,
  panelDescription,
  messages,
  loading,
}: PanelProps) => {
  return (
    <Card className={cn("w-[500px] h-[500px] min-h-[500px]")}>
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        {panelDescription && (
          <CardDescription className="text-xs">
            {panelDescription}
          </CardDescription>
        )}
      </CardHeader>
      {loading ? (
        <>
          <CardContent className="flex justify-center items-center min-h-[350px]">
            <ClipLoader size={64} color="#000" />
          </CardContent>
        </>
      ) : (
        <>
          <CardContent className="min-h-[350px]">
            {messages &&
              messages.map((message, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] h-[50px] min-h-[50px] items-center pb-6 pt-2 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1 hover:bg-gray-100 items-center rounded-xl ">
                    <p className="text-sm font-medium leading-none">
                      {message.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {message.description}
                    </p>
                  </div>
                </div>
              ))}
          </CardContent>
          <CardFooter>
            <Button className="w-[100%]">
              <MdOutlineEmail />
              Marcar como lido
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
