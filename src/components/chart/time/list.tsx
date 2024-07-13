import { useChartTime } from "@/hooks";
import { CrossIcon, StarIcon } from "@/nextjs/assets";
import { cn } from "@/nextjs/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/nextjs/components/ui/accordion";
import { Button } from "@/nextjs/components/ui/button";
import { DropdownMenuItem } from "@/nextjs/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/nextjs/components/ui/tooltip";

import { Wrapper as ThemeWrapper } from "@/nextjs/components/themes/wrapper";

import { CHART_TIME_FORMAT } from "@/chart/time/format";
import { ChartTimeFormat } from "@/chart/time/list";

interface TimeListProps {
  list: ChartTimeFormat[][];
}

export function TimeList(props: TimeListProps) {
  const {
    currentChartTime,
    removeChartTimeList,
    starChartTimeList,
    updateChartTime,
  } = useChartTime();

  return (
    <ThemeWrapper className="max-h-96 w-44 overflow-auto">
      <Accordion
        type="multiple"
        defaultValue={Object.values(CHART_TIME_FORMAT)}
      >
        {props.list.map((chartTimeFormat: ChartTimeFormat[]) => {
          return (
            <AccordionItem
              key={chartTimeFormat[0].format}
              value={chartTimeFormat[0].format}
            >
              <AccordionTrigger className="my-1 p-1 text-xs opacity-50 hover:rounded-sm hover:bg-secondary hover:no-underline">
                {chartTimeFormat[0].format}
              </AccordionTrigger>
              <AccordionContent className="pb-1">
                {chartTimeFormat.map((chartTimeFormat: ChartTimeFormat) => {
                  return (
                    <DropdownMenuItem
                      key={chartTimeFormat.label}
                      className={cn(
                        "group flex justify-between",
                        currentChartTime.chartTime.format ===
                          chartTimeFormat.format &&
                          currentChartTime.chartTime.time ===
                            chartTimeFormat.time
                          ? "!text-primary bg-secondary"
                          : null,
                      )}
                    >
                      <p
                        onClick={() => {
                          updateChartTime(chartTimeFormat);
                        }}
                        className="w-full"
                      >
                        {chartTimeFormat.label}
                      </p>
                      <div className="flex gap-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "hidden h-auto rounded-sm p-0.5 opacity-50 hover:opacity-100 group-hover:block",
                                )}
                                onClick={() => {
                                  removeChartTimeList({
                                    format: chartTimeFormat.format,
                                    time: chartTimeFormat.time,
                                    star: chartTimeFormat.star,
                                  });
                                }}
                              >
                                <CrossIcon
                                  className={cn(
                                    "size-4 stroke-primary",
                                    chartTimeFormat.star
                                      ? "fill-primary"
                                      : null,
                                  )}
                                />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Remove</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "hidden h-auto rounded-sm p-0.5 opacity-50 hover:opacity-100 group-hover:block",
                                  chartTimeFormat.star
                                    ? "opacity-100 block"
                                    : null,
                                )}
                                onClick={() => {
                                  starChartTimeList({
                                    format: chartTimeFormat.format,
                                    time: chartTimeFormat.time,
                                    star: !chartTimeFormat.star,
                                  });
                                }}
                              >
                                <StarIcon
                                  className={cn(
                                    "size-4 stroke-primary",
                                    chartTimeFormat.star
                                      ? "fill-primary"
                                      : null,
                                  )}
                                />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {(chartTimeFormat.star
                                ? "Remove from"
                                : "Add to") + " favorites"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </ThemeWrapper>
  );
}
