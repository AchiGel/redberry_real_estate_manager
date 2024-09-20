import styled from "styled-components";
import FormButton from "./FormButton";
import FormInputsBox from "./FormInputsBox";
import { useEffect, useState } from "react";
import { API_REGIONS } from "../filter/FilterSection";
import { API_AGENTS, API_CITIES, API_URL, token } from "../../pages/Home";
import {
  FormDataTypes,
  ListingErrorsTypes,
} from "../../generalTypes.interface";

export const ButtonsBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  align-self: flex-end;
`;

const AddListingFormLayout = styled.form`
  display: flex;
  flex-direction: column;
  gap: 90px;
  width: 100%;
`;

export const InputsBoxesTitles = styled.h3`
  color: #1a1a1f;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
`;

export default function AddListingForm() {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [agents, setAgents] = useState([]);
  const [formData, setFormData] = useState<FormDataTypes>({
    price: null,
    zip_code: "",
    description: "",
    area: null,
    city_id: null,
    address: "",
    agent_id: null,
    bedrooms: null,
    is_rental: null,
    image: null,
  });

  const [listingErrors, setListingErrors] = useState<ListingErrorsTypes>({});

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

    const fetchCities = async () => {
      const response = await fetch(API_CITIES, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCities(data);
    };

    fetchCities();

    const fetchAgents = async () => {
      const response = await fetch(API_AGENTS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAgents(data);
    };

    fetchAgents();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.address) {
      newErrors.address = "სავალდებულო";
    } else if (formData.address.length < 2) {
      newErrors.address = "მინიმუმ 2 სიმბოლო";
    }

    if (!formData.image) {
      newErrors.image = "სავალდებულო";
    } else if (formData.image.size > 1 * 1024 * 1024) {
      newErrors.image = "არ უნდა აღებმატებოდეს 1mb-ის ზომაში";
    } else if (formData.image.type !== "image/jpeg") {
      newErrors.image = "სურათის ტიპი";
    }

    if (!formData.region_id) {
      newErrors.region_id = "სავალდებულო";
    }

    if (!formData.city_id) {
      newErrors.city_id = "სავალდებულო";
    }

    if (!formData.zip_code) {
      newErrors.zip_code = "სავალდებულო";
    } else if (!formData.zip_code.match(/^\d+$/)) {
      newErrors.zip_code = "რიცხობრივი";
    }
    if (!formData.price) {
      newErrors.price = "სავალდებულო";
    } else if (!formData.price.match(/^\d+$/)) {
      newErrors.price = "რიცხობრივი";
    }
    if (!formData.area) {
      newErrors.area = "სავალდებულო";
    } else if (!formData.area.match(/^\d+$/)) {
      newErrors.area = "რიცხობრივი";
    }
    if (!formData.bedrooms) {
      newErrors.bedrooms = "სავალდებულო";
    } else if (!formData.bedrooms.match(/^-?\d+$/)) {
      newErrors.bedrooms = "რიცხობრივი და მთელი რიცხვი";
    }
    if (!formData.description) {
      newErrors.description = "სავალდებულო";
    } else if (formData.description.trim().split(" ").length < 5) {
      newErrors.description = "მინიმუმ 5 სიტყვა";
    }
    if (!formData.is_rental) {
      newErrors.is_rental = "სავალდებულო";
    }
    if (!formData.agent_id) {
      newErrors.agent_id = "სავალდებულო";
    }

    setListingErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // console.log(listingErrors);

    if (!validateForm()) return;

    const formDataListing = new FormData();
    formDataListing.append("address", formData.address);
    formDataListing.append("image", formData.image);
    formDataListing.append("region_id", formData.region_id);
    formDataListing.append("description", formData.description);
    formDataListing.append("city_id", formData.city_id);
    formDataListing.append("zip_code", formData.zip_code);
    formDataListing.append("price", formData.price);
    formDataListing.append("area", formData.area);
    formDataListing.append("bedrooms", formData.bedrooms);
    formDataListing.append("is_rental", formData.is_rental);
    formDataListing.append("agent_id", formData.agent_id);

    console.log("success");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataListing,
      });
      console.log(response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setFormData({
      price: null,
      zip_code: "",
      description: "",
      area: null,
      city_id: null,
      address: "",
      agent_id: null,
      bedrooms: null,
      is_rental: null,
      image: null,
    });
  };

  // console.log("regions", regions);
  // console.log("cities", cities);
  // console.log("agents", agents);

  return (
    <AddListingFormLayout onSubmit={handleFormSubmit}>
      <FormInputsBox
        regions={regions}
        cities={cities}
        agents={agents}
        formData={formData}
        setFormData={setFormData}
        onInputChange={handleInputChange}
        listingErrors={listingErrors}
        setListingErrors={setListingErrors}
      />
      <ButtonsBox>
        <FormButton $btnStyle="cancel" btnText="გაუქმება" type="reset" />
        <FormButton $btnStyle="add" btnText="დაამატე ლისტინგი" type="submit" />
      </ButtonsBox>
    </AddListingFormLayout>
  );
}
