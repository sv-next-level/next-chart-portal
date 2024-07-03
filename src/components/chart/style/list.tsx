import { useChartStyle } from "@/hooks";
import { StarIcon } from "@/nextjs/assets";
import { cn } from "@/nextjs/lib/utils";

import { Button } from "@/nextjs/components/ui/button";
import { DropdownMenuItem } from "@/nextjs/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/nextjs/components/ui/tooltip";

import { Wrapper as ThemeWrapper } from "@/nextjs/components/themes/wrapper";

import { ChartStyle } from "@/chart/style/list";

interface StyleListProps {
  list: ChartStyle[];
}

export function StyleList(props: StyleListProps) {
  const { currentChartStyle, updateChartStyle, starChartStyleList } =
    useChartStyle();

  return (
    <ThemeWrapper>
      {props.list.map((chartStyleFormat: ChartStyle) => {
        return (
          <DropdownMenuItem
            key={chartStyleFormat.name}
            className={cn(
              "group flex justify-between",
              currentChartStyle.chartStyle.name === chartStyleFormat.name
                ? "!text-primary bg-secondary"
                : null,
            )}
          >
            <div
              onClick={() => {
                updateChartStyle(chartStyleFormat);
              }}
              className="w-full"
            >
              <p className="flex gap-2">
                <chartStyleFormat.icon className="size-5" />
                {chartStyleFormat.name}
              </p>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "hidden h-auto rounded-sm p-0.5 opacity-50 hover:opacity-100 group-hover:block",
                      chartStyleFormat.star ? "opacity-100 block" : null,
                    )}
                    onClick={() => {
                      starChartStyleList({
                        name: chartStyleFormat.name,
                        icon: chartStyleFormat.icon,
                        star: !chartStyleFormat.star,
                        series: chartStyleFormat.series,
                      });
                    }}
                  >
                    <StarIcon
                      className={cn(
                        "size-4 stroke-primary",
                        chartStyleFormat.star ? "fill-primary" : null,
                      )}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {(chartStyleFormat.star ? "Remove from" : "Add to") +
                    " favorites"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DropdownMenuItem>
        );
      })}
    </ThemeWrapper>
  );
}
