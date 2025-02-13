import { Header } from "@/app/_components/header";
import { getAreas } from "./actions";
import { AreaForm } from "./area-form";

const SelectArea = async () => {
  const data = await getAreas();

  return (
    <section className="flex flex-col h-screen">
      <Header></Header>
      <AreaForm data={data} />
    </section>
  );
};

export default SelectArea;
