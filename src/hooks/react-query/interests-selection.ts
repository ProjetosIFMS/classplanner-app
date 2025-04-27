import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { createInterestsSelection } from "@/app/_actions/interests-selection/createInterestsSelection";
import { professorInterestsSelectionSchema } from "@/types/validation/interests-selection_form";
import { Session } from "@/types/session";
import { getMyInterestsSelection } from "@/app/_actions/interests-selection/getMyInterestsSelection";
import { getInterestsSelection } from "@/app/_actions/interests-selection/getInterestsSelection";

export function useGetAllInterestsSelection(session: Session) {
  return useQuery({
    queryKey: ["GET", "interest-selection"],
    queryFn: () => getInterestsSelection(session),
  });
}

export function useGetMyInterestsSelection(session: Session) {
  return useQuery({
    queryKey: ["GET", "interest-selection/me"],
    queryFn: () => getMyInterestsSelection(session),
  });
}

export function usePostInterestsSelection(session: Session) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["POST", "interest-selection"],
    mutationFn: (data: z.infer<typeof professorInterestsSelectionSchema>) =>
      createInterestsSelection(data, session),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET", "interest-selection"],
      });
      queryClient.invalidateQueries({
        queryKey: ["GET", "interest-selection/me"],
      });
    },
  });
}
