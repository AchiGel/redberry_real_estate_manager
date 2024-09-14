import styled from "styled-components";
import Button from "../Button";
import { Link } from "react-router-dom";
import Selector from "../Selector";
import ChosenOption from "../ChosenOption";
import { useEffect } from "react";
import RegionFilter from "./RegionFilter";

export interface ButtonTypes {
  buttonType: string;
}

export interface RegionsTypes {
  id: number;
  name: string;
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
}) {
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
          />
          <Selector />
          <Selector />
          <Selector />
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
