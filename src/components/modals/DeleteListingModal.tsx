import { useEffect } from "react";
import { AgentModalLayout, ModalLayer } from "./AddAgentModal";
import styled from "styled-components";
import { ButtonsBox } from "../addListing/AddListingForm";
import FormButton from "../addListing/FormButton";

const DeleteListingModalTitle = styled.h2`
  color: #2d3648;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 35px;
`;

export default function DeleteListingModal({
  setDeleteClicked,
  handleDelete,
}: {
  setDeleteClicked: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleModalClose = () => {
    setDeleteClicked(false);
  };
  return (
    <ModalLayer>
      <AgentModalLayout>
        <div>
          <DeleteListingModalTitle>
            გსურთ წაშალოთ ლისტინგი?
          </DeleteListingModalTitle>
          <ButtonsBox>
            <FormButton
              $btnStyle="cancel"
              btnText="გაუქმება"
              onClick={handleModalClose}
            />
            <FormButton
              $btnStyle="add"
              btnText="დადასტურება"
              onClick={handleDelete}
            />
          </ButtonsBox>
        </div>
      </AgentModalLayout>
    </ModalLayer>
  );
}
