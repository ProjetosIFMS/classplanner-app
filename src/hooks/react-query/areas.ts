import { useMutation } from "@tanstack/react-query";

import { Session } from "@/types/session";
import { AreaValues } from "@/types/validation/area_form";
import { createArea } from "@/app/_actions/area/createArea";

export function usePostArea(session: Session) {
  return useMutation({
    mutationKey: ["POST", "area"],
    mutationFn: (formData: AreaValues) => createArea(session, formData),
  });
}
