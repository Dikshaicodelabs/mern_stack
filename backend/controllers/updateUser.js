const User = require("../models/userModel")

const updateUser = async(req,res)=>{

    try{

        const {id} = req.params
        console.log(req.body,'>>')
        const data = req.body
        // const user = await User.findByIdAndUpdate(id,{data})

        const user = await User.findByIdAndUpdate(id,req.body)
        // console.log('user', user)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        return res.status(200).json({message:"updated Successfully"})

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }

}



module.exports= updateUser