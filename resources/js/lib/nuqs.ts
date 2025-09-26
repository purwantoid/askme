import { router, usePage } from '@inertiajs/react';
import {
    unstable_AdapterOptions as AdapterOptions,
    unstable_createAdapterProvider as createAdapterProvider,
    renderQueryString,
} from 'nuqs/adapters/custom';

function useNuqsInertiaAdapter() {
    const { searchParams } = new URL(window.location.origin + usePage().url);

    const updateUrl = (search: URLSearchParams, options: AdapterOptions) => {
        const url = new URL(window.location.href);
        url.search = renderQueryString(search);

        router.visit(`${window.location.pathname}${renderQueryString(search)}`, {
            replace: options.history === 'replace',
            preserveScroll: !options.scroll,
            preserveState: true,
        });
    };

    return {
        searchParams,
        updateUrl,
    };
}

export const NuqsAdapter = createAdapterProvider(useNuqsInertiaAdapter);
