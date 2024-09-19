import styled from "styled-components";
import { InputsBoxesTitles } from "./AddListingForm";
import InputFields from "./InputFields";
import Select from "react-select";
import { useState } from "react";
import { CitiesType, RegionsType } from "../../generalTypes.interface";

export const FormSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const FormSectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 364px);
  gap: 20px;
`;

export default function FormAddress({
  regions,
  cities,
}: {
  regions: RegionsType[];
  cities: CitiesType[];
}) {
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);

  const regionsOptions = regions.map((region) => ({
    value: region.id,
    label: region.name,
  }));

  const filteredCities = selectedRegion
    ? cities.filter((city) => city.region_id === selectedRegion)
    : cities;

  const citiesOptions: { value: number; label: string }[] = filteredCities.map(
    (city) => ({
      value: city.id,
      label: city.name,
    })
  );

  const handleRegionChange = (
    selectedOption: {
      label: string;
      value: number;
    } | null
  ) => {
    if (selectedOption) {
      setSelectedRegion(selectedOption.value);
    } else {
      setSelectedRegion(null);
    }
  };

  return (
    <FormSectionWrapper>
      <InputsBoxesTitles>მდებარეობა</InputsBoxesTitles>
      <FormSectionGrid>
        <InputFields type="text" id="adress" label="მისამართი *" />
        <InputFields type="number" id="zipCode" label="საფოსტო ინდექსი *" />
        <Select
          options={regionsOptions}
          onChange={handleRegionChange}
          placeholder="აირჩიეთ რეგიონი"
        />
        <Select
          options={citiesOptions}
          placeholder="აირჩიეთ ქალაქი"
          isDisabled={!selectedRegion}
        />
      </FormSectionGrid>
    </FormSectionWrapper>
  );
}
