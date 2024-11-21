import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
function useSignup() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("account is created, pease verify your account");
    },
  });
  return { signUp, isLoading };
}

export default useSignup;
