import styled from "styled-components";

// import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "./BookingDataBox";

// import Spinner from "../../ui/Spinner";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

/* eslint-disable react/prop-types */
function BookingDetail() {
  const { booking, isLoading, error } = useBooking();
  console.log(booking); // This should now correctly log the booking object
  const moveBack = useMoveBack();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading booking details</div>;
  if (!booking) return <div>No booking details available.</div>;

  const { status, id: bookingId } = booking;
  if (isLoading) return <Spinner />;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  // if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking{bookingId} </Heading>
          <Tag type={statusToTagName[status]}></Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
