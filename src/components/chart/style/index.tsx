import React from "react";

import { useChartStyle } from "@/hooks";
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

import { StyleList } from "@/components/chart/style/list";

import { ChartStyle } from "@/chart/style/list";

export function Style() {
  const { currentChartStyle, updateChartStyle } = useChartStyle();
  const [open, setOpen] = React.useState<true | undefined>(undefined);

  const groupAndSort = (arr: ChartStyle[]): ChartStyle[][] => {
    // Group by format
    const grouped = arr.reduce((obj: any, item: ChartStyle) => {
      if (!obj[item.series]) {
        obj[item.series] = [];
      }
      obj[item.series].push(item);
      return obj;
    }, {});

    // Sort each group by value
    const sortedGroups = Object.keys(grouped).map((key) => {
      return grouped[key].sort(
        (a: ChartStyle, b: ChartStyle) => a.name > b.name,
      );
    });

    return sortedGroups;
  };

  const listOfList: ChartStyle[][] = groupAndSort(currentChartStyle.list);

  const starList: ChartStyle[] = listOfList
    .flat()
    .filter((item) => item.star)
    .concat(currentChartStyle.chartStyle)
    .filter(
      (ChartStyle, index, self) =>
        index ===
        self.findIndex(
          (ChartStyleFormat) => ChartStyleFormat.name === ChartStyle.name,
        ),
    );

  return (
    <DropdownMenu open={open}>
      {starList.length > 1 ? (
        <>
          {starList.map((item) => {
            return (
              <TooltipProvider key={item.name} delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "px-1",
                        currentChartStyle.chartStyle.name === item.name
                          ? "!text-primary bg-secondary"
                          : null,
                      )}
                      onClick={() => {
                        updateChartStyle(item);
                      }}
                    >
                      <item.icon className="size-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{item.name}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-6 transition-all [&[data-state=open]>svg]:rotate-180 "
            >
              <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
              <span className="sr-only">Time</span>
            </Button>
          </DropdownMenuTrigger>
        </>
      ) : (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn("px-1 !text-primary bg-secondary")}
                >
                  <currentChartStyle.chartStyle.icon className="size-5" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>{currentChartStyle.chartStyle.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <DropdownMenuContent
        align="start"
        className="mt-2 max-h-96 w-44 overflow-auto"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(undefined)}
      >
        <StyleList list={listOfList.flat()} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
