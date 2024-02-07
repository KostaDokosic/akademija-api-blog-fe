import { useMemo } from "react";
import { useLocation } from "react-router";

export default function useQuery() {
  const { search } = useLocation(); //?page=1

  return useMemo(() => new URLSearchParams(search), [search]);
}
