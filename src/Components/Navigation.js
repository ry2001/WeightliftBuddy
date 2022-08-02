import React from 'react';
import { Nav, NavItem} from 'reactstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faUserCircle, faGear, faClock, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { SimpleGrid,Text, Center, Stack, Paper} from '@mantine/core';
import styles from './styles.module.css';

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
    const noBar = ['/login', '/register','/', '/reviewandsave', '/review', "/editreview", '/reviewdummy','/camera'];
    if (noBar.includes(location.pathname)){
      return ;
    };

    const navIcon = ({tab, index}) => {
      console.log(tab)
      if (location.pathname === tab.route){
        return   (
          <NavItem key={`tab-${index}`} className={styles.backgroundCheck}>
            <NavLink to={tab.route} className="nav-link" activeClassName="active">
            <Stack 
                spacing="xs">
              <Center>
              <FontAwesomeIcon 
              size="lg" 
              icon={tab.icon}
              color="white"
              />
              </Center>
              <Center>
              <Text
              color="white"
              >{tab.label}</Text>
              </Center>
            </Stack>
          </NavLink>
        </NavItem>
        )
      }
      return (
        <NavItem key={`tab-${index}`}>
        <NavLink to={tab.route} className="nav-link" activeClassName="active">
        <Stack 
            spacing="xs">
          <Center>
          <FontAwesomeIcon 
          size="lg" 
          icon={tab.icon}
          color="orange"
          />
          </Center>
          <Center>
          <Text
          color="orange"
          >{tab.label}</Text>
          </Center>
        </Stack>
      </NavLink>
    </NavItem>
      )
    }

    return (
      <div>
      <nav class="navbar fixed-bottom bg-light" role="navigation">
          <Nav>
            <SimpleGrid spacing = {1} cols={5}>
              {
                tabs.map((tab, index) =>(
                  <NavItem key={`tab-${index}`}>
                    <NavLink to={tab.route} className="nav-link" activeClassName="active">
                      {navIcon({tab, index})}
                        
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