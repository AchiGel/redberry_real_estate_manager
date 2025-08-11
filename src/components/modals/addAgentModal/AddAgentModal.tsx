import { useEffect, useState } from "react";
import { AddListingFormTiTle } from "../../../pages/AddListing";
import FormButton from "../../addListing/FormButton";
import { ButtonsBox } from "../../addListing/AddListingForm";
import { FormSectionGrid } from "../../addListing/FormAddress";
import {
  ModalLayer,
  AgentModalLayout,
  AgentInputsFlexbox,
  ErrorText,
  AgentInputLabel,
  AgentInputBox,
  AgentInputFieldLayout,
} from "./addAgentModalStyled";
import AgentImage from "./AgentImage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AgentFormTypes,
  agentSchema,
} from "../../../schemas/agentModalValidationSchema";

interface AgentModalProps {
  agentClicked: boolean;
  setAgentClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const token = import.meta.env.VITE_API_TOKEN;

export default function AddAgentModal({ setAgentClicked }: AgentModalProps) {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AgentFormTypes>({
    resolver: zodResolver(agentSchema),
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const onSubmit = async (data: AgentFormTypes) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("avatar", data.avatar[0]);

    try {
      const response = await fetch(`${apiUrl}/agents`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }

      if (response.status === 201) {
        setSuccess(true);
        reset(); // clear form after success
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleModalClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAgentClicked(false);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setAgentClicked(false);
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
            <AgentInputsFlexbox onSubmit={handleSubmit(onSubmit)}>
              <FormSectionGrid>
                <AgentInputFieldLayout>
                  <AgentInputLabel htmlFor="name">სახელი *</AgentInputLabel>
                  <AgentInputBox type="text" id="name" {...register("name")} />
                  {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
                </AgentInputFieldLayout>

                <AgentInputFieldLayout>
                  <AgentInputLabel htmlFor="surname">გვარი *</AgentInputLabel>
                  <AgentInputBox
                    type="text"
                    id="surname"
                    {...register("surname")}
                  />
                  {errors.surname && (
                    <ErrorText>{errors.surname.message}</ErrorText>
                  )}
                </AgentInputFieldLayout>
              </FormSectionGrid>
              <FormSectionGrid>
                <AgentInputFieldLayout>
                  <AgentInputLabel htmlFor="email">ელ.ფოსტა *</AgentInputLabel>
                  <AgentInputBox
                    type="text"
                    id="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <ErrorText>{errors.email.message}</ErrorText>
                  )}
                </AgentInputFieldLayout>

                <AgentInputFieldLayout>
                  <AgentInputLabel htmlFor="phone">
                    ტელეფონის ნომერი *
                  </AgentInputLabel>
                  <AgentInputBox
                    type="text"
                    id="phone"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <ErrorText>{errors.phone.message}</ErrorText>
                  )}
                </AgentInputFieldLayout>
              </FormSectionGrid>

              <AgentImage
                error={errors.avatar?.message}
                register={register("avatar")}
              />

              <ButtonsBox>
                <FormButton
                  $btnStyle="cancel"
                  btnText="გაუქმება"
                  onClick={handleModalClose}
                />
                <FormButton $btnStyle="add" btnText="დაამატე აგენტი" />
              </ButtonsBox>
            </AgentInputsFlexbox>
          </>
        )}
      </AgentModalLayout>
    </ModalLayer>
  );
}
