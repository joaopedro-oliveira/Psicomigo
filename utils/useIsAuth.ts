import { useRouter, usePathname, Href } from "expo-router";
import { useEffect } from "react";
import { useMeQuery } from "@/generated/graphql";
import { isServer } from "./isServer";

// TODO: preciso criar a lógica para redirecionar o usuário para a pagina que essa função executou.
//         router.replace("/login?next=" + router.pathname);

export const useIsAuth = () => {
  const { data, loading: fetching } = useMeQuery({ skip: isServer() });

  const router = useRouter();
  const pathname = usePathname();
  const redirectUrl = "login?next=" + pathname;

  useEffect(() => {
    if (!fetching && !data?.me) {
      // console.log(data?.me);
      router.replace({ pathname: `../${redirectUrl}` });
    }
  }, [fetching, data, router]);
};
