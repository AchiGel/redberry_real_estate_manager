import styled from "styled-components";
import FormButton from "./FormButton";
import FormInputsBox from "./FormInputsBox";
import { useEffect, useState } from "react";
import { API_REGIONS } from "../filter/FilterSection";
import { token } from "../../pages/Home";

export interface AgentsTypes {
  avatar: string;
  id: number;
  name: string;
  surname: string;
}

const API_CITIES =
  "https://api.real-estate-manager.redberryinternship.ge/api/cities";

const API_AGENTS =
  "https://api.real-estate-manager.redberryinternship.ge/api/agents";

const ButtonsBox = styled.div`
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

  // console.log("regions", regions);
  // console.log("cities", cities);
  console.log("agents", agents);

  return (
    <AddListingFormLayout>
      <FormInputsBox regions={regions} cities={cities} agents={agents} />
      <ButtonsBox>
        <FormButton $btnStyle="cancel" btnText="გაუქმება" />
        <FormButton $btnStyle="add" btnText="დაამატე ლისტინგი" />
      </ButtonsBox>
    </AddListingFormLayout>
  );
}
