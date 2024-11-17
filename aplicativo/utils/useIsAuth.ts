import { useRouter, usePathname, Href } from "expo-router";
import { useEffect } from "react";
import { useMeQuery } from "@/generated/graphql";
import { isServer } from "./isServer";

export const useIsAuth = () => {
  const { data, loading: fetching } = useMeQuery({ skip: isServer() });

  const router = useRouter();
  const pathname = usePathname();
  const redirectUrl = "login?next=" + pathname;

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace({ pathname: `../${redirectUrl}` });
    }
  }, [fetching, data, router]);
};
