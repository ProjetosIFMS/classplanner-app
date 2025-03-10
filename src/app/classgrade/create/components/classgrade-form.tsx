import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/app/_components/ui/form";
import { MonthYearPicker } from "@/app/_components/ui/month-year-picker";
import {
  classgradeSchema,
  ClassgradeValues,
} from "@/types/validation/class-grade_form";
import { zodResolver } from "@hookform/resolvers/zod";
import { endOfMonth, startOfMonth } from "date-fns";
import { useForm } from "react-hook-form";

export const ClassgradeForm = () => {
  const form = useForm<ClassgradeValues>({
    resolver: zodResolver(classgradeSchema),
    defaultValues: {
      dateRange: {
        from: startOfMonth(new Date()),
        to: endOfMonth(new Date()),
      },
    },
  });

  return (
    <div>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm">
                  Período da turma
                </FormLabel>
                <FormControl>
                  <MonthYearPicker
                    required
                    label="Período de existência da turma"
                    name="dateRange"
                    control={form.control}
                    onDateRangeChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
