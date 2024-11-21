import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
  const queryClient = useQueryClient();
  //}READ FROM URL
  const [searchParams] = useSearchParams();
  //}FILTER
  const filteredValue = searchParams.get("status");
  const filter =
    !filteredValue || filteredValue === "all"
      ? null
      : { field: "status", value: filteredValue, method: "eq" };

  ///////////) QUERY
  console.log(filteredValue);
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, page],
    queryFn: () => getBookings({ filter, page }),
  });

  ////// PAGINATION
  // Ensure data exists before destructuring
  const bookings = data?.data || [];
  const count = data?.count || 0;

  ///////// PREFETCH
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, page + 1],
      queryFn: () => getBookings({ filter, page: page + 1 }),
    });

  if (page > pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, page - 1],
      queryFn: () => getBookings({ filter, page: page - 1 }),
    });

  return { isLoading, error, bookings, count };
}

export default useBookings;
