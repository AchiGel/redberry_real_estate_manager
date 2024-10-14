import styled from "styled-components";
import { Link } from "react-router-dom";
import { ListingCardProps } from "../generalTypes.interface";

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
    scale: 1.1;
  }
`;

const ListingCoverImg = styled.img`
  height: 307px;
  width: 100%;
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

export const ListingPrice = styled.h2<{ fontSize: string }>`
  color: #021526;
  font-size: ${(props) => props.fontSize};
  font-weight: 700;
  margin-bottom: 6.5px;
  @media screen and (max-width: 560px) {
    font-size: 24px;
  }
`;

export const ListingAddress = styled.h3<{ fontSize: string }>`
  color: rgba(2, 21, 38, 0.7);
  font-size: ${(props) => props.fontSize};
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
  @media screen and (max-width: 560px) {
    font-size: 16px;
  }
`;

export const DownSectionInfos = styled.p<{ $icon: string; fontSize: string }>`
  color: rgba(2, 21, 38, 0.7);
  font-size: ${(props) => props.fontSize};
  font-weight: 400;
  position: relative;
  padding-left: 20px;
  &::before {
    content: "";
    background-image: url(${(props) => props.$icon});
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 16px;
    width: 16px;
  }
  @media screen and (max-width: 560px) {
    font-size: 16px;
  }
`;

export const IsRental = styled.div<{
  fontSize: string;
  $left: string;
  $top: string;
}>`
  border-radius: 15px;
  background: rgba(2, 21, 38, 0.5);
  position: absolute;
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  padding: 6px 12px;
  color: #fff;
  text-align: center;
  font-size: ${(props) => props.fontSize};
  font-weight: 500;
  letter-spacing: 0.48px;
  @media screen and (max-width: 560px) {
    font-size: 10px;
    left: 1rem;
    top: 1rem;
  }
`;

export default function ListingCard(props: ListingCardProps) {
  return (
    <Link to={`/${props.id}`}>
      <ListingCardLayout>
        <IsRental $left="23px" $top="23px" fontSize="12px">
          {props.is_rental ? "ქირავდება" : "იყიდება"}
        </IsRental>
        <ListingCoverImg src={props.image} />
        <ListingCardInfo>
          <ListingCardInfoUp>
            <ListingPrice fontSize="28px">
              {Intl.NumberFormat("ka-GE", {
                useGrouping: true,
              }).format(props.price) + " ₾"}
            </ListingPrice>
            <ListingAddress fontSize="16px">
              {props.city + ", " + props.address}
            </ListingAddress>
          </ListingCardInfoUp>
          <ListingCardInfoDown>
            <DownSectionInfos $icon="./listingicons/bed.svg" fontSize="16px">
              {props.bedrooms}
            </DownSectionInfos>
            <DownSectionInfos $icon="./listingicons/Vector.svg" fontSize="16px">
              {props.area + " მ²"}
            </DownSectionInfos>
            <DownSectionInfos $icon="./listingicons/post.svg" fontSize="16px">
              {props.zip_code}
            </DownSectionInfos>
          </ListingCardInfoDown>
        </ListingCardInfo>
      </ListingCardLayout>
    </Link>
  );
}
