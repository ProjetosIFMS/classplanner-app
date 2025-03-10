import { isAfter, isSameMonth } from "date-fns";
import { z } from "zod";

export const dateRangeSchema = z.object({
  dateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .refine(
      (data) => {
        if (data.from && data.to) {
          return isAfter(data.to, data.from) || isSameMonth(data.to, data.from);
        }
        return true;
      },
      {
        message: "End date must be after or the same as start date",
        path: ["to"],
      },
    ),
});

export type DateRangeFormValues = z.infer<typeof dateRangeSchema>;
