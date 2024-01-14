import React, { useEffect, useState } from "react";
import { listItems } from "../services/apiEngine";
import ItemCards from "../components/ItemCards";

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const itemsList = await listItems();
        setItems(itemsList);
        console.log(itemsList);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex column items-center home-cont">
      <h1>PRODUCTS</h1>
      <ItemCards items={items} />
    </div>
  );
}

export default Home;
