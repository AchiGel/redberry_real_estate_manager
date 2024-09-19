// Button Interfaces
export interface ButtonTypes {
  buttonType: string;
  onClick: () => void;
}

// Agent Interfaces
export interface AgentTypes {
  avatar: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

// Agent Form Interfaces
import { AgentFormTypes } from "./components/modals/AddAgentModal";

export interface InputFieldsProps {
  type: string;
  label: string;
  id: string;
  $gridArea?: string;
  agentForm: AgentFormTypes;
  setAgentForm: React.Dispatch<React.SetStateAction<AgentFormTypes>>;
  required: boolean;
  minLength?: number;
  pattern?: string;
  validationError: string | undefined;
  setValidationError: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
}

// Region and City Interfaces
export interface RegionsTypes {
  id: number;
  name: string;
}

export interface RegionsType {
  id: number;
  name: string;
}

export interface CitiesType {
  id: number;
  name: string;
  region_id: number;
}

// Property and Listing Interfaces
export interface ListingCardProps {
  image: string;
  price: number;
  address: string;
  bedrooms: number;
  zip_code: number;
  area: number;
  city: string;
  is_rental: number;
  id: number;
}

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
    region: {
      id: number;
      name: string;
    };
    region_id: number;
  };
  is_rental: number;
  created_at: string;
  description: string;
}

// Filter Section Interfaces
export interface FilterSectionProps {
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

// Filter Interfaces for Area, Bedroom, Price, and Region
export interface AreaFilterProps {
  areaClicked: boolean;
  setPriceClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setRegionClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setAreaClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setBedroomsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAreas: React.Dispatch<
    React.SetStateAction<[number | null, number | null]>
  >;
}

export interface BedroomFilterProps {
  bedroomsClicked: boolean;
  setPriceClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setRegionClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setAreaClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setBedroomsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBedrooms: React.Dispatch<React.SetStateAction<number | "">>;
}

export interface PriceFilterProps {
  priceClicked: boolean;
  setPriceClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setRegionClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setAreaClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setBedroomsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedPrices: React.Dispatch<
    React.SetStateAction<[number | null, number | null]>
  >;
}

export interface RegionFilterProps {
  regions: RegionsTypes[] | undefined;
  regionsSelected: RegionsTypes[] | undefined;
  setRegionsSelected: React.Dispatch<
    React.SetStateAction<RegionsTypes[] | undefined>
  >;
  setFilteredOptions: React.Dispatch<React.SetStateAction<PropertyTypes[]>>;
  listing: PropertyTypes[];
  regionClicked: boolean;
  setRegionClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setPriceClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setAreaClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setBedroomsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

// Chosen Option Interface
export interface ChosenOptionProps {
  id?: number;
  name?: string;
  selectedBedrooms?: number | "";
  selectedPrices?: [number | null, number | null];
  selectedAreas?: [number | null, number | null];
  removeRegion?: (id: number) => void;
  removeBedrooms?: (bedroom: string) => void;
  removePrices?: () => void;
  removeAreas?: () => void;
}
