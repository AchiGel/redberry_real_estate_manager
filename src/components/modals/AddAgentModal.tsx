// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useState } from "react";
import styled from "styled-components";
import { AddListingFormTiTle } from "../../pages/AddListing";
import FormButton from "../addListing/FormButton";
import { ButtonsBox } from "../addListing/AddListingForm";
import { FormSectionGrid } from "../addListing/FormAddress";
import InputFields, {
  InputFieldLayout,
  InputLabel,
} from "../addListing/InputFields";
import ImageUpload from "../addListing/ImageUpload";
import { token } from "../../pages/Home";
import { AgentErrors } from "../../generalTypes.interface";

interface AgentModalProps {
  agentClicked: boolean;
  setAgentClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AgentFormTypes {
  name: string;
  surname: string;
  email: string;
  phone: string;
  avatar: Blob | File | null;
}

export const ModalLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  height: 100vh;
  width: 100vw;
  background-color: rgba(2, 21, 38, 0.34);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AgentModalLayout = styled.div`
  width: 50%;
  padding: 87px 105px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 4px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AgentInputsFlexbox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
`;

export default function AddAgentModal({
  agentClicked,
  setAgentClicked,
}: AgentModalProps) {
  const [agentForm, setAgentForm] = useState<AgentFormTypes>({
    name: "",
    surname: "",
    email: "",
    phone: "",
    avatar: null,
  });

  const [errors, setErrors] = useState<
    AgentErrors | { [key: string]: string | undefined }
  >({});

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleModalClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAgentClicked(!agentClicked);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setAgentClicked(false);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!agentForm.name) {
      newErrors.name = "სავალდებულო";
    } else if (agentForm.name.length < 2) {
      newErrors.name = "მინიმუმ 2 სიმბოლო";
    }

    if (!agentForm.surname) {
      newErrors.surname = "სავალდებულო";
    } else if (agentForm.surname.length < 2) {
      newErrors.surname = "მინიმუმ 2 სიმბოლო";
    }

    if (!agentForm.email) {
      newErrors.email = "სავალდებულო";
    } else if (!/\S+@\S+\.\S+/.test(agentForm.email)) {
      newErrors.email = "უნდა მთავრდებოდეს @redberry.ge-თ";
    }

    if (!agentForm.phone) {
      newErrors.phone = "სავალდებულო";
    } else if (!agentForm.phone.match(/^5\d{8}$/)) {
      newErrors.phone = "უნდა იყოს ფორმატის 5XXXXXXXX";
    }

    if (!agentForm.avatar) {
      newErrors.avatar = "სავალდებულო";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", agentForm.name);
    formData.append("surname", agentForm.surname);
    formData.append("email", agentForm.email);
    formData.append("phone", agentForm.phone);

    if (agentForm.avatar) {
      formData.append("avatar", agentForm.avatar);
    } else {
      console.error("Avatar is not selected or invalid");
    }

    try {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/agents",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }

      if (response.status === 201) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <ModalLayer onClick={handleOverlayClick}>
      <AgentModalLayout onClick={(e) => e.stopPropagation()}>
        {success ? (
          <AddListingFormTiTle style={{ color: "green" }}>
            აგენტი წარმატებით დაემატა
          </AddListingFormTiTle>
        ) : (
          <>
            <AddListingFormTiTle>აგენტის დამატება</AddListingFormTiTle>
            <AgentInputsFlexbox>
              <FormSectionGrid>
                <InputFields
                  type="text"
                  id="name"
                  label="სახელი *"
                  agentForm={agentForm}
                  setAgentForm={setAgentForm}
                  minLength={2}
                  required={true}
                  $validationError={errors.name}
                  setErrors={setErrors}
                />
                <InputFields
                  type="text"
                  id="surname"
                  label="გვარი *"
                  agentForm={agentForm}
                  setAgentForm={setAgentForm}
                  minLength={2}
                  required={true}
                  $validationError={errors.surname}
                  setErrors={setErrors}
                />
              </FormSectionGrid>
              <FormSectionGrid>
                <InputFields
                  type="text"
                  id="email"
                  label="ელ.ფოსტა *"
                  agentForm={agentForm}
                  setAgentForm={setAgentForm}
                  required
                  $validationError={errors.email}
                  setErrors={setErrors}
                />
                <InputFields
                  type="text"
                  id="phone"
                  label="ტელეფონის ნომერი *"
                  agentForm={agentForm}
                  setAgentForm={setAgentForm}
                  pattern="5\d{8}"
                  required
                  $validationError={errors.phone}
                  setErrors={setErrors}
                />
              </FormSectionGrid>
              <InputFieldLayout>
                <InputLabel>ატვირთეთ ფოტო *</InputLabel>
                <ImageUpload
                  required={true}
                  setAgentForm={setAgentForm}
                  formType="agent"
                  $validationError={errors.avatar}
                  setErrors={setErrors}
                />
              </InputFieldLayout>
              <ButtonsBox>
                <FormButton
                  $btnStyle="cancel"
                  btnText="გაუქმება"
                  onClick={handleModalClose}
                />
                <FormButton
                  $btnStyle="add"
                  btnText="დაამატე აგენტი"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                />
              </ButtonsBox>
            </AgentInputsFlexbox>
          </>
        )}
      </AgentModalLayout>
    </ModalLayer>
  );
}
