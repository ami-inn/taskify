import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';



export default function ShowWorkspaces(props) {
  const { onClose, selectedValue, open ,workspaces} = props;
  const navigate = useNavigate()

  console.log(workspaces);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    navigate("/workspace/" + value);
    
  };
  
  console.log(open)

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select an workspace</DialogTitle>
      <List sx={{ pt: 0 }}>
        {workspaces.map((workspace) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick(workspace._id)} key={workspace._id}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={workspace.name} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => {handleClose()}}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Create New" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

