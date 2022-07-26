import { AppShell, Navbar, Header, Aside, Footer } from '@mantine/core';
import { Text, Button, Center, Title, ActionIcon,Container, Grid} from '@mantine/core';
import { Link} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate, useLocation} from "react-router-dom"
import styles from './styles.module.css';

function TopHeader() {
    const navigate = useNavigate()
    const location = useLocation()
    
    const routeMap = {
      "/home": "Home",
      "/profile": "Profile",
      "/history": "History",
      "/settings": "Settings",
      "/createactivity": "New Activity",
      "/register": "Register",
      "/about": "About",
      "/display": "Display",
      "/help": "Help",
      "/review": "Review",
      "/reviewandsave": "Review and Save",
      "/editreview": "Edit"
  };
   const title=routeMap[location.pathname]


    const backArrow = ['/register', '/review', '/reviewdummy']

    const BackButton = () => {
      if (backArrow.includes(location.pathname)) {
        if (title=='/review'){
          return(                             
            < ArrowBackIcon 
            onClick={() => navigate('/home')} 
            size='lg'
            style={{marginTop: 10}} 
            /> 
          );
        };
          return( 
              < ArrowBackIcon 
              onClick={() => navigate(-1)} 
              size='lg'
              style={{marginTop: 10}} 
              /> 
           );
      };
      return;
    };

    return(
    <div>
    <Header fixed position={{ top: 0, left: 0, right:0}} 
                    className={styles.TopHeader} >
      <Grid justify="space-around">

        <Grid.Col span={1}>
          <Center>
            <BackButton/>
          </Center>
        </Grid.Col>

        <Grid.Col span={4}>
          <Title
          style={{marginLeft: 5}}
          >
            {title}
          </Title>
        </Grid.Col>

        <Grid.Col span={1}/>
      
      </Grid> 
    </Header>
    </div>

);

}

export default TopHeader; 