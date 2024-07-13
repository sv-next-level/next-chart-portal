import React from "react";

import { useChartTime } from "@/hooks";
import { ChevronDownIcon } from "@/nextjs/assets";
import { cn } from "@/nextjs/lib/utils";

import { Button } from "@/nextjs/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/nextjs/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/nextjs/components/ui/tooltip";

import { TimeAdd } from "@/components/chart/time/add";
import { TimeList } from "@/components/chart/time/list";

import { ChartTime, ChartTimeFormat, chartTimeFormat } from "@/chart/time/list";

export function Time() {
  const { currentChartTime, updateChartTime } = useChartTime();
  const [open, setOpen] = React.useState<true | undefined>(undefined);

  const groupAndSort = (arr: ChartTimeFormat[]): ChartTimeFormat[][] => {
    // Group by format
    const grouped = arr.reduce((obj: any, item: ChartTimeFormat) => {
      if (!obj[item.format]) {
        obj[item.format] = [];
      }
      obj[item.format].push(item);
      return obj;
    }, {});

    // Sort each group by value
    const sortedGroups = Object.keys(grouped).map((key) => {
      return grouped[key].sort((a: ChartTime, b: ChartTime) => a.time - b.time);
    });

    return sortedGroups;
  };

  const listOfList: ChartTimeFormat[][] = groupAndSort(
    currentChartTime.list.map((item) => chartTimeFormat(item)),
  );

  const starList: ChartTimeFormat[] = listOfList
    .flat()
    .filter((item) => item.star)
    .concat(chartTimeFormat(currentChartTime.chartTime))
    .filter(
      (chartTime, index, self) =>
        index ===
        self.findIndex(
          (chartTimeFormat) => chartTimeFormat.short === chartTime.short,
        ),
    );

  return (
    <DropdownMenu open={open}>
      {starList.length > 1 ? (
        <>
          {starList.map((chartTimeFormat) => {
            return (
              <TooltipProvider key={chartTimeFormat.short} delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "px-1",
                        currentChartTime.chartTime.time ===
                          chartTimeFormat.time &&
                          currentChartTime.chartTime.format ===
                            chartTimeFormat.format
                          ? "!text-primary bg-secondary"
                          : null,
                      )}
                      onClick={() => {
                        updateChartTime(chartTimeFormat);
                      }}
                    >
                      {chartTimeFormat.short}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{chartTimeFormat.label}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 transition-all [&[data-state=open]>svg]:rotate-180 "
                  >
                    <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                    <span className="sr-only">Time interval</span>
                  </Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <TooltipContent>Time interval</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      ) : (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn("px-2 !text-primary")}>
                  {chartTimeFormat(currentChartTime.chartTime).short}
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              {chartTimeFormat(currentChartTime.chartTime).label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <DropdownMenuContent
        align="start"
        className="mt-2"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(undefined)}
      >
        <TimeList list={listOfList} />
        <TimeAdd />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
