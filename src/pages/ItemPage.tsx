import styled from "styled-components";
import ArrowButton from "../components/ArrowButton";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PropertyTypes, token } from "./Home";
import {
  DownSectionInfos,
  IsRental,
  ListingAddress,
  ListingPrice,
} from "../components/ListingCard";
import AgentCard from "../components/AgentCard";

export interface AgentTypes {
  avatar: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

const ListingPageLayout = styled.section`
  display: flex;
  margin-top: 29px;
  gap: 68px;
`;

const ListingPageLayoutLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 40%;
  gap: 11px;
  align-items: flex-end;
  position: relative;
`;

const ListingPageLayoutLeftInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17.5px;
  margin-bottom: 40px;
`;

const PublicDate = styled.p`
  color: #808a93;
  font-size: 16px;
  font-weight: 400;
`;

const DetailsFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ListingDescription = styled.p`
  color: #808a93;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  margin-bottom: 50px;
`;

const ListingPageCover = styled.img`
  border-radius: 14px 14px 0px 0px;
  width: 100%;
  height: 670px;
  object-fit: cover;
`;

const ListingPageLayoutRight = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 40%;
`;

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();

  const [listingPage, setListingPage] = useState<PropertyTypes>();

  console.log(listingPage);

  useEffect(() => {
    const fetchListingPage = async () => {
      const response = await fetch(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setListingPage(data);
    };

    if (id) fetchListingPage();
  }, [id]);

  if (!listingPage) {
    return <div>Loading...</div>;
  }

  const formatDate = (createTime: string) => {
    const date = new Date(createTime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <Link to="/">
        <ArrowButton />
      </Link>
      <ListingPageLayout>
        <ListingPageLayoutLeft>
          <IsRental left="40px" top="40px" fontSize="20px">
            {listingPage.is_rental ? "ქირავდება" : "იყიდება"}
          </IsRental>
          <ListingPageCover src={listingPage.image} alt={listingPage.image} />
          <PublicDate>
            გამოქვეყნების თარიღი {formatDate(listingPage.created_at)}
          </PublicDate>
        </ListingPageLayoutLeft>
        <ListingPageLayoutRight>
          <ListingPageLayoutLeftInfo>
            <ListingPrice fontSize="40px">
              {Intl.NumberFormat("ka-GE", {
                useGrouping: true,
              }).format(listingPage.price) + " ₾"}
            </ListingPrice>
            <DetailsFlex>
              <ListingAddress fontSize="24px">
                {listingPage.city.name + ", " + listingPage.address}
              </ListingAddress>
              <DownSectionInfos
                fontSize="24px"
                icon="./listingicons/Vector.svg"
              >
                ფართი {listingPage.area + " მ²"}
              </DownSectionInfos>
              <DownSectionInfos fontSize="24px" icon="./listingicons/bed.svg">
                საძინებელი {listingPage.bedrooms}
              </DownSectionInfos>
              <DownSectionInfos fontSize="24px" icon="./listingicons/post.svg">
                საფოსტო ინდექსი {listingPage.zip_code}
              </DownSectionInfos>
            </DetailsFlex>
          </ListingPageLayoutLeftInfo>
          <ListingDescription>{listingPage.description}</ListingDescription>
          <AgentCard
            avatar={listingPage.agent.avatar}
            name={listingPage.agent.name}
            surname={listingPage.agent.surname}
            email={listingPage.agent.email}
            phone={listingPage.agent.phone}
          />
        </ListingPageLayoutRight>
      </ListingPageLayout>
    </div>
  );
}
