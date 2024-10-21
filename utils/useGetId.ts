
import {  useRouter, usePathname, useGlobalSearchParams  } from "expo-router";



export const useGetUserId = () => {
  const router = useRouter();
  const params = useGlobalSearchParams()

  const Id = typeof params.query === "string" ? params.query  : "";
  return Id;
};
