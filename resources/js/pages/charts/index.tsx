"use client"
import { AuthenticatedLayout } from "@/layouts"
import { Main } from "@/components/layout"
import {
  ActiveEnergy,
  AverageSteps,
  Move,
  MoveRadial,
  Progress,
  Resting,
  TimeInBed,
  WalkingDistance
} from "@/pages/charts/examples"
import {AreaChartDemo} from "@/pages/dashboard/reports/AreaChartDemo";
import {BarChartHorizontal} from "@/pages/dashboard/reports/BarChartHorizontal";
import {BarChartMultiple} from "@/pages/dashboard/reports/BarChartMultiple";
import {BarChartSingle} from "@/pages/dashboard/reports/BarChartSingle";
import {LineChartMultiple} from "@/pages/dashboard/reports/LineChartMultiple";
import {BarChartActive} from "@/pages/dashboard/reports/BarChartActive";
import {RadialChartLabel} from "@/pages/dashboard/reports/RadialChartLabel";
import {PieChartInteractive} from "@/pages/dashboard/reports/PieChartInteractive";
import {RadialChartShape} from "@/pages/dashboard/reports/RadialChartShape";
import {PieChartDonut} from "@/pages/dashboard/reports/PieChartDonut";
import {PieChartDemo} from "@/pages/dashboard/reports/PieChartDemo";
import {RadialChartText} from "@/pages/dashboard/reports/RadialChartText";

export const description = "A collection of health charts."

export default function Charts() {
  return (
    <>
      <AuthenticatedLayout title={"Chart example"}>
        <Main>
          <div className='grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-4 lg:grid-cols-3'>

            <TimeInBed />
            <Resting />
            <RadialChartLabel />
            <AreaChartDemo />
            <BarChartHorizontal />
            <BarChartMultiple />
            <BarChartSingle />
            <LineChartMultiple />
            <BarChartActive />
            <PieChartInteractive />
            <RadialChartShape />
            <PieChartDonut />
            <PieChartDemo />
            <RadialChartText />
            <div className='flex gap-4 flex-wrap'>
              <ActiveEnergy />
              <Move />
            </div>
            <MoveRadial />
            <AverageSteps />
            <div className='flex gap-5 flex-wrap'>
              <WalkingDistance />
              <Progress />
            </div>
            <div className='flex gap-5 flex-wrap'>
            </div>
          </div>
        </Main>
      </AuthenticatedLayout>
    </>
  )
}
