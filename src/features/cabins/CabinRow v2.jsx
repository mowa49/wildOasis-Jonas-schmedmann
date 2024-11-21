import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import Button from "../../ui/Button";
import { HiPencil, HiTrash } from "react-icons/hi";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiSquares2X2 } from "react-icons/hi2";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
/* eslint-disable react/prop-types */
function CabinRow({ cabin }) {
  const { isCreating, createCabin } = useCreateCabin();
  const {
    id: cabinId,
    name,
    description,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();

  function handleDuplicate() {
    if (!isCreating)
      // createCabin({ ...cabin, name: `Copy of ${name}`, description });
      createCabin({
        maxCapacity,
        regularPrice,
        discount,
        image,
        name: `Copy of ${name}`,
        description,
      });
  }
  return (
    <>
      <Table.Row role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div> up tp {maxCapacity} person</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <Button variations="secondary" size="small" disabled={isDeleting}>
            Duplicate
          </Button>
          <Modal>
            <Modal.Open opens="edit">
              <Button variations="secondary" size="small">
                <HiPencil></HiPencil>
              </Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Open opens="delete">
              <Button variations="secondary" size="small">
                ❌
              </Button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button
                onClick={() => handleDuplicate()}
                icon={<HiSquares2X2 />}
              >
                Duplicate
              </Menus.Button>

              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>

              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
