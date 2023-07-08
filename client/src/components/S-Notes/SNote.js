import React, { useEffect, useState } from 'react'

import Notecss from '../../styles/SNote.module.css'
import UserSidebar from '../UserSidebar/UserSidebar'
import UserHeder from '../UserHeader/UserHeder'
import { RiAddFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import axios from 'axios';

function SNote() {

    const workspaceId = useSelector((state)=>state.currentWorkspace)
    const user=useSelector((state)=>{return state.user.details})





    const [createBoxVisible, setCreateBoxVisible] = useState(false);
    const [userInput, setUserInput] = useState('');


    // feth previous note
 useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Make the API call to fetch notes using userId and workspaceId
        const response = await axios.get('/notes', {
            params: {
              userId:user._id,
              workspaceId,
            },
          });

          if(response.data.error){

          }else{

          }

        // Set the fetched notes in the state
        // setNotes(data.notes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    // Call the fetchNotes function to retrieve the notes
    fetchNotes();
  }, [workspaceId]);


    const randomColors = ['#c2ff3d', '#ff3de8', '#3dc2ff', '#04e022', '#bc83e6', '#ebb328'];
    let i = 0;
  
    const handleKeyDown = (e) => {
      if (e.keyCode === 13) {
        divStyle(userInput);
        setCreateBoxVisible(false);
      }
    };
  
    const handleCreateClick = () => {
      setCreateBoxVisible(true);
    };
  
    const handleInputChange = (e) => {
      setUserInput(e.target.value);
    };
  
    const handleNoteDoubleClick = (index) => {
      const updatedNotes = notes.filter((_, i) => i !== index);
      setNotes(updatedNotes);
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
        {/* {notes.map((note, index) => (
          <div
            className="note"
            key={index}
            style={{ background: note.color }}
            onDoubleClick={() => handleNoteDoubleClick(index)}
          >
            <div className="details">
              <h3>{note.text}</h3>
            </div>
          </div>
        ))} */}

      </div>
    </div>


    </div>
    </div>


      
    </div>

    </div>
  )
}

export default SNote
