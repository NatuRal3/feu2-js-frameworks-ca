//Title
//Description
//Reviews IF there are any else (No review's given yet)
//Discounted price if there is any. Calculate the discount (discountedPrice, Price DIFF)
    //Always use discountedPrice for showing price.


    import React, {useEffect, useState} from "react";
    import { useParams } from "react-router-dom";
    import { getItem } from "../services/apiEngine";

    type Review = {
        id: string;
        username: string;
        rating: number;
        description: string;
    }

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
    }


    function Product(){
        const { itemId } = useParams<{itemId:string}>();
        const [ item, setItem] = useState<Item|null>();

        useEffect(() => {
            async function fetchData (){
                if(itemId){
                    const data = await getItem(itemId) as Item
                    console.log(data.price)
                    setItem(data);
                }
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
