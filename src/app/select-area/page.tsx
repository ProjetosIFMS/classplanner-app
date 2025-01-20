"use client";

import { Header } from "../_components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import { Label } from "../_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../_components/ui/select";
import { Button } from "../_components/ui/button";

const SelectArea = () => {
  return (
    <section className="flex flex-col h-screen">
      <Header />
      <Card className="w-[350px] self-center m-auto">
        <CardHeader>
          <CardTitle>Selecione sua área</CardTitle>
          <CardDescription>
            Selecione a área à qual você pertence
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-3 space-y-1.0">
              <Label htmlFor="area" className="font-bold">
                Área
              </Label>
              <Select>
                <SelectTrigger id="area">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="redes">Redes de Computadores</SelectItem>
                  <SelectItem value="desenvolvimento">
                    Desenvolvimento
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Salvar</Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default SelectArea;
