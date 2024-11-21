import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

function useRecentBookings() {
  const [searchParams] = useSearchParams();

  // Parse the 'last' query parameter or default to 7
  const numDaysParam = searchParams.get("last");
  const numDays = numDaysParam ? Number(numDaysParam) : 7;

  // Validate numDays to ensure it's a positive number
  const validatedNumDays = isNaN(numDays) || numDays <= 0 ? 7 : numDays;

  // Calculate the query date based on validatedNumDays
  const queryDate = subDays(new Date(), validatedNumDays).toISOString();

  // Fetch bookings data with React Query
  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${validatedNumDays}`],
  });

  return { isLoading, bookings, numDays };
}

export default useRecentBookings;

// import { subDays } from "date-fns";
// import { useSearchParams } from "react-router-dom";
// import { getBookingsAfterDate } from "../../services/apiBookings";
// import { useQuery } from "@tanstack/react-query";

// function useRecenetBookings() {
//   const [searchParams] = useSearchParams();
//   const numDays = !searchParams.get("last")
//     ? 7
//     : Number(searchParams.get("last"));
//   const queryDate = subDays(new Date(), numDays).toISOString();

//   const { isLoading, data: bookings } = useQuery({
//     queryFn: () => getBookingsAfterDate(queryDate),
//     queryKey: ["bookings", `last-${numDays}`],
//   });
//   return { isLoading, bookings };
// }

// export default useRecenetBookings;
