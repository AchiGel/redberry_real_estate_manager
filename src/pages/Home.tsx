import styled from "styled-components";
import FilterSection from "../components/filter/FilterSection";
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

export default function Home() {
  const [listing, setListing] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [regions, setRegions] = useState();
  const [regionsSelected, setRegionsSelected] = useState<
    number[] | undefined
  >();

  console.log(regionsSelected);
  console.log(listing);

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

  return (
    <div>
      <FilterSection
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        regions={regions}
        setRegions={setRegions}
        regionsSelected={regionsSelected}
        setRegionsSelected={setRegionsSelected}
      />
      <ListingGrid>
        {regionsSelected?.length
          ? "filtered properties"
          : listing.length
          ? listing.map((item: PropertyTypes) => (
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
          : "No properties"}
      </ListingGrid>
    </div>
  );
}
