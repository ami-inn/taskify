import React, { useEffect, useState } from 'react'

import Notecss from '../../styles/SNote.module.css'
import UserSidebar from '../UserSidebar/UserSidebar'
import UserHeder from '../UserHeader/UserHeder'
import { RiAddFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { async } from 'react-input-emoji';
import { Backdrop, CircularProgress } from '@mui/material';

function SNote() {

    const workspaceId = useSelector((state)=>state.currentWorkspace)
    const user=useSelector((state)=>{return state.user.details})





    const [createBoxVisible, setCreateBoxVisible] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [refresh,setRefresh]=useState(false)
    const [open,setOpen]=useState(false)


    console.log('inpit',userInput);


    // feth previous note
 useEffect(() => {
    const fetchNotes = async () => {
        setOpen(true)
      try {
        // Make the API call to fetch notes using userId and workspaceId
        const response = await axios.get('/notes', {
            params: {
              userId:user._id,
              workspaceId,
            },
          });

          if(response.data.error){
            setOpen(false)

          }else{

            setNotes(response.data.notes)
            setOpen(false)
          }

        // Set the fetched notes in the state
        // setNotes(data.notes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    // Call the fetchNotes function to retrieve the notes
    fetchNotes();
  }, [workspaceId,refresh]);


    const randomColors = ['#c2ff3d', '#ff3de8', '#3dc2ff', '#04e022', '#bc83e6', '#ebb328'];
    let i = 0;
  
    const handleKeyDown = async(e) => {
      if (e.keyCode === 13) {
        // divStyle(userInput);
        // setCreateBoxVisible(false);

        e.preventDefault()
        const text=userInput.trim()
        if(text){
            
            const note ={
                title:'',
                content:text,
                createdBy:user._id
            }
            setOpen(true)

            try{
                const response= await axios.post(`/notes/${workspaceId}`, note)

                if(response.data.error){
                    setOpen(false)
                    console.log(response.data);
                    // alert('errors'+response.data.message)
                }
                else{
                    setOpen(false)
                    setRefresh(!refresh)
                    divStyle(userInput);
                    setCreateBoxVisible(false);
                    setUserInput('')
                    // alert('success')
                }
            }
            catch(error){
                console.log('error');
            }
        }
      }
    };
  
    const handleCreateClick = () => {
      setCreateBoxVisible(true);
    };
  
    const handleInputChange = (e) => {
      setUserInput(e.target.value);
    };
  
    const handleNoteDoubleClick = async (noteId) => {
        console.log('noteId',noteId);
    //   const updatedNotes = notes.filter((_, i) => i !== index);
    //   setNotes(updatedNotes);
    setOpen(true)
    try{

        const response = await axios.delete(`/notes/${workspaceId}/${noteId}`)

        if(response.data.error){
            // alert('err')
            setOpen(false)
            console.log(response.data);
        }else{
            // alert('success')
            setOpen(false)
            setRefresh(!refresh)
        }

    }
    catch(err){
        console.log('error',err);
    }
    };
  
    const color = () => {
      if (i > randomColors.length - 1) {
        i = 0;
      }
      return randomColors[i++];
    };
  
    const divStyle = (text) => {
      const note = {
        text,
        color: color(),
      };
  
      setNotes((prevNotes) => [...prevNotes, note]);
    };
  
    const [notes, setNotes] = useState([]);





    const [sidebarShow, setsidebarShow] = useState(false);

    const handleButtonClick = () => {
      setsidebarShow(!sidebarShow);
    };


  return (
    <div className={`${sidebarShow?'sidebar-main':''}`}>

  
    <div className='wrapper'>

    <UserSidebar onsideViewClick={handleButtonClick} page={'notes'}/>
        <UserHeder onsideViewClick={handleButtonClick}/>

    <div className="content-page">
    <div className="container-fluid">

        {/* notes */}

        <div className="row">

 

     <div className={`${Notecss.containerNote}`}>
      <div className={`${Notecss.notes}`}>
        <div className={`${Notecss.create}`} id="create" onClick={handleCreateClick}>
         <i> <RiAddFill className="fa-sharp fa-regular fa-plus"/></i>
          {createBoxVisible && (
            <div className={`${Notecss.createBox}`} >
              <div className={`${Notecss.innerCreateBox}`}>
                <textarea
                  placeholder="Write Here ..."
                  id="userInput"
                  maxLength="160"
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                ></textarea>
              </div>
            </div>
          )}
        </div>
        {notes?.map((note, index) => (
          <div
            className={`${Notecss.note}`}
            key={index}
            style={{ background: color() }}
            onDoubleClick={() => handleNoteDoubleClick(note._id)}
          >
            <div className={`${Notecss.details}`}>
              <h3>{note.content}</h3>
            </div>
          </div>
        ))}

      </div>
    </div>


 
   
     </div>


      


    </div>
    </div>


      
    </div>

    <Backdrop
          sx={{ color: '#a7cafc',background:'none', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          
        >
          <CircularProgress color="inherit" />
        </Backdrop>

    </div>
  )
}

export default SNote
