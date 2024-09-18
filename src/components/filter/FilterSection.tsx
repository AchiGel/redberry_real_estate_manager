import styled from "styled-components";
import Button from "../Button";
import { Link } from "react-router-dom";
import ChosenOption from "./ChosenOption";
import { useEffect, useState } from "react";
import RegionFilter from "./RegionFilter";
import { PropertyTypes } from "../../pages/Home";
import PriceFilter from "./PriceFilter";
import AreaFilter from "./AreaFilter";
import BedroomsFilter from "./BedroomsFilter";

export const API_REGIONS =
  "https://api.real-estate-manager.redberryinternship.ge/api/regions";

export interface ButtonTypes {
  buttonType: string;
}

export interface RegionsTypes {
  id: number;
  name: string;
}

interface FilterSectionProps {
  filterOptions: PropertyTypes[];
  setFilterOptions: React.Dispatch<React.SetStateAction<PropertyTypes[]>>;
  regions: RegionsTypes[] | undefined;
  setRegions: React.Dispatch<React.SetStateAction<RegionsTypes[] | undefined>>;
  regionsSelected: RegionsTypes[] | undefined;
  setRegionsSelected: React.Dispatch<
    React.SetStateAction<RegionsTypes[] | undefined>
  >;
  listing: PropertyTypes[];
  selectedBedrooms: number | "";
  setSelectedBedrooms: React.Dispatch<React.SetStateAction<number | "">>;
  selectedPrices: [number | null, number | null];
  setSelectedPrices: React.Dispatch<
    React.SetStateAction<[number | null, number | null]>
  >;
  selectedAreas: [number | null, number | null];
  setSelectedAreas: React.Dispatch<
    React.SetStateAction<[number | null, number | null]>
  >;
}

const FilterSectionWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
`;

const FilterLeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FilterLeftSectionUp = styled.div`
  display: flex;
  border-radius: 10px;
  border: 1px solid #dbdbdb;
  gap: 24px;
  padding: 6px;
`;

const FilterLeftSectionDown = styled.div`
  display: flex;
  gap: 8px;
`;

const ClearButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
`;

const ButtonsSection = styled.div`
  display: flex;
  gap: 16px;
`;

export default function FilterSection({
  filterOptions,
  setFilterOptions,
  regions,
  setRegions,
  regionsSelected,
  setRegionsSelected,
  listing,
  selectedBedrooms,
  setSelectedBedrooms,
  selectedPrices,
  setSelectedPrices,
  selectedAreas,
  setSelectedAreas,
}: FilterSectionProps) {
  const [regionClicked, setRegionClicked] = useState(false);
  const [priceClicked, setPriceClicked] = useState(false);
  const [areaClicked, setAreaClicked] = useState(false);
  const [bedroomsClicked, setBedroomsClicked] = useState(false);

  useEffect(() => {
    const fetchRegions = async () => {
      const response = await fetch(API_REGIONS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setRegions(data);
    };
    fetchRegions();
  }, [setRegions]);

  const handleRemoveRegion = (id: number) => {
    setRegionsSelected((prev) => prev?.filter((r) => r.id !== id));
  };

  const handleRemoveBedrooms = () => {
    setSelectedBedrooms("");
    setFilterOptions([]);
  };

  const handleRemovePrices = () => {
    setSelectedPrices([null, null]);
  };

  const handleRemoveAreas = () => {
    setSelectedAreas([null, null]);
  };

  return (
    <FilterSectionWrapper>
      <FilterLeftSection>
        <FilterLeftSectionUp>
          <RegionFilter
            regions={regions}
            regionsSelected={regionsSelected}
            setRegionsSelected={setRegionsSelected}
            setFilteredOptions={setFilterOptions}
            listing={listing}
            regionClicked={regionClicked}
            setRegionClicked={setRegionClicked}
            setPriceClicked={setPriceClicked}
            setAreaClicked={setAreaClicked}
            setBedroomsClicked={setBedroomsClicked}
          />
          <PriceFilter
            priceClicked={priceClicked}
            setPriceClicked={setPriceClicked}
            setRegionClicked={setRegionClicked}
            setAreaClicked={setAreaClicked}
            setBedroomsClicked={setBedroomsClicked}
            setSelectedPrices={setSelectedPrices}
          />
          <AreaFilter
            areaClicked={areaClicked}
            setAreaClicked={setAreaClicked}
            setPriceClicked={setPriceClicked}
            setRegionClicked={setRegionClicked}
            setBedroomsClicked={setBedroomsClicked}
            setSelectedAreas={setSelectedAreas}
          />
          <BedroomsFilter
            bedroomsClicked={bedroomsClicked}
            setBedroomsClicked={setBedroomsClicked}
            setPriceClicked={setPriceClicked}
            setRegionClicked={setRegionClicked}
            setAreaClicked={setAreaClicked}
            setSelectedBedrooms={setSelectedBedrooms}
          />
        </FilterLeftSectionUp>
        {filterOptions.length ? (
          <FilterLeftSectionDown>
            {regionsSelected?.map((region) => (
              <ChosenOption
                id={region.id}
                key={region.id}
                name={region.name}
                removeRegion={handleRemoveRegion}
              />
            ))}
            {selectedBedrooms !== "" && (
              <ChosenOption
                selectedBedrooms={selectedBedrooms}
                removeBedrooms={handleRemoveBedrooms}
              />
            )}
            {selectedPrices[0] !== null && selectedPrices[1] !== null && (
              <ChosenOption
                selectedPrices={selectedPrices}
                removePrices={handleRemovePrices}
              />
            )}
            {selectedAreas[0] !== null && selectedAreas[1] !== null && (
              <ChosenOption
                selectedAreas={selectedAreas}
                removeAreas={handleRemoveAreas}
              />
            )}
            <ClearButton
              onClick={() => {
                setRegionsSelected([]);
                setSelectedBedrooms("");
                setSelectedPrices([null, null]);
                setSelectedAreas([null, null]);
              }}
            >
              გასუფთავება
            </ClearButton>
          </FilterLeftSectionDown>
        ) : null}
      </FilterLeftSection>
      <ButtonsSection>
        <Link to="/add_listing">
          <Button buttonType="ლისტინგის დამატება" />
        </Link>
        <Button buttonType="აგენტის დამატება" />
      </ButtonsSection>
    </FilterSectionWrapper>
  );
}
