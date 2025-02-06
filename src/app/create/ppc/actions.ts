import { PPCSchema } from "@/types/validation/forms";
import api from "@/utils/axios-instance";

export async function submitPPC(formData: PPCSchema) {
  // const validateFields = ppcSchema.parse({
  //     PPCYear: formData.PPCYear,
  //     semesterQuantity: formData.semesterQuantity,
  //     hasTCC: formData.hasTCC,
  //     additionalHours: formData.additionalHours,
  //     extensionCourses: formData.extensionCourses,
  //     workload: formData.workload,
  //     internshipHours: formData.internshipHours,
  //     description: formData.description
  // })

  // Need API refactor
  api.post("/pedagogical-project", formData);
}
