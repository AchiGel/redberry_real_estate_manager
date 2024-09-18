import { useEffect } from "react";
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

interface AgentModalProps {
  agentClicked: boolean;
  setAgentClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalLayer = styled.div`
  position: absolute;
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

const AgentModalLayout = styled.div`
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
`;

export default function AddAgentModal({
  agentClicked,
  setAgentClicked,
}: AgentModalProps) {
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

  return (
    <ModalLayer>
      <AgentModalLayout>
        <AddListingFormTiTle>აგენტის დამატება</AddListingFormTiTle>
        <AgentInputsFlexbox>
          <FormSectionGrid>
            <InputFields type="text" id="name" label="სახელი *" />
            <InputFields type="text" id="surname" label="გვარი *" />
          </FormSectionGrid>
          <FormSectionGrid>
            <InputFields type="email" id="email" label="ელ.ფოსტა *" />
            <InputFields
              type="number"
              id="phoneNumber"
              label="ტელეფონის ნომერი *"
            />
          </FormSectionGrid>
          <InputFieldLayout>
            <InputLabel>ატვირთეთ ფოტო *</InputLabel>
            <ImageUpload />
          </InputFieldLayout>
          <ButtonsBox>
            <FormButton
              $btnStyle="cancel"
              btnText="გაუქმება"
              onClick={handleModalClose}
            />
            <FormButton $btnStyle="add" btnText="დაამატე აგენტი" />
          </ButtonsBox>
        </AgentInputsFlexbox>
      </AgentModalLayout>
    </ModalLayer>
  );
}
