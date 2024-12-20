import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <>
      <Heading as="h1">
        Dashboard
        <DashboardFilter />
      </Heading>
      <Row type="horizontal">
        <DashboardLayout />
      </Row>
    </>
  );
}

export default Dashboard;
