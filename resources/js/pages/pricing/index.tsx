import { PageLayout } from '@/layouts';
import { Pricing } from './components/Pricing';

export default function PricingPage() {
    return (
        <>
            <PageLayout title="Plans and Pricing">
                <Pricing />
            </PageLayout>
        </>
    );
}
