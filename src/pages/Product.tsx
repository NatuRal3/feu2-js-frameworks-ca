//Title
//Description
//Reviews IF there are any else (No review's given yet)
//Discounted price if there is any. Calculate the discount (discountedPrice, Price DIFF)
//Always use discountedPrice for showing price.

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
        <img src={item.imageUrl} />
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
        <div className="flex space-evenly">
          <Button onClick={() => addToCart(item)} variant="primary">
            Add to Cart
          </Button>
        </div>
        <div>{item.description}</div>
      </div>
      <h2>Reviews</h2>
      {getItemReviews()}
    </div>
  );
}

export default Product;
