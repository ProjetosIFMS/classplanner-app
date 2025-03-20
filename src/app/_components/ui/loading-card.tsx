import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/app/_components/ui/card";
import { cn } from "@/lib/utils";

interface LoadingCardProps {
  className?: string;
  cardClassName?: string;
  message?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fullscreen?: boolean;
  showMessage?: boolean;
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-18 w-18",
} as const;

export const LoadingCard = ({
  className,
  cardClassName,
  message = "Carregando...",
  size = "md",
  fullscreen = false,
  showMessage = true,
}: LoadingCardProps) => {
  const containerClasses = cn(
    "flex justify-center items-center",
    fullscreen
      ? "fixed inset-0 bg-background/80 backdrop-blur-sm"
      : "min-h-[200px]",
    className,
  );

  const cardClasses = cn(
    "w-auto border bg-card/50 backdrop-blur-sm",
    fullscreen && "shadow-lg",
    cardClassName,
  );

  const spinnerClasses = cn("animate-spin text-primary", sizeMap[size]);

  return (
    <div className={containerClasses}>
      <Card className={cardClasses}>
        <CardContent className="flex flex-col items-center justify-center p-6 sm:p-8">
          <Loader2 className={spinnerClasses} />
          {showMessage && (
            <p
              className={cn(
                "mt-4 text-muted-foreground",
                size === "sm" && "text-sm",
                size === "md" && "text-base",
                size === "lg" && "text-lg",
                size === "xl" && "text-xl",
              )}
            >
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
