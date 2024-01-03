//Title
//Description
//Reviews IF there are any else (No review's given yet)
//Discounted price if there is any. Calculate the discount (discountedPrice, Price DIFF)
    //Always use discountedPrice for showing price.


    import React, {useEffect, useState} from "react";
    import { useParams } from "react-router-dom";
    import { getItem } from "../services/apiEngine.tsx";

    function Product(){
        const { itemId } = useParams();
        const { item, setItem} = useState(null);

        useEffect(() => {
            async function fetchData (){
                const data = await getItem(itemId)
                setItem(data);
            }
            fetchData();
        },[itemId]);
       
        if(!item){
            return <div>Collecting your item....</div>
        }

    
        console.log("Home Products")
        return(
            <div>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <p>{item.discountedPrice}</p>
                <p>Reviews</p>

            </div>
        )
    }
    
    export default Product;
