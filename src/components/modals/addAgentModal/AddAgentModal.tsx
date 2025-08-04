import { useEffect, useState } from "react";
import { AddListingFormTiTle } from "../../../pages/AddListing";
import FormButton from "../../addListing/FormButton";
import { ButtonsBox } from "../../addListing/AddListingForm";
import { FormSectionGrid } from "../../addListing/FormAddress";
import { token } from "../../../pages/Home";
import { AgentErrors } from "../../../generalTypes.interface";
import {
  ModalLayer,
  AgentModalLayout,
  AgentInputsFlexbox,
  ErrorText,
  AgentInputLabel,
  AgentInputBox,
  AgentInputFieldLayout,
} from "./addAgentModal";
import AgentImage from "./AgentImage";

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

export default function AddAgentModal({ setAgentClicked }: AgentModalProps) {
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
    setAgentClicked(false);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setAgentClicked(false);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!agentForm.name) newErrors.name = "სავალდებულო";
    else if (agentForm.name.length < 2) newErrors.name = "მინიმუმ 2 სიმბოლო";

    if (!agentForm.surname) newErrors.surname = "სავალდებულო";
    else if (agentForm.surname.length < 2)
      newErrors.surname = "მინიმუმ 2 სიმბოლო";

    if (!agentForm.email) newErrors.email = "სავალდებულო";
    else if (!agentForm.email.endsWith("@redberry.ge"))
      newErrors.email = "უნდა მთავრდებოდეს @redberry.ge-თ";

    if (!agentForm.phone) newErrors.phone = "სავალდებულო";
    else if (!/^5\d{8}$/.test(agentForm.phone))
      newErrors.phone = "უნდა იყოს ფორმატის 5XXXXXXXX";

    if (!agentForm.avatar) newErrors.avatar = "სავალდებულო";

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
    if (agentForm.avatar) formData.append("avatar", agentForm.avatar);

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
            <AgentInputsFlexbox onSubmit={handleSubmit}>
              <FormSectionGrid>
                <AgentInputFieldLayout>
                  <AgentInputLabel htmlFor="name">სახელი *</AgentInputLabel>
                  <AgentInputBox
                    type="text"
                    id="name"
                    value={agentForm.name}
                    onChange={(e) =>
                      setAgentForm({ ...agentForm, name: e.target.value })
                    }
                  />
                  {errors.name && <ErrorText>{errors.name}</ErrorText>}
                </AgentInputFieldLayout>
                <AgentInputFieldLayout>
                  <AgentInputLabel htmlFor="surname">გვარი *</AgentInputLabel>
                  <AgentInputBox
                    type="text"
                    id="surname"
                    value={agentForm.surname}
                    onChange={(e) =>
                      setAgentForm({ ...agentForm, surname: e.target.value })
                    }
                  />
                  {errors.surname && <ErrorText>{errors.surname}</ErrorText>}
                </AgentInputFieldLayout>
              </FormSectionGrid>
              <FormSectionGrid>
                <AgentInputFieldLayout>
                  <AgentInputLabel htmlFor="email">ელ.ფოსტა *</AgentInputLabel>
                  <AgentInputBox
                    type="text"
                    id="email"
                    value={agentForm.email}
                    onChange={(e) =>
                      setAgentForm({ ...agentForm, email: e.target.value })
                    }
                  />
                  {errors.email && <ErrorText>{errors.email}</ErrorText>}
                </AgentInputFieldLayout>
                <AgentInputFieldLayout>
                  <AgentInputLabel htmlFor="phone">
                    ტელეფონის ნომერი *
                  </AgentInputLabel>
                  <AgentInputBox
                    type="text"
                    id="phone"
                    value={agentForm.phone}
                    onChange={(e) =>
                      setAgentForm({ ...agentForm, phone: e.target.value })
                    }
                  />
                  {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                </AgentInputFieldLayout>
              </FormSectionGrid>
              <AgentImage
                error={errors.avatar}
                setAgentForm={setAgentForm}
                agentForm={agentForm}
              />
              <ButtonsBox>
                <FormButton
                  $btnStyle="cancel"
                  btnText="გაუქმება"
                  onClick={handleModalClose}
                />
                <FormButton
                  $btnStyle="add"
                  btnText="დაამატე აგენტი"
                  onClick={handleSubmit}
                />
              </ButtonsBox>
            </AgentInputsFlexbox>
          </>
        )}
      </AgentModalLayout>
    </ModalLayer>
  );
}
