import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export const useQState = <T>(
  key: QueryKey,
  initial?: T
): [T, Dispatch<SetStateAction<T>>] => {
  const { data } = useQuery<T>({
    queryKey: key,
    enabled: false,
    ...(initial !== undefined ? { initialData: initial } : {}),
  });
  const queryClient = useQueryClient();
  const stateSetter = (arg: ((arg: T) => void) | T): void => {
    let newValue;
    if (typeof arg === "function") {
      const prevValue = queryClient.getQueryData<T>(key);
      newValue = (arg as any)(prevValue);
    } else {
      newValue = arg;
    }
    queryClient.setQueryData<T>(key, newValue);
  };
  return [data as T, stateSetter];
};
