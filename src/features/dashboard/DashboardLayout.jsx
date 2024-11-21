import styled from "styled-components";
import useRecenetBookings from "./useRecenetBookings";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import useRecenetStays from "./useRecenetStays";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecenetBookings();
  const {
    stays,
    confirmedStays,
    isLoading: isLoading2,
    numDays,
  } = useRecenetStays();
  if (isLoading1) return <Spinner />;
  if (isLoading2) return <Spinner />;

  // console.log(bookings);
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} />
      <div> Todays activity</div>
      <DurationChart confirmedStays={confirmedStays} />
      <div>Chart`sales</div>
      <SalesChart bookings={bookings} numDays={numDays} stays={stays} />
    </StyledDashboardLayout>
  );
}

// function DashboardLayout() {
//   const { bookings, isLoading: isLoading1 } = useRecentBookings();
//   const { confirmedStays, isLoading: isLoading2 } = useRecentStays();
//   const { cabins, isLoading: isLoading3 } = useCabins();

//   if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

//   return (
//     <StyledDashboardLayout>
//       <Stats
//         bookings={bookings}
//         confirmedStays={confirmedStays}
//         numDays={numDays}
//         cabinCount={cabins.length}
//       />
//       <TodayActivity />
//       <DurationChart confirmedStays={confirmedStays} />
//       <SalesChart bookings={bookings} numDays={numDays} />
//     </StyledDashboardLayout>
//   );
// }

export default DashboardLayout;
