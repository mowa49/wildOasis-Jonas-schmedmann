import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
/* eslint-disable react/prop-types */
function Stats({ bookings, confirmedStays }) {
  //////1
  console.log(confirmedStays);
  const numBookings = bookings.length;
  ///////2
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={sales}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={numBookings}
      />

      <Stat
        title="Occupacy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={numBookings}
      />
    </>
  );
}

export default Stats;
