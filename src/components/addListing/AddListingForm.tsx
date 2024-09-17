import styled from "styled-components";
import FormButton from "./FormButton";
import FormInputsBox from "./FormInputsBox";

const ButtonsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  align-self: flex-end;
`;

const AddListingFormLayout = styled.form`
  display: flex;
  flex-direction: column;
  gap: 90px;
  width: 100%;
`;

export const InputsBoxesTitles = styled.h3`
  color: #1a1a1f;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
`;

export default function AddListingForm() {
  return (
    <AddListingFormLayout>
      <FormInputsBox />
      <ButtonsBox>
        <FormButton $btnStyle="cancel" btnText="გაუქმება" />
        <FormButton $btnStyle="add" btnText="დაამატე ლისტინგი" />
      </ButtonsBox>
    </AddListingFormLayout>
  );
}
