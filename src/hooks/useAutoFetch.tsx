/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
// Import the necessary utility types from RTK Query if possible,
// but for this generic hook, these custom types will work.

// Type for the mutation hook signature from RTK Query's useMutation
type MutationHook<TParams, TResponse> = () => [
  (args: TParams) => Promise<{ data: TResponse } | { error: any }>, // The promise can resolve to success or error
  { isLoading: boolean; isError: boolean; error: any | undefined; reset: () => void; isSuccess: boolean }
];

// Type for the hook's return value
type UseAutoFetchResult<TResponse> = {
  result: TResponse | null;
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
};

/**
 * Generic reusable hook for automatically running RTK Query mutations once with parameters.
 */
export function useAutoFetch<TResponse = any, TParams = any>(
  mutationHook: MutationHook<TParams, TResponse>,
  params?: TParams
): UseAutoFetchResult<TResponse> {
  // 1. Get the trigger and state from the RTK Query mutation hook
  const [trigger, { isLoading, isError, error, reset }] = mutationHook();
  // 2. Local state for the fetched data
  const [result, setResult] = useState<TResponse | null>(null);

  useEffect(() => {
    // We only want to fetch if params are provided and defined
    if (!params) {
      setResult(null); // Clear result if params are removed
      reset(); // Optionally reset the mutation state
      return;
    }

    const fetchData = async () => {
      setResult(null);
      
      try {

        const res = await trigger(params as TParams);
        if ('data' in res) {
          setResult(res.data);
        } 
      } catch (err) {
        console.error("Fetch error caught locally (should be handled by RTK state):", err);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);
  return { result, isLoading, isError, error };
}