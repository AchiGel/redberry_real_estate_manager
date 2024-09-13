import styled from "styled-components";
import ArrowButton from "../components/ArrowButton";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PropertyTypes, token } from "./Home";

const ListingPageLayout = styled.section`
  display: flex;
  margin-top: 29px;
`;

const ListingPageLayoutLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListingPageLayoutRight = styled.div`
  display: flex;
  flex-direction: column;
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
          <img src={listingPage.image} />
          <p>გამოქვეყნების თარიღი {formatDate(listingPage.created_at)}</p>
        </ListingPageLayoutLeft>
        <ListingPageLayoutRight>
          <h2>{listingPage.price}</h2>
          <h3>{listingPage.city.name + ", " + listingPage.address}</h3>
          <h3>ფართი {listingPage.area}</h3>
          <h3>საძინებელი {listingPage.bedrooms}</h3>
          <h3>საფოსტო ინდექსი {listingPage.zip_code}</h3>
          <p>{listingPage.description}</p>
        </ListingPageLayoutRight>
      </ListingPageLayout>
    </div>
  );
}
