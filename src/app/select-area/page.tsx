import { getAreas } from "./actions";
import { AreaForm } from "./area-form";

const SelectArea = async () => {
  const data = await getAreas();

  return (
    <section className="flex flex-col h-screen">
      <AreaForm data={data} />
    </section>
  );
};

export default SelectArea;
