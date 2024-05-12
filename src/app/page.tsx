"use client";

// import AreaSeries from "@/components/areaSeries";
// import CandlestickSeries from "@/components/candlestickSeries";
import TestSeries from "@/components/testSeries";

export default function App() {
  return (
    <div className="h-screen w-screen">
      <div className="h-[40px] bg-blue-600">Top Bar</div>

      <div className="flex">
        <div className="min-h-full min-w-[100px] bg-green-600">Left Bar</div>

        <div className=" min-h-[calc(100vh-40px)] flex-1 ">
          <TestSeries className="min-h-[calc(100vh-80px)]" />
          <div className="h-[40px] w-full bg-blue-600">Bottom Bar</div>
        </div>

        <div className="min-h-full min-w-[100px] bg-green-600">Right Bar</div>
      </div>
    </div>
  );
}

/**
    <>
      <div className="bg-blue-600">Top Bar</div>

      <div className="flex">
        <div className="bg-green-600">Left Bar</div>

        <div>
          <CandlestickSeries />
          <div className="bg-red-600">Bottom Bar</div>
        </div>

        <div className="bg-green-600">Right Bar</div>
      </div>
    </>
 */
