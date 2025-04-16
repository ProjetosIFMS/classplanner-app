import { useQueryClient, useMutation } from "@tanstack/react-query";

import { createInterestsSelection } from "@/app/_actions/interests-selection/createInterestsSelection";
import { professorInterestsSelectionSchema } from "@/types/validation/interests-selection_form";
import { Session } from "@/types/session";

export function usePostInterestsSelection(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["POST", "interest-selection"],
    mutationFn: (data: z.infer<typeof professorInterestsSelectionSchema>) =>
      createInterestsSelection(data, session),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["interest-selection"] });
    },
  });
}
