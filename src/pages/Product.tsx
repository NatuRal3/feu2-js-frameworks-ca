import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItem } from "../services/apiEngine";
import campaignPriceCalculator from "../tools/campaignPriceCalculator";
import Button from "react-bootstrap/Button";
import { addToCart } from "../tools/cartHandler";

type Review = {
  id: string;
  username: string;
  rating: number;
  description: string;
};

type Item = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  imageUrl: string;
  rating: number;
  tags: string[];
  reviews: Review[];
};

function Product() {
  const { itemId } = useParams<{ itemId: string }>();
  const [item, setItem] = useState<Item | null>();

  useEffect(() => {
    async function fetchData() {
      if (itemId) {
        const data = (await getItem(itemId)) as Item;
        setItem(data);
      }
    }
    fetchData();
  }, [itemId]);

  if (!item) {
    return <div>Collecting your item....</div>;
  }

  const getItemReviews = () => {
    if (item.reviews && item.reviews.length > 0) {
      return item.reviews.map((review) => (
        <div key={review.id}>
          <div>User: {review.username}</div>
          <div>Rating: {review.rating}</div>
          <div>Description: {review.description}</div>
        </div>
      ));
    } else {
      return <div>No reviews given yet.</div>;
    }
  };

  return (
    <div>
      <div>
        <img src={item.imageUrl} alt={item.title} />
      </div>
      <h1>{item.title}</h1>
      <div>
        {item.discountedPrice < item.price ? (
          <div className="flex coloumn space-evenly">
            <div className="price-old">Kr {item.price}</div>{" "}
            <div className="flex coloumn">
              <div className="price-discount">Kr {item.discountedPrice}</div>
              <div>{campaignPriceCalculator(item.price, item.discountedPrice)}</div>
            </div>
          </div>
        ) : (
          <div>{item.discountedPrice}</div>
        )}
        <div>{item.description}</div>
        <div className="flex space-evenly">
          <Button onClick={() => addToCart(item)} variant="primary">
            Add to Cart
          </Button>
        </div>
      </div>
      <h2>Reviews</h2>
      <div className="rev-con">{getItemReviews()}</div>
    </div>
  );
}

export default Product;
