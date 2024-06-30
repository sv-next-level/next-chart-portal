"use client";

import * as React from "react";

import Link from "next/link";

import { pixelTOPercentage } from "@/nextjs/lib/utils";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/nextjs/components/ui/resizable";

import TestSeries from "@/components/testSeries";
import { Accounts } from "@/nextjs/components/accounts";
import { Apps } from "@/nextjs/components/apps";
import { Time } from "@/nextjs/components/chart/time";
import { Settings } from "@/nextjs/components/settings";
import { Themes } from "@/nextjs/components/themes";

interface ResizableProps {
  headerMinSize: number;
  headerMaxSize: number;
  headerDefaultSize: number;
  leftMinSize: number;
  leftMaxSize: number;
  leftDefaultSize: number;
  rightMinSize: number;
  rightMaxSize: number;
  rightDefaultSize: number;
  bottomMinSize: number;
  bottomMaxSize: number;
  bottomDefaultSize: number;
}

export function Resizable(props: ResizableProps) {
  const [_window, setWindowObject] = React.useState<any>(null);
  const screenWidth = _window?.screen.width;
  const screenHeight = _window?.screen.height;

  const headerMinSize = pixelTOPercentage(props.headerMinSize, screenHeight);
  const headerMaxSize = pixelTOPercentage(props.headerMaxSize, screenHeight);
  const headerDefaultSize = pixelTOPercentage(
    props.headerDefaultSize,
    screenHeight,
  );

  const leftMinSize = pixelTOPercentage(props.leftMinSize, screenWidth);
  const leftMaxSize = pixelTOPercentage(props.leftMaxSize, screenWidth);
  const leftDefaultSize = pixelTOPercentage(props.leftDefaultSize, screenWidth);

  const rightMinSize = pixelTOPercentage(props.rightMinSize, screenWidth);
  const rightMaxSize = pixelTOPercentage(props.rightMaxSize, screenWidth);
  const rightDefaultSize = pixelTOPercentage(
    props.rightDefaultSize,
    screenWidth,
  );

  const bottomMinSize = pixelTOPercentage(props.bottomMinSize, screenHeight);
  const bottomMaxSize = pixelTOPercentage(props.bottomMaxSize, screenHeight);
  const bottomDefaultSize = pixelTOPercentage(
    props.bottomDefaultSize,
    screenHeight,
  );

  React.useEffect(() => {
    setWindowObject(globalThis.window);
  }, []);

  return (
    <>
      {_window ? (
        <ResizablePanelGroup direction="vertical">
          {headerDefaultSize ? (
            <>
              <ResizablePanel
                minSize={headerMinSize}
                maxSize={headerMaxSize}
                defaultSize={headerDefaultSize}
              >
                <div className="flex h-full justify-between gap-1 px-2">
                  <div className="my-auto flex justify-start gap-1 overflow-auto p-px">
                    <Time />
                  </div>
                  <div className="my-auto flex justify-end gap-1">
                    <Link href="/" className="my-auto text-primary underline">
                      Loader
                    </Link>
                    <Themes />
                    <Settings />
                    <Apps />
                    <Accounts />
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle
                disabled
                className="hover:bg-secondary active:bg-secondary"
              />
            </>
          ) : null}

          <ResizablePanel>
            <ResizablePanelGroup direction="horizontal">
              {leftDefaultSize ? (
                <>
                  <ResizablePanel
                    minSize={leftMinSize}
                    maxSize={leftMaxSize}
                    defaultSize={leftDefaultSize}
                  >
                    sidebar left
                  </ResizablePanel>
                  <ResizableHandle />
                </>
              ) : null}

              <ResizablePanel>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel
                    minSize={100 - bottomMaxSize}
                    maxSize={100 - bottomMinSize}
                    defaultSize={100 - bottomDefaultSize}
                  >
                    <TestSeries />
                  </ResizablePanel>

                  {bottomDefaultSize ? (
                    <>
                      <ResizableHandle />
                      <ResizablePanel
                        minSize={bottomMinSize}
                        maxSize={bottomMaxSize}
                        defaultSize={bottomDefaultSize}
                      >
                        chart bottom
                      </ResizablePanel>
                    </>
                  ) : null}
                </ResizablePanelGroup>
              </ResizablePanel>

              {rightDefaultSize ? (
                <>
                  <ResizableHandle />
                  <ResizablePanel
                    minSize={rightMinSize}
                    maxSize={rightMaxSize}
                    defaultSize={rightDefaultSize}
                  >
                    sidebar right
                  </ResizablePanel>
                </>
              ) : null}
            </ResizablePanelGroup>
          </ResizablePanel>

          {false ? (
            <>
              <ResizableHandle />
              <ResizablePanel defaultSize={10}>footer</ResizablePanel>
            </>
          ) : null}
        </ResizablePanelGroup>
      ) : null}
    </>
  );
}