import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useSettings() {
  const {
    isLoaging,
    error,
    data: settings,
  } = useQuery({
    queryFn: getSettings,
    queryKey: ["settings"],
  });
  return { isLoaging, settings, error };
}
export default useSettings;
