import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "https://food-delivery-mern-88kc.onrender.com/" ;
    const [token,setToken] = useState("");
    const [food_list, setFoodList] = useState([])

    const addToCart = async(itemId) =>{
         if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
         }
         else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
         }
         // add to cart in database
         if (token) {
            await axios.post(url+"/api/cart/add", { itemId }, 
                { headers: { Authorization: `Bearer ${token}` } }  
            );
        }
        
    }
         // remove to cart in database
    const removeFromCart = async(itemId) =>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
    if (token) {
        await axios.post(url+"/api/cart/remove",{ itemId }, 
            { headers: { Authorization: `Bearer ${token}` } } 
        );
    }
    
    }

    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0){
                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
          
        }
        return totalAmount
    }

    // food list show backen to frontend 
    const fetchFoodList = async() =>{
      const response =await axios.get(url+"/api/food/list")
      setFoodList(response.data.data)
    }

    const loadCartData = async(token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{ headers: { Authorization: `Bearer ${token}` } })
        setCartItems(response.data.cartData);
    }

    // if login then  reload webpage but not logout
    useEffect(()=>{
         async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
             }
         }
         loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
