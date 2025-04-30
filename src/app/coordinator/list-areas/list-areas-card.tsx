import { validate as isUUID } from "uuid";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import React from "react";
import { Button } from "@/app/_components/ui/button";
import { Eye } from "lucide-react";
import { ConfirmDeleteCardModal } from "./confirm-delete-card-modal";
import { Area } from "@/types/area";
import { UpdateAreaModalForm } from "@/app/coordinator/list-areas/update-area-modal-form";
import ClipLoader from "react-spinners/ClipLoader";

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
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary flex flex-col justify-between">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold bg-primary bg-clip-text text-transparent">
              {title}
            </CardTitle>
            <div className="flex gap-1">
              <UpdateAreaModalForm data={data} />
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
            {isUUID(id) ? (
              <>
                <div className="space-y-1 bg-muted/50 p-3 rounded-lg text-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    Professores
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {data.User ? data.User.length : 0}
                  </p>
                </div>
                <div className="space-y-1 bg-muted/50 p-3 rounded-lg text-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    Disciplinas
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {data.Discipline ? data.Discipline.length : 0}
                  </p>
                </div>
              </>
            ) : (
              <div className="col-span-full flex items-center justify-center">
                <ClipLoader size={64} />
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-2 ">
          <Button className="w-full group hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            <Eye className="h-4 w-4 ml-2 group-hover:animate-pulse" />
            <span>Detalhes</span>
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
