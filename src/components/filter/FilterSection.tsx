// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import styled from "styled-components";
import Button from "../Button";
import { Link } from "react-router-dom";
import ChosenOption from "./ChosenOption";
import { useEffect, useState } from "react";
import RegionFilter from "./RegionFilter";
import PriceFilter from "./PriceFilter";
import AreaFilter from "./AreaFilter";
import BedroomsFilter from "./BedroomsFilter";
import AddAgentModal from "../modals/AddAgentModal";
import { FilterSectionProps } from "../../generalTypes.interface";

export const API_REGIONS =
  "https://api.real-estate-manager.redberryinternship.ge/api/regions";

const FilterSectionWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  @media screen and (max-width: 780px) {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
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
  @media screen and (max-width: 1367px) {
    gap: initial;
  }
  @media screen and (max-width: 1220px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
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
  @media screen and (max-width: 1027px) {
    flex-direction: column;
    gap: 3px;
  }
  @media screen and (max-width: 780px) {
    flex-direction: row;
    gap: 3px;
    justify-content: center;
  }
`;

export default function FilterSection({
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
  isFiltered,
  setIsFiltered,
}: FilterSectionProps) {
  const [regionClicked, setRegionClicked] = useState(false);
  const [priceClicked, setPriceClicked] = useState(false);
  const [areaClicked, setAreaClicked] = useState(false);
  const [bedroomsClicked, setBedroomsClicked] = useState(false);
  const [addAgentClicked, setAddAgentClicked] = useState(false);

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
    setIsFiltered(true);
  };

  const handleRemoveBedrooms = () => {
    setSelectedBedrooms(null);
    setIsFiltered(true);
  };

  const handleRemovePrices = () => {
    setSelectedPrices([null, null]);
    setIsFiltered(true);
  };

  const handleRemoveAreas = () => {
    setSelectedAreas([null, null]);
    setIsFiltered(true);
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
        {isFiltered && (
          <FilterLeftSectionDown>
            {regionsSelected?.map((region) => (
              <ChosenOption
                id={region.id}
                key={region.id}
                name={region.name}
                removeRegion={handleRemoveRegion}
              />
            ))}
            {selectedBedrooms !== null && (
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
                setSelectedBedrooms(null);
                setSelectedPrices([null, null]);
                setSelectedAreas([null, null]);
              }}
            >
              გასუფთავება
            </ClearButton>
          </FilterLeftSectionDown>
        )}
      </FilterLeftSection>
      <ButtonsSection>
        <Link to="/add_listing">
          <Button buttonType="ლისტინგის დამატება" />
        </Link>
        <Button
          buttonType="აგენტის დამატება"
          onClick={() => setAddAgentClicked(true)}
        ></Button>
      </ButtonsSection>
      {addAgentClicked && (
        <AddAgentModal
          setAgentClicked={setAddAgentClicked}
          agentClicked={addAgentClicked}
        />
      )}
    </FilterSectionWrapper>
  );
}
