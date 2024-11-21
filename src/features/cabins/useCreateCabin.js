import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin() {
  const queryClinet = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: addEditCabin,
    onSuccess: () => {
      toast.success("new Cabin was added");
      queryClinet.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => toast.error(error.message),
  });
  return { isCreating, createCabin };
}

export default useCreateCabin;
