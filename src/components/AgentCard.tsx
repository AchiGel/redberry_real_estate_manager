import styled from "styled-components";
import { DownSectionInfos } from "./ListingCard";
import { AgentTypes } from "../pages/ItemPage";

const AgentCardLayout = styled.div`
  padding: 24px 20px;
  border-radius: 8px;
  border: 1px solid #dbdbdb;
  width: 80%;
  margin-bottom: 20px;
`;

const AgentImageAndName = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const AgentImage = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 100px;
  object-fit: cover;
  margin-right: 14px;
`;

const AgentName = styled.h3`
  color: #021526;
  font-size: 16px;
  font-weight: 400;
`;

const AgentTitle = styled.p`
  color: #676e76;
  font-size: 14px;
  font-weight: 400;
`;

const AgentFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

const AgentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export default function AgentCard(props: AgentTypes) {
  return (
    <AgentCardLayout>
      <AgentImageAndName>
        <AgentImage src={props.avatar} alt={props.name} />
        <AgentFlex>
          <AgentName>{props.name + " " + props.surname}</AgentName>
          <AgentTitle>აგენტი</AgentTitle>
        </AgentFlex>
      </AgentImageAndName>
      <AgentInfo>
        <DownSectionInfos $icon="./listingicons/envelope.svg" fontSize="14px">
          {props.email}
        </DownSectionInfos>
        <DownSectionInfos $icon="./listingicons/phone.svg" fontSize="14px">
          {props.phone}
        </DownSectionInfos>
      </AgentInfo>
    </AgentCardLayout>
  );
}
