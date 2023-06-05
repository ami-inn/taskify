import userModel from "../models/UserModel.js";
import workspaceModel from "../models/WorkspaceModel.js";


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

export async function workspaces(req,res){
    try {
        const {search}=req.query

        const filter={}

        if(search){
            filter.name= { $regex: new RegExp(search, 'i') };
        }
        console.log('enterr');
      const workspaces = await workspaceModel.find(filter).populate('owner');
      console.log('jehrj');
        console.log(workspaces);
      res.json({error:false, workspaces});
    } catch (error) {
      res.json({error:true, message: 'Server error' });
    }
}

export async function editWorkspaces(req,res){
    try{
        console.log('herrererere');
        const {id}=req.params;
        const {active}=req.body

        const workspace = await workspaceModel.findByIdAndUpdate(id,{active},{new:true})

        if(!workspace){
            return res.json({error:true,message:"workspace not found"})
        }

        res.json({error:false,message:'workspace updated'})

    }
    catch(err){
        console.log(err)
    }
}