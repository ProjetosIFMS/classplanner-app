import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import React from "react";
import { Button } from "@/app/_components/ui/button";
import { Edit } from "lucide-react";
import { ConfirmDeleteCardModal } from "./confirm-delete-card-modal";
import { Area } from "@/types/area";

interface ListAreasCardProps {
  id: string;
  title: string;
  data: Area;
  isLoading?: boolean;
  onDelete: (id: string) => void;
}

const ListAreasCard = ({
  id,
  title,
  data,
  isLoading,
  onDelete,
}: ListAreasCardProps) => {
  // const [isRelocationModalOpen, setIsRelocationModalOpen] = useState(false);

  // const handleEdit = () => {
  //   setIsRelocationModalOpen(true);
  // };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold bg-primary bg-clip-text text-transparent">
              {title}
            </CardTitle>
            <div className="flex gap-1">
              <ConfirmDeleteCardModal
                onDelete={onDelete}
                id={id}
                isLoading={isLoading}
              />
            </div>
          </div>
          <div className="w-full h-0.5 bg-gradient-to-r from-primary/80 to-transparent mt-2"></div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1 bg-muted/50 p-3 rounded-lg text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Professores
              </p>
              <p className="text-3xl font-bold text-primary">
                {data.User.length}
              </p>
            </div>
            <div className="space-y-1 bg-muted/50 p-3 rounded-lg text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Disciplinas
              </p>
              <p className="text-3xl font-bold text-primary">
                {data.Discipline.length}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-2">
          <Button
            variant="outline"
            className="w-full group hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            // onClick={handleEdit}
          >
            <span>Gerenciar Área</span>
            <Edit className="h-4 w-4 ml-2 group-hover:animate-pulse" />
          </Button>
        </CardFooter>
      </Card>
      {/* <RelocationUsersModal
        onOpenChange={setIsRelocationModalOpen}
        areaId={id}
        isOpen={isRelocationModalOpen}
      /> */}
    </>
  );
};

export default ListAreasCard;
