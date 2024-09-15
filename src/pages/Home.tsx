import styled from "styled-components";
import FilterSection, {
  RegionsTypes,
} from "../components/filter/FilterSection";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { AgentTypes } from "./ItemPage";

export const token = "9cfd9147-04a6-47c4-8eba-407452441d23";

const API_URL =
  "https://api.real-estate-manager.redberryinternship.ge/api/real-estates";

export interface PropertyTypes {
  agent: AgentTypes;
  address: string;
  image: string;
  price: number;
  id: number;
  area: number;
  bedrooms: number;
  zip_code: number;
  city: {
    id: number;
    name: string;
  };
  is_rental: number;
  created_at: string;
  description: string;
}

const ListingGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
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
    number[] | undefined
  >();

  // console.log(regionsSelected);
  // console.log(listing);
  console.log(filterOptions);

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
    if (regionsSelected && regionsSelected.length > 0) {
      const filtered = listing.filter((property) =>
        regionsSelected.includes(property.city.id)
      );
      setFilterOptions(filtered);
    } else {
      setFilterOptions([]);
    }
  }, [regionsSelected, listing]);

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
