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
  >();

  const [selectedPrices, setSelectedPrices] = useState<
    [number | null, number | null]
  >([null, null]);

  const [selectedAreas, setSelectedAreas] = useState<
    [number | null, number | null]
  >([null, null]);

  const [selectedBedrooms, setSelectedBedrooms] = useState<number | "">("");
  const [isFiltered, setIsFiltered] = useState(false);

  // console.log("regionsSelected", regionsSelected);
  // console.log(listing);
  console.log("filterOptions", filterOptions);
  // console.log("selectedBedrooms", selectedBedrooms);
  // console.log("selectedPrices", selectedPrices);
  // console.log("selectedAreas", selectedAreas);

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
    if (
      !regionsSelected?.length &&
      selectedBedrooms === "" &&
      !selectedPrices[0] &&
      !selectedPrices[1] &&
      !selectedAreas[0] &&
      !selectedAreas[1]
    ) {
      setIsFiltered(false);
      return;
    } else {
      setIsFiltered(true);
    }

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

    // console.log("filtered", filtered);

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
        {filterOptions.length === 0 &&
        (!regionsSelected || regionsSelected.length === 0) ? (
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
          <WarningMessage>
            აღნიშნული მონაცემებით განცხადება არ იძებნება
          </WarningMessage>
        )}
      </ListingGrid>
    </div>
  );
}
