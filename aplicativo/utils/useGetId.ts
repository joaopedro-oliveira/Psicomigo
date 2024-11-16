import { useSegments } from "expo-router";

export const useGetPerguntaId = () => {
  const segments = useSegments();
  const Id =
    segments && segments.length > 0
      ? parseInt(segments[segments.length - 1])
      : -1;

  return Id;
};
