import {
  useRouter,
  usePathname,
  useLocalSearchParams,
  useSegments,
} from "expo-router";

export const useGetPerguntaId = () => {
  // const router = useRouter();
  // const params = useLocalSearchParams();

  const segments = useSegments();

  // Assuming 'id' is in the last segment of the path, like /something/1
  const Id =
    segments && segments.length > 0
      ? parseInt(segments[segments.length - 1])
      : -1;

  // const Id = typeof params.query.id === "string" ? parseInt(params.query.id) : -1;
  return Id;
};
