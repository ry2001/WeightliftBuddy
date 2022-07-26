import { AppShell, Navbar, Header, Aside, Footer } from '@mantine/core';
import { Text, Button, Center, Title, ActionIcon,Container, Grid} from '@mantine/core';
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate, useLocation} from "react-router-dom"
import styles from './styles.module.css';
import {faTrash } from '@fortawesome/free-solid-svg-icons';

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
      "/editreview": "Edit",
      "/reviewdummy": "Review"
  };
   const title=routeMap[location.pathname]

    //put the paths where you need these buttons here
    const backArrow = ['/register', '/review', '/reviewdummy']
    const editButton=['/review', '/reviewdummy']
    const deleteButton=['/home']

    const SpecialButtons = () => {
      if (editButton.includes(location.pathname)) {
        return(
          <Center>
            <FontAwesomeIcon  
              size="lg" 
              icon={faPen}
              style={{marginTop: 10}}
            />
          </Center>
        )};
      
      if (deleteButton.includes(location.pathname)){
        return(
          <Center>
            <FontAwesomeIcon  
              size="lg" 
              icon={faTrash}
              style={{marginTop: 10}}
            />
          </Center>
        )
      }


    };

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
    <Header className={styles.TopHeader} >
      <Grid
      justify='space-around'
      align='center'
      >
        <Grid.Col span={1}>
          <Center>
            <BackButton/>
          </Center>
        </Grid.Col>
        
        <Grid.Col span={4}>
          <Center>
          <Title>
            {title}
          </Title>
          </Center>
        </Grid.Col>

        
        <Grid.Col span={1}>
          <SpecialButtons/>
        </Grid.Col>
      </Grid>

    </Header>
    
    </div>

);

}

export default TopHeader; 