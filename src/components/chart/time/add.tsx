import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useChartTime } from "@/hooks";

import { Button } from "@/nextjs/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/nextjs/components/ui/form";
import { Input } from "@/nextjs/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/nextjs/components/ui/select";

import { Wrapper as ThemeWrapper } from "@/nextjs/components/themes/wrapper";

import { CHART_TIME_FORMAT } from "@/chart/time/format";
import { ChartAddTimeSchema } from "@/chart/validation/time/add";

export function TimeAdd() {
  const formats = Object.keys(CHART_TIME_FORMAT).map((key) => key);

  const { newChartTimeInitialState, pushChartTimeList } = useChartTime();

  const form = useForm<z.infer<typeof ChartAddTimeSchema>>({
    resolver: zodResolver(ChartAddTimeSchema),
    defaultValues: {
      time: newChartTimeInitialState.time,
      star: newChartTimeInitialState.star,
      format: newChartTimeInitialState.format,
    },
  });

  const onSubmit = (values: z.infer<typeof ChartAddTimeSchema>) => {
    pushChartTimeList(values);
    form.reset();
  };

  return (
    <ThemeWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-1 flex justify-between">
            <FormField
              control={form.control}
              name={"time"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      max={100}
                      className="h-7 w-8 px-1 text-center outline-none"
                      placeholder={field.value.toString()}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"format"}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="flex h-7 w-24 justify-between px-2">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent align="center">
                      {formats.map((format) => {
                        return (
                          <SelectItem key={format} value={format}>
                            {format.toLowerCase()}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit" className="h-7 px-1.5">
              Add
            </Button>
          </div>
        </form>
      </Form>
    </ThemeWrapper>
  );
}
