// List all products
//Look ahead search filter
    // Click on product in search to go to it

// import React from "react";
// import { listAllItems } from "../services/apiEngine.tsx";

// function Home(){
   

//     console.log(listAllItems)
//     return(
//         <div>HOME</div>
//     )
// }

// export default Home;

import React, { useEffect, useState } from "react";
import { listItems } from "../services/apiEngine.tsx";

function Home() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const itemsList = await listItems();
                setItems(itemsList); // Update state with fetched items
                console.log(itemsList); // Log the items
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>HOME</div>
    );
}

export default Home;
