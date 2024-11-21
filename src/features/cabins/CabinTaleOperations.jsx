import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTaleOperations() {
  //////// filter and sort
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "all" },
          { value: "no-discount", label: "no-discount" },
          { value: "with-discount", label: "with-discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "sort by name (A-Z)" },
          { value: "name-desc", label: "sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "sort by Price (High first)" },
          { value: "regularPrice-desc", label: "sort by Price (Low first)" },
          { value: "maxCapacity-asc", label: "sort by Capacity (High first)" },
          { value: "maxCapacity-desc", label: "sort by Capacity (Low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTaleOperations;
