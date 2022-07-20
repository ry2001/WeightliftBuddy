import React from 'react';
import { Nav, NavItem} from 'reactstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faUserCircle, faGear, faClock, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

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
    const noBar = ['/', '/register'];
    if (noBar.includes(location.pathname)){
      return ;
    };
    return (
      <div>
      <nav class="navbar fixed-bottom bg-light" role="navigation">
          <Nav  >
            <div className=" d-flex flex-row justify-content-around w-100">
              {
                tabs.map((tab, index) =>(
                  <NavItem key={`tab-${index}`}>
                    <NavLink to={tab.route} className="nav-link" activeClassName="active">
                      <div className="row d-flex flex-column justify-content-center align-items-center">
                        <FontAwesomeIcon size="lg" icon={tab.icon}/>
                        <div>{tab.label}</div>
                      </div>
                    </NavLink>
                  </NavItem>
                ))
              }
            </div>
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