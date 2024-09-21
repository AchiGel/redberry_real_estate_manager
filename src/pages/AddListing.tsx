import styled from "styled-components";
import AddListingForm from "../components/addListing/AddListingForm";

export const AddListingFormTiTle = styled.h2`
  color: #021526;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 61px;
`;

const AddListingFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1211px;
  align-self: center;
  width: 63%;
`;

export default function AddListing() {
  return (
    <AddListingFormWrapper>
      <AddListingFormTiTle>ლისტინგის დამატება</AddListingFormTiTle>
      <AddListingForm />
    </AddListingFormWrapper>
  );
}
