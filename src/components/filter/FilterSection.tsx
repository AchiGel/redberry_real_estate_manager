import styled from "styled-components";
import Button from "../Button";
import { Link } from "react-router-dom";
import ChosenOption from "../ChosenOption";
import { useEffect, useState } from "react";
import RegionFilter from "./RegionFilter";
import { PropertyTypes } from "../../pages/Home";
import PriceFilter from "./PriceFilter";
import AreaFilter from "./AreaFilter";
import BedroomsFilter from "./BedroomsFilter";

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
  regionsSelected: number[] | undefined;
  setRegionsSelected: React.Dispatch<React.SetStateAction<number[]>>;
  listing: PropertyTypes[];
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
}: FilterSectionProps) {
  const [regionClicked, setRegionClicked] = useState(false);
  const [priceClicked, setPriceClicked] = useState(false);
  const [areaClicked, setAreaClicked] = useState(false);
  const [bedroomsClicked, setBedroomsClicked] = useState(false);

  useEffect(() => {
    const fetchRegions = async () => {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/regions",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setRegions(data);
    };
    fetchRegions();
  }, []);

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
            priceClicked={priceClicked}
            setPriceClicked={setPriceClicked}
            areaClicked={areaClicked}
            setAreaClicked={setAreaClicked}
            bedroomsClicked={bedroomsClicked}
            setBedroomsClicked={setBedroomsClicked}
          />
          <PriceFilter
            priceClicked={priceClicked}
            setPriceClicked={setPriceClicked}
            setRegionClicked={setRegionClicked}
            setAreaClicked={setAreaClicked}
            setBedroomsClicked={setBedroomsClicked}
          />
          <AreaFilter
            areaClicked={areaClicked}
            setAreaClicked={setAreaClicked}
            setPriceClicked={setPriceClicked}
            setRegionClicked={setRegionClicked}
            setBedroomsClicked={setBedroomsClicked}
          />
          <BedroomsFilter
            bedroomsClicked={bedroomsClicked}
            setBedroomsClicked={setBedroomsClicked}
            setPriceClicked={setPriceClicked}
            setRegionClicked={setRegionClicked}
            setAreaClicked={setAreaClicked}
          />
        </FilterLeftSectionUp>
        {filterOptions.length ? (
          <FilterLeftSectionDown>
            <ChosenOption />
            <ChosenOption />
            <ChosenOption />
            <ChosenOption />
            <ClearButton>გასუფთავება</ClearButton>
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
