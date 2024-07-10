import React from "react";

import { useChartIndicator } from "@/hooks";
import { SquareFunctionIcon } from "@/nextjs/assets";

import { Button } from "@/nextjs/components/ui/button";
import { CommandDialog } from "@/nextjs/components/ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/nextjs/components/ui/tooltip";

import { IndicatorList } from "@/components/chart/indicator/list";

import { ChartIndicator } from "@/chart/indicator/list";

export function Indicator() {
  const { currentChartIndicator } = useChartIndicator();
  const [open, setOpen] = React.useState<boolean>(false);

  const groupAndSort = (arr: ChartIndicator[]): ChartIndicator[] => {
    // TODO: Group by star
    // Sort each group by value
    const sortedGroups = arr.sort((a: ChartIndicator, b: ChartIndicator) =>
      a.name.localeCompare(b.name),
    );

    return sortedGroups;
  };

  const listOfList: ChartIndicator[] = groupAndSort(currentChartIndicator.list);

  return (
    <>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setOpen((o) => !o);
              }}
            >
              <SquareFunctionIcon />
              <span className="sr-only">Indicator</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Indicator</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <IndicatorList list={listOfList} />
      </CommandDialog>
    </>
  );
}
