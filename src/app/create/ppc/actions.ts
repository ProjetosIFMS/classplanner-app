import { PPCSchema } from "@/types/validation/forms";
import api from "@/utils/axios-instance";

export async function submitPPC(formData: PPCSchema) {
  api.post("/pedagogical-project", formData);
}
