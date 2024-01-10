import { fetcher } from "@/utils/fetcher";
import { QueryClient, dehydrate } from "@tanstack/react-query";

interface Props<T> {
  queryKey: string[];
  path: string;
}

export const dehydratedState = async <T>({ queryKey, path }: Props<T>) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      return await fetcher<T>(process.env.NEXT_PUBLIC_BASE_URL + path, {
        next: { tags: queryKey },
      });
    },
  });

  return dehydrate(queryClient);
};
