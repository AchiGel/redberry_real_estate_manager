import styled from "styled-components";
import { InputsBoxesTitles } from "./AddListingForm";
import InputFields, { ErrorMessage } from "./InputFields";
import Select from "react-select";
import { useState } from "react";
import {
  CitiesType,
  FormDataTypes,
  ListingErrorsTypes,
  RegionsType,
} from "../../generalTypes.interface";

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
  formData,
  onInputChange,
  setFormData,
  listingErrors,
  setListingErrors,
}: {
  regions: RegionsType[];
  cities: CitiesType[];
  formData: FormDataTypes;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormDataTypes>>;
  listingErrors: ListingErrorsTypes;
  setListingErrors: React.Dispatch<React.SetStateAction<ListingErrorsTypes>>;
}) {
  const [selectedRegion, setSelectedRegion] = useState<number | null>(
    formData.region_id || null
  );

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

  const validateRegion = (value: number | null) => {
    if (!value) return false;
    return true;
  };

  const validateCity = (value: number | null) => {
    if (!value) return false;
    return true;
  };

  const handleRegionChange = (
    selectedOption: { label: string; value: number } | null
  ) => {
    const regionId = selectedOption ? selectedOption.value : null;
    setSelectedRegion(regionId);
    onInputChange({
      target: {
        name: "region_id",
        value: selectedOption ? selectedOption.value : null,
      },
    });
    onInputChange({
      target: {
        name: "city_id",
        value: null,
      },
    });
    const error = validateRegion(regionId);
    setListingErrors((prevErrors) => ({
      ...prevErrors,
      region_id: error,
    }));
  };

  const handleCityChange = (
    selectedOption: { label: string; value: number } | null
  ) => {
    const cityId = selectedOption ? selectedOption.value : null;

    onInputChange({
      target: {
        name: "city_id",
        value: selectedOption ? selectedOption.value : null,
      },
    });

    const error = validateCity(cityId);
    setListingErrors((prevErrors) => ({
      ...prevErrors,
      city_id: error,
    }));
  };

  return (
    <FormSectionWrapper>
      <InputsBoxesTitles>მდებარეობა</InputsBoxesTitles>
      <FormSectionGrid>
        <InputFields
          type="text"
          id="adress"
          label="მისამართი *"
          value={formData.address}
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              address: e.target.value,
            }))
          }
          listingErrors={listingErrors.address}
          setListingErrors={setListingErrors}
        />
        <InputFields
          type="number"
          id="zipCode"
          label="საფოსტო ინდექსი *"
          value={formData.zip_code}
          onChange={(e) =>
            setFormData((prevState) => ({
              ...prevState,
              zip_code: e.target.value,
            }))
          }
          listingErrors={listingErrors.zip_code}
          setListingErrors={setListingErrors}
        />
        <div>
          <Select
            options={regionsOptions}
            onChange={handleRegionChange}
            value={regionsOptions.find(
              (option) => option.value === selectedRegion
            )}
            placeholder="აირჩიეთ რეგიონი"
          />
          {listingErrors.region_id && <ErrorMessage>სავალდებულო</ErrorMessage>}
        </div>
        <div>
          <Select
            options={citiesOptions}
            onChange={handleCityChange}
            value={citiesOptions.find(
              (option) => option.value === formData.city_id
            )}
            placeholder="აირჩიეთ ქალაქი"
            isDisabled={!selectedRegion}
          />
          {listingErrors.city_id && <ErrorMessage>სავალდებულო</ErrorMessage>}
        </div>
      </FormSectionGrid>
    </FormSectionWrapper>
  );
}
