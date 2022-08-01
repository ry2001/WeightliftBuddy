import React from 'react';
import { Nav, NavItem} from 'reactstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faUserCircle, faGear, faClock, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { SimpleGrid,Text, Center, Stack} from '@mantine/core';
import { tab } from '@testing-library/user-event/dist/tab';


function Navigation() {
  const location = useLocation()

  const tabs = [{
    route: "/home",
    icon: faHome,
    label: "Home"
  },{

      route: "/history",
    icon: faClock,
    label: "History"
  },{


  route: "/createactivity",
    icon: faPlusCircle,
    label: "New"
  },{

    route: "/settings",
    icon: faGear,
    label: "Settings"
  },{
    route: "/profile",
    icon: faUserCircle,
    label: "Profile"
  }];

  const NavBar = () => {
    const noBar = ['/login', '/register','/'];
    if (noBar.includes(location.pathname)){
      return ;
    };

    const indicator = () =>{
      if (location.pathname === tab.route){
        console.log(location.pathname)
        console.log(tab.route)
        return "red";
      }
      return "blue";
    }

    return (
      <div>
      <nav class="navbar fixed-bottom bg-light" role="navigation">
          <Nav>
            <SimpleGrid cols={5}>
              {
                tabs.map((tab, index) =>(
                  <NavItem key={`tab-${index}`}>
                    <NavLink to={tab.route} className="nav-link" activeClassName="active">
                        <Stack
                        spacing="xs"
                        >
                          <Center>
                            <FontAwesomeIcon 
                            size="lg" 
                            icon={tab.icon}
                            color={indicator}
                            />
                          </Center>
                          <Center>
                            <Text>{tab.label}</Text>
                          </Center>
                        </Stack>
                    </NavLink>
                  </NavItem>
                ))
              }
            </SimpleGrid>
          </Nav>
        </nav>
      </div>
    )
  }

  return(
      <NavBar/>
    )
  };


export default Navigation;