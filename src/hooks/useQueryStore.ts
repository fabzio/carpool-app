import { useQueryClient } from "@tanstack/react-query";

export type SetQueryStoreAction<T> = (callBack: (currentData: T) => T) => void;
const useQueryStore = <T>(
  key: string
): { data: T; setQueryStore: SetQueryStoreAction<T> } => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData([key]) as T;
  const setQueryStore = (callBack: (currentData: T) => T) => {
    queryClient.setQueryData([key], (curr: T) => {
      return callBack(curr);
    });
  };

  return { data, setQueryStore };
};

export default useQueryStore;
