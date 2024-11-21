import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

function useEditSetting() {
  const queryClinet = useQueryClient();
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("the setting has been edited");
      queryClinet.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isUpdating, updateSetting };
}

export default useEditSetting;
