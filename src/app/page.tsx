import * as React from "react";

import { Resizable } from "@/templates";

export default function Home() {
  return (
    <main className="h-screen">
      <Resizable
        headerMinSize={60}
        headerMaxSize={60}
        headerDefaultSize={60}
        leftMinSize={50}
        leftMaxSize={200}
        leftDefaultSize={50}
        rightMinSize={50}
        rightMaxSize={200}
        rightDefaultSize={50}
        bottomMinSize={10}
        bottomMaxSize={200}
        bottomDefaultSize={60}
      />
    </main>
  );
}
