import { ResponseAPI } from "@interfaces/responseAPI.interface";
import { useQueryClient } from "@tanstack/react-query";

export type SetQueryStoreAction<T> = (callBack: (currentData: T) => T) => void;
const useQueryStore = <T>(
  key: string
): { data: T; setQueryStore: SetQueryStoreAction<T> } => {
  const queryClient = useQueryClient();
  const data = (queryClient.getQueryData([key]) as ResponseAPI)?.data as T;
  const setQueryStore = (callBack: (currentData: T) => T) => {
    queryClient.setQueryData([key], (curr: ResponseAPI) => {
      return {
        ...curr,
        data: callBack(curr?.data as T),
      };
    });
  };

  return { data, setQueryStore };
};

export default useQueryStore;
