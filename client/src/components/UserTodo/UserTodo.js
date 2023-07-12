import React, { useState } from 'react'
import UserSidebar from '../UserSidebar/UserSidebar';
import UserHeder from '../UserHeader/UserHeder';
// import errorImg from '../../assets/images/error/maintain.png'
import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './cmpnts/Column';
// import DarkModeIconButton from './components/DarkModeIconButton';

// import theme from './config/theme';
import { ChakraProvider } from '@chakra-ui/react';


function UserTodo() {

    const [sidebarShow, setsidebarShow] = useState(false);

    const handleButtonClick = () => {
      setsidebarShow(!sidebarShow);
    };

  return (
    <div className={`${sidebarShow?'sidebar-main':''}`}>
    <div className='wrapper'>

        <UserSidebar onsideViewClick={handleButtonClick} page={'todo'}/>
        <UserHeder onsideViewClick={handleButtonClick}/>

        <div className="content-page">
    <div className="container-fluid">

    <ChakraProvider >
    <main>
      <Heading
        fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
        fontWeight="bold"
        textAlign="center"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        mt={4}
      >
        Welcome to Taskify Kanban
      </Heading>
      {/* <DarkModeIconButton position="absolute" top={0} right={2} /> */}
      <DndProvider backend={HTML5Backend}>
        <Container maxWidth="container.lg" px={4} py={10}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 16, md: 4 }}>
            <Column column='Todo' />
            <Column column='In Progress' />
            <Column column='Blocked' />
            <Column column='Completed' />
          </SimpleGrid>
        </Container>
      </DndProvider>
    </main>
    </ChakraProvider>

   

    </div>
            
    </div>

        </div>
        </div>
  )
}

export default UserTodo
