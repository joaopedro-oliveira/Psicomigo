import { usePerguntaQuery } from "../generated/graphql";
import { useGetPerguntaId } from "./useGetId";

export const useGetPostFromUrl = () => {
  const intId = useGetPerguntaId();
  return usePerguntaQuery({
    skip: intId === -1,
    variables: {
      perguntaId: intId,
    },
  });
};
