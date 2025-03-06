import { Loader2 } from "lucide-react";
import { Card, CardContent } from "./card";

export const LoadingCard = () => {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-md text-muted-foreground">Carregando...</p>
      </CardContent>
    </Card>
  );
};
