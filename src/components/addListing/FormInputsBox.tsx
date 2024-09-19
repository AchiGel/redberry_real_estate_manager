import styled from "styled-components";
import IsRental from "./IsRental";
import FormAddress from "./FormAddress";
import PropertyDetails from "./PropertyDetails";
import Agent from "./Agent";
import {
  AgentTypes,
  CitiesType,
  FormDataTypes,
  RegionsType,
} from "../../generalTypes.interface";
import React from "react";

const InputsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

export default function FormInputsBox({
  regions,
  cities,
  agents,
  formData,
  onInputChange,
  setFormData,
}: {
  regions: RegionsType[];
  cities: CitiesType[];
  agents: AgentTypes[];
  formData: FormDataTypes;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormDataTypes>>;
}) {
  return (
    <InputsBox>
      <IsRental formData={formData} onInputChange={onInputChange} />
      <FormAddress
        formData={formData}
        onInputChange={onInputChange}
        regions={regions}
        cities={cities}
        setFormData={setFormData}
      />
      <PropertyDetails formData={formData} setFormData={setFormData} />
      <Agent formData={formData} setFormData={setFormData} agents={agents} />
    </InputsBox>
  );
}
