import { fetcher } from "@/utils/fetcher";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useUserInfo = () => {
  const queryKey = ["userInfo"];

  const { data, isPending } = useQuery({
    queryKey,
    queryFn: () => fetcher<User>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-info`),
  });

  return { userInfo: data, isPending };
};
