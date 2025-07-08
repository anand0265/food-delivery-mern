const userModel = require('../models/UserModel')

// add item to user cart
const addtoCart = async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.status(200).send({
            success:true,
            message:"Added to Cart"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error"
        })
    }
   
}

// remove items from user cart
const removeFromCart = async (req,res) =>{
 try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId] -= 1;
    }
    if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId]; // ✅ Remove item if count reaches 0
    }
await userModel.findByIdAndUpdate(req.body.userId,{cartData});
res.status(200).send({
    success:true,
    message:"Removed from cart"
})
    
 } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error"
    })
 }
}

// fetch user cart data
const getCart = async(req,res) =>{
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.status(200).send({
        success:true,
        message:"get data successfully",
        cartData
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error"
    })
  }
}

module.exports ={addtoCart, removeFromCart, getCart}