import userModel from "../models/UserModel.js";


export async function getUsers(req,res){
    try{

        console.log('dkdkjkj');
      
        const {page,pageSize,name}=req.query;
        const pageNumber = parseInt(page)
        const pageSizeNumbner=parseInt(pageSize)


        const totalUsers = await userModel.countDocuments()
        const totalPages=Math.ceil(totalUsers / pageSizeNumbner)


        let users = await userModel.find({name:new RegExp(name,'i')}).skip((pageNumber-1)*pageSizeNumbner).limit(pageSizeNumbner).lean()
     
        res.json({err:false,users,totalPages,totalUsers})
    }
    catch(err){
        res.json({message:'something went wrong',err:err,err:true})
    }
}

export async function blockUser(req,res){
    try{
        await userModel.findByIdAndUpdate(req.body.id,{$set:{block:true}}).lean()
        res.json({err:false})

    }

    catch(err){
        res.json({message:'something went wrong',err:err,err:true})
    }
}
export async function unblockUser(req,res){
    try{
        await userModel.findByIdAndUpdate(req.body.id,{$set:{block:false}}).lean()
        res.json({err:false})

    }

    catch(err){
        res.json({message:'something went wrong',err:err,err:true})
    }
}