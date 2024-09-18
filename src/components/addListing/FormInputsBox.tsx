import styled from "styled-components";
import IsRental from "./IsRental";
import FormAddress, { CitiesType, RegionsType } from "./FormAddress";
import PropertyDetails from "./PropertyDetails";
import Agent from "./Agent";
import { AgentsTypes } from "./AddListingForm";

const InputsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

export default function FormInputsBox({
  regions,
  cities,
  agents,
}: {
  regions: RegionsType[];
  cities: CitiesType[];
  agents: AgentsTypes[];
}) {
  return (
    <InputsBox>
      <IsRental />
      <FormAddress regions={regions} cities={cities} />
      <PropertyDetails />
      <Agent agents={agents} />
    </InputsBox>
  );
}
