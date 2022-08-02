import { Header } from '@mantine/core';
import { Center, Title, Grid, Text} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from "react-router-dom"
import styles from './styles.module.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'reactstrap';

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
      "/reviewdummy": "Review",
      "/homedummy" : "Home",
  };

  ///reduce font size of new activity, review and save
   const title=routeMap[location.pathname]

    //put the paths where you need these buttons here
    const backArrow = ['/register', '/reviewdummy','/review', '/display', '/help', '/about']
    const editButton = ['/reviewdummy']
    const deleteButton = ['/reviewandsave', '/editreview']

    const SpecialButtons = () => {
      if (editButton.includes(location.pathname)) {
        let handleClick = () => {};
        if (location.pathname==='/reviewdummy'){
          ///NAVIGATION TO EDIT IS HEREEEEEEEEEE
          handleClick = () => navigate('/editreview');
        }
        return(
          <Center>
            <FontAwesomeIcon  
              size="lg" 
              icon={faPen}
              style={{marginTop: 10}}
              onClick={handleClick}
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
              onClick={() => navigate('/home')}
            />
          </Center>
        )
      }
    };

    const BackButton = () => {
      if (backArrow.includes(location.pathname)) {
        if (location.pathname === '/review'){
          return(                             
            < ArrowBackIcon 
            onClick={() => navigate('/homedummy')} 
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
        
        <Grid.Col span={7}>
          <Container>
          <Center>
          <Title>
            {title}
          </Title>
          </Center>
          </Container>
        </Grid.Col>
        

        
        <Grid.Col span={1}>
          <SpecialButtons/>
        </Grid.Col>
      </Grid>

    </Header>
    

);

}

export default TopHeader; 