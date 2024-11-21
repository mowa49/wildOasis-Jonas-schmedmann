import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClinet = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => addEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("the Cabin has been edited");
      queryClinet.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isEditing, editCabin };
}

export default useEditCabin;
