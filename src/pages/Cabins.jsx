import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";

import AddCabin from "../features/cabins/AddCabin";
import CabinTaleOperations from "../features/cabins/CabinTaleOperations";

function Cabins() {
  return (
    <>
      <Row type="horizental">
        <Heading as="h1">All cabins</Heading>
        <CabinTaleOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
