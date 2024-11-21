import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
  const [searchParams] = useSearchParams();

  // Parse the 'last' query parameter or default to 7 days
  const numDaysParam = searchParams.get("last");
  const numDays = numDaysParam ? Number(numDaysParam) : 7;

  // Validate numDays to ensure it's a positive number
  const validatedNumDays = isNaN(numDays) || numDays <= 0 ? 7 : numDays;

  // Calculate the query date based on validatedNumDays
  const queryDate = subDays(new Date(), validatedNumDays).toISOString();

  // Fetch stays data with React Query
  const {
    isLoading,
    data: stays,
    error,
  } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${validatedNumDays}`],
  });

  // Filter stays that have a status of "checked-Out"
  const confirmedStays = stays?.filter((stay) => stay.status === "checked-Out");

  return { isLoading, stays, confirmedStays, error, numDays };
}

export default useRecentStays;

// import { subDays } from "date-fns";
// import { useSearchParams } from "react-router-dom";

// import { useQuery } from "@tanstack/react-query";
// import { getStaysAfterDate } from "../../services/apiBookings";

// function useRecenetStays() {
//   const [searchParams] = useSearchParams();
//   const numDays = !searchParams.get("last")
//     ? 7
//     : Number(searchParams.get("last"));
//   const queryDate = subDays(new Date(), numDays).toISOString();

//   const { isLoading, data: stays } = useQuery({
//     queryFn: () => getStaysAfterDate(queryDate),
//     queryKey: ["stays", `last-${numDays}`],
//   });

//   const confirmedStays = stays?.filter((stay) => stay.status === "checked-Out");
//   return { isLoading, stays, confirmedStays };
// }

// export default useRecenetStays;
