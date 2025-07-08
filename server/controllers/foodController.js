
const Food = require('../models/foodModel')
const fs = require('fs')

// add food item
const addFood = async(req,res) =>{
  let image_filename = `${req.file.filename}` ;

  const food = new Food({
    name : req.body.name,
    description: req.body.description,
    price : req.body.price,
    category : req.body.category,
    image : image_filename
  })
  try {
    await food.save();
    res.status(200).send({
        success:true,
        message:"Food Added"
    })
    
  } catch (error) {
     console.log(error)
     res.status(500).send({
        success:false,
        message:"Error in Food add API"
     })
  }
}

// all food list
const listFood = async(req,res) =>{
    try {
        const foods = await Food.find({});
        res.status(200).send({
            success:true,
            message:"Get all food",
           data:foods
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get Food API"
        })
        
    }
  
}

// remove food item 
const removeFood = async(req,res) =>{
    try {
        const food = await Food.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})

        await Food.findByIdAndDelete(req.body.id)
        res.status(200).send({
            success:true,
            message:"Food Removed Successfully"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in delete Food API"
        })
        
    }

}
module.exports = {addFood, listFood, removeFood}