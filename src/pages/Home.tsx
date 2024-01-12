// List all products
// Look ahead search filter
// Click on product in search to go to it
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
    <div>
      <div>HOME</div>
      <ItemCards items={items} />
    </div>
  );
}

export default Home;
