import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RiDeleteBinFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux'

function NewProject(props) {

    console.log(props);

    const [members,setMembers]=useState([])
    const [name,setName]=useState('')
    const [category,setCategory]=useState('')
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [dueDate,setDueDate]=useState('')
    const [priotity,setpriority]=useState('')
    const [displaySelectedMembers, setDisplaySelectedMembers] = useState([]);
    const dispatch = useDispatch()

    

    const {modalview}=props
    console.log(props);
    const workspaceId = useSelector((state)=>state.currentWorkspace)
    const user=useSelector((state)=>{
    
        return state.user.details
    
    })
    // const currentWorkspace = useSelector((state) => state.workspaces[workspaceId]);
    const handleCancel = ()=>{
        console.log('hereee');
        props.setModalview(false)
      }

      const handleDeleteMember = (index) => {
        const updatedSelectedMembers = [...selectedMembers];
        updatedSelectedMembers.splice(index, 1);
        setSelectedMembers(updatedSelectedMembers);
      };


      useEffect(()=>{
        fetchMembers()
        
      },[])
      useEffect(() => {
        displaySelectedMembersNames();
      }, [selectedMembers]);

      const fetchMembers= async ()=>{
        try{
            const {data}=await axios.get(`/workspace-details/${workspaceId}`)

            if(data.error){
                console.log('error');
                console.log(data);
            }else{
                console.log('set members');
                setMembers(data.workspace.members)
            }
        }
        catch(err){
            console.log(err)
        }
      }

      const handleMemberSelect = (e) => {
        const selectedMemberIds = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedMembers((prevSelectedMembers) => [...prevSelectedMembers, ...selectedMemberIds]);
      };

      const displaySelectedMembersNames = () => {
        const selectedMembersNames = members.filter((member) => selectedMembers.includes(member._id));
        setDisplaySelectedMembers(selectedMembersNames);
      };

      const handleSubmitProject=async (e) =>{
        e.preventDefault()
        console.log(selectedMembers,'selected membes');
        try{
          const response = await axios.post('/create-project',{
            name,
            category,
            members:selectedMembers,
            dueDate,
            creator:user._id,
            workspace:workspaceId,
            priotity
          })

          if(response.data.error){
            console.log('error',response.data)
            alert('error')
          }else{
            console.log('success');
            alert('success')
            dispatch({type:'refresh'})
          }

        

        }
        catch(error){
            console.log(error)
        }
      }
    

  return (
<div className={`modal fade ${modalview===true?'show':''}`} role="dialog" aria-modal="true" style={{display:'block', paddingRight:'4px' }}  id="new-project-modal">
  <div className="modal-dialog  modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header d-block text-center pb-3 border-bttom">
        <h3 className="modal-title" id="exampleModalCenterTitle01">New Project</h3>
      </div>
      <form onSubmit={handleSubmitProject}>
      <div className="modal-body">
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group mb-3">
              <label htmlFor="exampleInputText01" className="h5">Project Name*</label>
              <input type="text" className="form-control" id="name" placeholder="Project Name" value={name} onChange={(e)=>{setName(e.target.value)}} />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group mb-3">
              <label htmlFor="exampleInputText2" className="h5">Categories *</label>
              <select name="type" className="selectpicker form-control" data-style="py-0" id='category' value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                <option>Category</option>
                <option>Android</option>
                <option>IOS</option>
                <option>Ui/Ux Design</option>
                <option>Development</option>
              </select>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group mb-3">
              <label htmlFor="exampleInputText004" className="h5">Due Dates*</label>
              <input type="date" className="form-control" id="dueDate" value={dueDate} onChange={(e)=>{setDueDate(e.target.value)}} defaultValue />
            </div>                        
          </div>
          <div className="col-lg-6">
            <div className="form-group mb-3">
              <label htmlFor="exampleInputText2" className="h5">Members *</label>
              <select name="type" className="selectpicker form-control"  data-style="py-0" id='members'  value={selectedMembers} onChange={handleMemberSelect}>
              <option>members</option>
               
                {
                    members.map((member)=>(
                        <option value={member._id} key={member._id}>{member.name}</option>
                    ))
                }
              
              
              </select>
            </div>
          </div>
          <div>
        
        <ul className='skillsBox'>
          {displaySelectedMembers.map((member,index) => (
            <li className='skillsLisk' key={index}><span className='skill-text'>{member.name} </span> <span className='skillIcon' onClick={() => handleDeleteMember(index)}><RiDeleteBinFill  className='skilldeleteIcon'/></span></li>
          ))}
        </ul>
      </div>
          <div className="col-lg-6">
            <div className="form-group mb-3">
              <label htmlFor="exampleInputText2" className="h5">priotity</label>
              <select name="type" className="selectpicker form-control" data-style="py-0" value={priotity} onChange={(e)=>{setpriority(e.target.value)}} >
                <option>priotity</option>
                <option value={'low'}>Low</option>
                <option value={'high'}>High</option>
                <option value={'medium'}>Medium</option>
            
              </select>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="d-flex flex-wrap align-items-ceter justify-content-center mt-2">
              <div className="btn btn-primary mr-3" data-dismiss="modal" onClick={handleSubmitProject}>Save</div>
              <div className="btn btn-primary" onClick={handleCancel} data-dismiss="modal">Cancel</div>
            </div>
          </div>
        </div>
      </div>
      </form>

    </div>
  </div>
</div>

  )
}

export default NewProject
