import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

function useBooking() {
  const { bookingId } = useParams();
  console.log(bookingId);

  const {
    isLoading,
    data, // This is where the response from `getBooking` is stored
    error,
  } = useQuery({
    queryKey: ["booking", bookingId], // Make sure the queryKey includes `bookingId` for better caching
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  const booking = data?.data; // Extract the actual booking object from the `data` object

  return { booking, isLoading, error };
}

export default useBooking;
