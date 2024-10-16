import styled from "styled-components";
import ArrowButton from "../components/ArrowButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL, token } from "./Home";
import {
  DownSectionInfos,
  IsRental,
  ListingAddress,
  ListingPrice,
} from "../components/ListingCard";
import AgentCard from "../components/AgentCard";
import Slider from "../components/Slider";
import DeleteListingButton from "../components/modals/DeleteListingButton";
import DeleteListingModal from "../components/modals/DeleteListingModal";
import { PropertyTypes } from "../generalTypes.interface";

const ListingPageLayout = styled.section`
  display: flex;
  margin-top: 29px;
  gap: 68px;
  margin-bottom: 53px;
  @media screen and (max-width: 560px) {
    flex-direction: column;
  }
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
  @media screen and (max-width: 560px) {
    height: 50%;
    border-radius: 0;
  }
`;

const ListingPageLayoutRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 0 1 40%;
`;

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [listingPage, setListingPage] = useState<PropertyTypes>();

  const [filteredListing, setFilteredListing] = useState([]);

  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);

  useEffect(() => {
    const fetchListingPage = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching listing page:", error);
      }
    };

    fetchListingPage();
  }, [id]);

  useEffect(() => {
    if (!listingPage) return;

    const fetchListings = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        const filtered = data.filter(
          (property: PropertyTypes) =>
            property.city.region_id === listingPage.city.region_id
        );

        setFilteredListing(filtered);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [listingPage]);

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

  const handleListingDelete = async () => {
    try {
      const response = await fetch(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to delete the listing");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  return (
    <div>
      <Link to="/">
        <ArrowButton />
      </Link>
      <ListingPageLayout>
        <ListingPageLayoutLeft>
          <IsRental $left="40px" $top="40px" fontSize="20px">
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
                $icon="./listingicons/Vector.svg"
              >
                ფართი {listingPage.area + " მ²"}
              </DownSectionInfos>
              <DownSectionInfos fontSize="24px" $icon="./listingicons/bed.svg">
                საძინებელი {listingPage.bedrooms}
              </DownSectionInfos>
              <DownSectionInfos fontSize="24px" $icon="./listingicons/post.svg">
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
          <DeleteListingButton setDeleteClicked={setDeleteClicked} />
        </ListingPageLayoutRight>
      </ListingPageLayout>
      <Slider listing={filteredListing} />
      {deleteClicked && (
        <DeleteListingModal
          setDeleteClicked={setDeleteClicked}
          handleDelete={handleListingDelete}
        />
      )}
    </div>
  );
}
