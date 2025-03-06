import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { MdCheck } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MessageBoxProps {
  title: string;
  description: string;
  state: boolean;
  onClose: () => void;
}

export const MessageBox = ({
  title,
  description,
  state,
  onClose,
}: MessageBoxProps) => {
  const [timeLeft, setTimeLeft] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (!state) return;
    setTimeLeft(5);
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push("/coordinator/dashboard");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [state, router]);

  return (
    <div>
      <AlertDialog open={state}>
        <AlertDialogContent
          aria-describedby={undefined}
          className="w-auto max-w-md"
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-600 flex flex-row justify-center gap-3">
              {title}
              <MdCheck size={25} color="black" className="self-center" />
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              {description} você será redirecionado(a) para a dashboard em{" "}
              {timeLeft}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>
              Ficar na página
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => router.push("/coordinator/dashboard")}
            >
              Ir para a Dashboard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
