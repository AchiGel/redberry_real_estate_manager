// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import styled from "styled-components";
import IsRental from "./IsRental";
import FormAddress from "./FormAddress";
import PropertyDetails from "./PropertyDetails";
import Agent from "./Agent";
import { FormInputBoxTypes } from "../../generalTypes.interface";

const InputsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

export default function FormInputsBox({
  regions,
  cities,
  agents,
  regionsLoading,
  regionsError,
  citiesLoading,
  citiesError,
  agentsLoading,
  agentsError,
  formData,
  onInputChange,
  setFormData,
  listingErrors,
  setListingErrors,
}: FormInputBoxTypes) {
  return (
    <InputsBox>
      <IsRental
        formData={formData}
        onInputChange={onInputChange}
        listingErrors={listingErrors}
        setListingErrors={setListingErrors}
      />
      {regionsLoading && <p>Loading regions...</p>}
      {regionsError && <p style={{ color: "red" }}>{regionsError.message}</p>}
      {citiesLoading && <p>Loading cities...</p>}
      {citiesError && <p style={{ color: "red" }}>{citiesError.message}</p>}
      {regions && cities && (
        <FormAddress
          formData={formData}
          onInputChange={onInputChange}
          regions={regions}
          cities={cities}
          setFormData={setFormData}
          listingErrors={listingErrors}
          setListingErrors={setListingErrors}
        />
      )}

      <PropertyDetails
        formData={formData}
        setFormData={setFormData}
        listingErrors={listingErrors}
        setListingErrors={setListingErrors}
      />
      {agentsError && <p style={{ color: "red" }}>{agentsError.message}</p>}
      {agentsLoading && <p>Loading agents...</p>}
      {agents && (
        <Agent
          formData={formData}
          setFormData={setFormData}
          agents={agents}
          listingErrors={listingErrors}
          setListingErrors={setListingErrors}
        />
      )}
    </InputsBox>
  );
}
