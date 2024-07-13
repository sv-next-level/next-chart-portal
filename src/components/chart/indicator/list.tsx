import { useChartIndicator, useUserSeries } from "@/hooks";
import { StarIcon } from "@/nextjs/assets";
import { cn } from "@/nextjs/lib/utils";

import { Button } from "@/nextjs/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/nextjs/components/ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/nextjs/components/ui/tooltip";

import { Wrapper as ThemeWrapper } from "@/nextjs/components/themes/wrapper";

import { ChartIndicator } from "@/chart/indicator/list";

interface StyleListProps {
  list: ChartIndicator[];
}

export function IndicatorList(props: StyleListProps) {
  const { starChartIndicatorList } = useChartIndicator();
  const { createIndicator } = useUserSeries();

  return (
    <ThemeWrapper>
      <Command>
        <CommandInput placeholder="Search Indicator..." />
        <CommandList asChild>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className="my-1">
            {props.list.map((chartIndicatorFormat: ChartIndicator) => {
              return (
                <div
                  className="group flex w-full rounded-sm px-1 hover:bg-secondary"
                  key={chartIndicatorFormat.name}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "hidden h-auto px-1 opacity-50 hover:opacity-100 group-hover:block",
                            chartIndicatorFormat.star
                              ? "opacity-100 block"
                              : null,
                          )}
                          onClick={() => {
                            starChartIndicatorList({
                              ...chartIndicatorFormat,
                              star: !chartIndicatorFormat.star,
                            });
                          }}
                        >
                          <StarIcon
                            className={cn(
                              "size-4 stroke-primary",
                              chartIndicatorFormat.star ? "fill-primary" : null,
                            )}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {(chartIndicatorFormat.star
                          ? "Remove from"
                          : "Add to") + " favorites"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div
                    onClick={() => {
                      createIndicator(chartIndicatorFormat.options);
                    }}
                    className="w-full"
                  >
                    <CommandItem
                      className={cn(
                        "!bg-transparent !opacity-100 group-hover:ml-0",
                        chartIndicatorFormat.star ? null : "ml-6",
                      )}
                    >
                      <span>{chartIndicatorFormat.name}</span>
                    </CommandItem>
                  </div>
                </div>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </ThemeWrapper>
  );
}
