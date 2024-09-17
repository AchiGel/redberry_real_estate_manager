import styled from "styled-components";
import IsRental from "./IsRental";
import FormAddress from "./FormAddress";
import PropertyDetails from "./PropertyDetails";
import Agent from "./Agent";

const InputsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

export default function FormInputsBox() {
  return (
    <InputsBox>
      <IsRental />
      <FormAddress />
      <PropertyDetails />
      <Agent />
    </InputsBox>
  );
}
