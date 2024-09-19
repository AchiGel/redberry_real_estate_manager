import styled from "styled-components";
import FormButton from "./FormButton";
import FormInputsBox from "./FormInputsBox";
import { useEffect, useState } from "react";
import { API_REGIONS } from "../filter/FilterSection";
import { API_AGENTS, API_CITIES, API_URL, token } from "../../pages/Home";
import { FormDataTypes } from "../../generalTypes.interface";

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataListing,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }
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
      />
      <ButtonsBox>
        <FormButton $btnStyle="cancel" btnText="გაუქმება" />
        <FormButton $btnStyle="add" btnText="დაამატე ლისტინგი" type="submit" />
      </ButtonsBox>
    </AddListingFormLayout>
  );
}
