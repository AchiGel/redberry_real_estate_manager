export interface ButtonTypes {
  buttonType: string;
  onClick?: () => void;
}

export interface AgentTypes {
  avatar: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  id?: number;
}

interface AgentFormTypes {
  name: string;
  surname: string;
  email: string;
  phone: string;
  avatar: Blob | File | null;
}

export interface InputFieldsProps {
  type: string;
  label: string;
  id: string;
  $gridArea: string;
  agentForm?: AgentFormTypes;
  setAgentForm: React.Dispatch<React.SetStateAction<AgentFormTypes>>;
  required: boolean;
  minLength?: number;
  pattern?: string;
  $validationError: string | undefined | { [key: string]: string | undefined };
  setErrors: React.Dispatch<
    React.SetStateAction<AgentErrors | Record<string, string | undefined>>
  >;
  value?: string | number | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  listingError?: string | undefined;
  setListingErrors: React.Dispatch<
    React.SetStateAction<
      | ListingErrorsTypes
      | Record<string, string | undefined>
      | string
      | undefined
    >
  >;
}

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
  selectedBedrooms: number | "" | null;
  setSelectedBedrooms: React.Dispatch<React.SetStateAction<number | "" | null>>;
  selectedPrices: [number | null, number | null];
  setSelectedPrices: React.Dispatch<
    React.SetStateAction<[number | null, number | null]>
  >;
  selectedAreas: [number | null, number | null];
  setSelectedAreas: React.Dispatch<
    React.SetStateAction<[number | null, number | null]>
  >;
  isFiltered: boolean;
  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  isMounted: boolean;
}

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

export interface FormDataTypes {
  price: number | null;
  zip_code: string;
  description: string;
  area: number | null;
  city_id: number | null;
  address: string;
  agent_id: number | null;
  bedrooms: number | null;
  is_rental: number | null;
  image: Blob | File | null;
  region_id: number | null;
}

export interface ListingErrorsTypes {
  address: string | undefined;
  agent_id: string | undefined;
  area: string | undefined;
  bedrooms: string | undefined;
  city_id: string | undefined;
  description: string | undefined;
  image: string | undefined;
  is_rental: string | undefined;
  price: string | undefined;
  region_id: string | undefined;
  zip_code: string | undefined;
}

export interface FormAddressProps {
  regions: RegionsType[];
  cities: CitiesType[];
  formData: FormDataTypes;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> & {
      target: { name: string; value: string | number | null };
    }
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormDataTypes>>;
  listingErrors:
    | ListingErrorsTypes
    | { [key: string]: string | undefined }
    | string
    | undefined;
  setListingErrors: React.Dispatch<
    React.SetStateAction<
      | ListingErrorsTypes
      | { [key: string]: string | undefined }
      | string
      | undefined
    >
  >;
}

export interface FormInputBoxTypes {
  regions: RegionsType[];
  cities: CitiesType[];
  regionsLoading: boolean;
  regionsError: Error | null;
  citiesLoading: boolean;
  citiesError: Error | null;
  agentsLoading: boolean;
  agentsError: Error | null;
  agents: AgentTypes[];
  formData: FormDataTypes;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormDataTypes>>;
  listingErrors:
    | ListingErrorsTypes
    | Record<string, string | undefined>
    | string
    | undefined;
  setListingErrors: React.Dispatch<
    React.SetStateAction<
      | ListingErrorsTypes
      | Record<string, string | undefined>
      | string
      | undefined
    >
  >;
}

export interface IsRentalTypes {
  formData: FormDataTypes;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  listingErrors: ListingErrorsTypes;

  setListingErrors: React.Dispatch<React.SetStateAction<ListingErrorsTypes>>;
}

export interface PropertyDetailsTypes {
  formData: FormDataTypes;
  setFormData: (
    e: React.Dispatch<React.SetStateAction<FormDataTypes>>
  ) => void | React.Dispatch<React.SetStateAction<FormDataTypes>>;
  listingErrors: ListingErrorsTypes;

  setListingErrors: React.Dispatch<React.SetStateAction<ListingErrorsTypes>>;
}

export interface AgentErrors {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  numeric?: string;
}
