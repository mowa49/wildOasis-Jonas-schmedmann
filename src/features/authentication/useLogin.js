import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      // Ensure that the login API returns a promise
      return loginApi({ email, password });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
    onSuccess: (user) => {
      if (user) {
        /// add to the cahce
        queryClient.setQueryData(["user"], user.user);
        // Check if the user object is not null or undefined
        console.log(user);
        navigate("/dashboard", { replace: true });
      }
    },
  });

  return { login, isLoading };
}
export default useLogin;
