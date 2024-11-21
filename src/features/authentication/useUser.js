import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

function useUser() {
  const navigate = useNavigate();
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    onError: () => {
      // If the user fetch fails, redirect to login
      navigate("/login");
    },
  });
  const isAuthenticated = user?.role === "authenticated";

  return { isLoading, user, isAuthenticated };
}

export default useUser;
