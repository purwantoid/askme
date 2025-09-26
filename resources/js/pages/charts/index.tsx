'use client';
import { Main } from '@/components/layout';
import { AuthenticatedLayout } from '@/layouts';
import { ActiveEnergy, AverageSteps, Move, MoveRadial, Progress, Resting, TimeInBed, WalkingDistance } from '@/pages/charts/examples';
import { AreaChartDemo } from '@/pages/dashboard/reports/AreaChartDemo';
import { BarChartActive } from '@/pages/dashboard/reports/BarChartActive';
import { BarChartHorizontal } from '@/pages/dashboard/reports/BarChartHorizontal';
import { BarChartMultiple } from '@/pages/dashboard/reports/BarChartMultiple';
import { BarChartSingle } from '@/pages/dashboard/reports/BarChartSingle';
import { LineChartMultiple } from '@/pages/dashboard/reports/LineChartMultiple';
import { PieChartDemo } from '@/pages/dashboard/reports/PieChartDemo';
import { PieChartDonut } from '@/pages/dashboard/reports/PieChartDonut';
import { PieChartInteractive } from '@/pages/dashboard/reports/PieChartInteractive';
import { RadialChartLabel } from '@/pages/dashboard/reports/RadialChartLabel';
import { RadialChartShape } from '@/pages/dashboard/reports/RadialChartShape';
import { RadialChartText } from '@/pages/dashboard/reports/RadialChartText';

export const description = 'A collection of health charts.';

export default function Charts() {
    return (
        <>
            <AuthenticatedLayout title={'Chart example'}>
                <Main>
                    <div className="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
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
                        <div className="flex flex-wrap gap-4">
                            <ActiveEnergy />
                            <Move />
                        </div>
                        <MoveRadial />
                        <AverageSteps />
                        <div className="flex flex-wrap gap-5">
                            <WalkingDistance />
                            <Progress />
                        </div>
                        <div className="flex flex-wrap gap-5"></div>
                    </div>
                </Main>
            </AuthenticatedLayout>
        </>
    );
}
