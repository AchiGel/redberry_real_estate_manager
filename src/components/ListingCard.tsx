import styled from "styled-components";
import { PropertyTypes } from "../pages/Home";

const ListingCardLayout = styled.div`
  position: relative;
  overflow: hidden;
  max-width: 384px;
  border-radius: 14px;
  transition: all 0.4s ease;
  border: 1px solid #dbdbdb;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 5px 5px 12px 0px rgba(2, 21, 38, 0.08);
  }
`;

const ListingCoverImg = styled.img`
  height: 307px;
  object-fit: cover;
`;

const ListingCardInfo = styled.div`
  padding: 22px 25px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListingCardInfoUp = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListingCardInfoDown = styled.div`
  display: flex;
  gap: 32px;
`;

const ListingPrice = styled.h2`
  color: #021526;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 6.5px;
`;

const ListingAddress = styled.h3`
  color: rgba(2, 21, 38, 0.7);
  font-size: 16px;
  font-weight: 400;
  position: relative;
  padding-left: 20px;

  &::before {
    content: "";
    background-image: url("./listingicons/location-marker.svg");
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 16px;
    width: 16px;
  }
`;

const DownSectionInfos = styled.p<{ icon: string }>`
  color: rgba(2, 21, 38, 0.7);
  font-size: 16px;
  font-weight: 400;
  position: relative;
  padding-left: 20px;
  &::before {
    content: "";
    background-image: url(${(props) => props.icon});
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 16px;
    width: 16px;
  }
`;

const IsRental = styled.div`
  border-radius: 15px;
  background: rgba(2, 21, 38, 0.5);
  position: absolute;
  left: 23px;
  top: 23px;
  padding: 6px 12px;
  color: #fff;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.48px;
`;

export default function ListingCard(props: PropertyTypes) {
  return (
    <ListingCardLayout>
      <IsRental>{props.is_rental ? "ქირავდება" : "იყიდება"}</IsRental>
      <ListingCoverImg src={props.image} />
      <ListingCardInfo>
        <ListingCardInfoUp>
          <ListingPrice>
            {Intl.NumberFormat("ka-GE", {
              useGrouping: true,
            }).format(props.price) + " ₾"}
          </ListingPrice>
          <ListingAddress>{props.city + ", " + props.address}</ListingAddress>
        </ListingCardInfoUp>
        <ListingCardInfoDown>
          <DownSectionInfos icon="./listingicons/bed.svg">
            {props.bedrooms}
          </DownSectionInfos>
          <DownSectionInfos icon="./listingicons/Vector.svg">
            {props.area + " მ²"}
          </DownSectionInfos>
          <DownSectionInfos icon="./listingicons/post.svg">
            {props.zip_code}
          </DownSectionInfos>
        </ListingCardInfoDown>
      </ListingCardInfo>
    </ListingCardLayout>
  );
}
