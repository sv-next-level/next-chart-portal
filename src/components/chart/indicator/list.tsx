import { useChartIndicator } from "@/hooks";
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

  return (
    <ThemeWrapper>
      <Command>
        <CommandInput placeholder="Search Indicator..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className="my-1">
            {props.list.map((chartIndicatorFormat: ChartIndicator) => {
              return (
                <div
                  className="group flex w-full rounded-sm px-2 py-0 hover:bg-secondary"
                  key={chartIndicatorFormat.name}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant="ghost"
                          className={cn(
                            "hidden h-auto px-0 opacity-50 hover:opacity-100 group-hover:block",
                            chartIndicatorFormat.star
                              ? "opacity-100 block"
                              : null,
                          )}
                          onClick={() => {
                            starChartIndicatorList({
                              name: chartIndicatorFormat.name,
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
                  <CommandItem
                    className={cn(
                      "!bg-transparent group-hover:ml-0",
                      chartIndicatorFormat.star ? null : "ml-4",
                    )}
                    key={chartIndicatorFormat.name}
                  >
                    <span>{chartIndicatorFormat.name}</span>
                  </CommandItem>
                </div>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </ThemeWrapper>
  );
}
