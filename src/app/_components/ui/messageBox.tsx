"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MessageBoxProps {
  title: string;
  description: string;
  state: boolean;
  onClose: () => void;
  redirectPath?: string;
  countdown?: number;
}

export const MessageBox = ({
  title,
  description,
  state,
  onClose,
  redirectPath = "/coordinator/dashboard",
  countdown = 5,
}: MessageBoxProps) => {
  const [timeLeft, setTimeLeft] = useState(countdown);
  const router = useRouter();

  useEffect(() => {
    if (!state) {
      return;
    }

    setTimeLeft(countdown);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timeout = setTimeout(() => {
      router.push(redirectPath);
    }, countdown * 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [state, router, redirectPath, countdown]);

  const handleRedirect = () => {
    router.push(redirectPath);
  };

  return (
    <AlertDialog open={state} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="w-[95vw] max-w-md transform scale-100 transition-all duration-200 ease-in-out">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-8 w-8 text-green-600 animate-[bounce_1s_ease-in-out_1]" />
          </div>
        </div>
        <AlertDialogHeader className="pt-4">
          <AlertDialogTitle className="text-xl font-semibold text-center text-green-600">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center space-y-2">
            <span className="block text-gray-600 dark:text-gray-300">
              {description}
            </span>
            <span className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              Redirecionando em{" "}
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold transition-all duration-200 ease-in-out transform">
                {timeLeft}
              </span>{" "}
              segundos
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 flex gap-3">
          <AlertDialogCancel
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 transition-colors duration-200"
            onClick={onClose}
          >
            Ficar na página
          </AlertDialogCancel>
          <AlertDialogAction
            className={cn(
              "flex-1 bg-green-600 hover:bg-green-700 transition-colors duration-200",
              "focus:ring-green-500 focus:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
            onClick={handleRedirect}
          >
            Ir para a Dashboard
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
