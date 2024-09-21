import styled from "styled-components";
import IsRental from "./IsRental";
import FormAddress from "./FormAddress";
import PropertyDetails from "./PropertyDetails";
import Agent from "./Agent";
import {
  AgentTypes,
  CitiesType,
  FormDataTypes,
  ListingErrorsTypes,
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
  listingErrors,
  setListingErrors,
}: {
  regions: RegionsType[];
  cities: CitiesType[];
  agents: AgentTypes[];
  formData: FormDataTypes;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormDataTypes>>;
  listingErrors: ListingErrorsTypes;
  setListingErrors: React.Dispatch<
    React.SetStateAction<{ [key: string]: string | undefined }>
  >;
}) {
  return (
    <InputsBox>
      <IsRental
        formData={formData}
        onInputChange={onInputChange}
        listingErrors={listingErrors}
        setListingErrors={setListingErrors}
      />
      <FormAddress
        formData={formData}
        onInputChange={onInputChange}
        regions={regions}
        cities={cities}
        setFormData={setFormData}
        listingErrors={listingErrors}
        setListingErrors={setListingErrors}
      />
      <PropertyDetails
        formData={formData}
        setFormData={setFormData}
        listingErrors={listingErrors}
        setListingErrors={setListingErrors}
      />
      <Agent
        formData={formData}
        setFormData={setFormData}
        agents={agents}
        listingErrors={listingErrors}
        setListingErrors={setListingErrors}
      />
    </InputsBox>
  );
}
