import { QueryClient, type DefaultError, type QueryKey, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

export type QueryParameter<queryFnData = unknown, error = DefaultError, data = queryFnData, queryKey extends QueryKey = QueryKey> = {
    query?: Omit<UseQueryOptions<queryFnData, error, data, queryKey>, 'queryFn' | 'queryHash' | 'queryKey' | 'queryKeyHashFn'> | undefined;
};

export type MutationOptions<TVariables = any | void, TData = any> = Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn' | 'mutationKey'>;

const MAX_RETRIES = 1;
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404];

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000,
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
                if (failureCount >= MAX_RETRIES) {
                    return false;
                }

                if (isAxiosError(error) && HTTP_STATUS_TO_NOT_RETRY.includes(error.response?.status ?? 0)) {
                    console.info(`Aborting retry due to ${error.response?.status} status`);
                    return false;
                }

                return true;
            },
        },
    },
});
