const User = require("../models/userModel")

const getUser= async(req,res)=>{
    try{
          const {id} = req.params
          console.log(id,"idddddddd")
          const user = await User.findOne({_id: id})
          res.status(200).json({data:user})
    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = getUser