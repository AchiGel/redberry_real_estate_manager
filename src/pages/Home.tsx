// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import styled from "styled-components";
import FilterSection from "../components/filter/FilterSection";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { PropertyTypes, RegionsTypes } from "../generalTypes.interface";

export const token = "9cfd9147-04a6-47c4-8eba-407452441d23";

export const API_URL =
  "https://api.real-estate-manager.redberryinternship.ge/api/real-estates";

export const API_CITIES =
  "https://api.real-estate-manager.redberryinternship.ge/api/cities";

export const API_AGENTS =
  "https://api.real-estate-manager.redberryinternship.ge/api/agents";

const ListingGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  @media screen and (max-width: 1367px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const WarningMessage = styled.p`
  color: rgba(2, 21, 38, 0.8);
  font-size: 20px;
  font-weight: 400;
`;

export default function Home() {
  const [listing, setListing] = useState<PropertyTypes[]>([]);
  const [filterOptions, setFilterOptions] = useState<PropertyTypes[]>([]);
  const [regions, setRegions] = useState<RegionsTypes[] | undefined>();
  const [regionsSelected, setRegionsSelected] = useState<
    | {
        id: number;
        name: string;
      }[]
    | undefined
  >(() => {
    const savedRegions = localStorage.getItem("selectedRegions");
    return savedRegions ? JSON.parse(savedRegions) : [];
  });

  const [selectedPrices, setSelectedPrices] = useState<
    [number | null, number | null]
  >(() => {
    const savedPrices = localStorage.getItem("selectedPrices");
    return savedPrices ? JSON.parse(savedPrices) : [null, null];
  });

  const [selectedAreas, setSelectedAreas] = useState<
    [number | null, number | null]
  >(() => {
    const savedAreas = localStorage.getItem("selectedAreas");
    return savedAreas ? JSON.parse(savedAreas) : [null, null];
  });

  const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(
    () => {
      const savedBedrooms = localStorage.getItem("selectedBedrooms");
      return savedBedrooms !== undefined
        ? JSON.parse(savedBedrooms)
        : undefined;
    }
  );

  const [isFiltered, setIsFiltered] = useState(() => {
    const savedRegions = localStorage.getItem("selectedRegions");
    const savedBedrooms = localStorage.getItem("selectedBedrooms");
    const savedPrices = localStorage.getItem("selectedPrices");
    const savedAreas = localStorage.getItem("selectedAreas");

    const regionsValid = savedRegions
      ? JSON.parse(savedRegions).length > 0
      : false;
    const bedroomsValid = savedBedrooms
      ? JSON.parse(savedBedrooms) !== null
      : false;
    const pricesValid =
      savedPrices &&
      JSON.parse(savedPrices)[0] !== null &&
      JSON.parse(savedPrices)[1] !== null;
    const areasValid =
      savedAreas &&
      JSON.parse(savedAreas)[0] !== null &&
      JSON.parse(savedAreas)[1] !== null;

    return regionsValid || bedroomsValid || pricesValid || areasValid;
  });

  console.log("regionsSelected", regionsSelected);
  console.log("selectedAreas", selectedAreas);
  console.log("selectedBedrooms", selectedBedrooms);
  console.log("selectedPrices", selectedPrices);
  console.log("filteredOptions", filterOptions);
  console.log("isFiltered", isFiltered);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setListing(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "selectedRegions",
      JSON.stringify(regionsSelected ?? [])
    );
    localStorage.setItem(
      "selectedBedrooms",
      selectedBedrooms !== undefined
        ? JSON.stringify(selectedBedrooms)
        : undefined
    );
    localStorage.setItem("selectedPrices", JSON.stringify(selectedPrices));
    localStorage.setItem("selectedAreas", JSON.stringify(selectedAreas));
  }, [regionsSelected, selectedAreas, selectedBedrooms, selectedPrices]);

  useEffect(() => {
    const isAnyFilterSet =
      regionsSelected.length > 0 ||
      selectedBedrooms !== null ||
      selectedPrices[0] !== null ||
      selectedPrices[1] !== null ||
      selectedAreas[0] !== null ||
      selectedAreas[1] !== null;

    setIsFiltered(isAnyFilterSet);

    const filtered = listing.filter((property) => {
      const regionMatches = regionsSelected?.length
        ? regionsSelected.some(
            (region) => region.id === property.city.region.id
          )
        : true;

      const bedroomsMatch =
        selectedBedrooms !== "" ? property.bedrooms === selectedBedrooms : true;

      const priceMatch =
        selectedPrices[0] !== null && selectedPrices[1] !== null
          ? selectedPrices[0] <= property.price &&
            property.price <= selectedPrices[1]
          : true;

      const areasMatch =
        selectedAreas[0] !== null && selectedAreas[1] !== null
          ? selectedAreas[0] <= property.area &&
            property.area <= selectedAreas[1]
          : true;

      return regionMatches && bedroomsMatch && priceMatch && areasMatch;
    });

    setFilterOptions(filtered);
  }, [
    regionsSelected,
    listing,
    selectedBedrooms,
    selectedPrices,
    selectedAreas,
  ]);

  return (
    <div>
      <FilterSection
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        regions={regions}
        setRegions={setRegions}
        regionsSelected={regionsSelected}
        setRegionsSelected={setRegionsSelected}
        listing={listing}
        selectedBedrooms={selectedBedrooms}
        setSelectedBedrooms={setSelectedBedrooms}
        selectedPrices={selectedPrices}
        setSelectedPrices={setSelectedPrices}
        selectedAreas={selectedAreas}
        setSelectedAreas={setSelectedAreas}
        isFiltered={isFiltered}
        setIsFiltered={setIsFiltered}
      />
      <ListingGrid>
        {isFiltered && filterOptions.length === 0 ? (
          <WarningMessage>
            აღნიშნული მონაცემებით განცხადება არ იძებნება
          </WarningMessage>
        ) : filterOptions.length > 0 ? (
          filterOptions.map((item: PropertyTypes) => (
            <ListingCard
              key={item.id}
              image={item.image}
              price={item.price}
              address={item.address}
              bedrooms={item.bedrooms}
              zip_code={item.zip_code}
              area={item.area}
              city={item.city.name}
              is_rental={item.is_rental}
              id={item.id}
            />
          ))
        ) : (
          listing.map((item: PropertyTypes) => (
            <ListingCard
              key={item.id}
              image={item.image}
              price={item.price}
              address={item.address}
              bedrooms={item.bedrooms}
              zip_code={item.zip_code}
              area={item.area}
              city={item.city.name}
              is_rental={item.is_rental}
              id={item.id}
            />
          ))
        )}
      </ListingGrid>
    </div>
  );
}
