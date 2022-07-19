import { AppShell, Navbar, Header, Aside, Footer } from '@mantine/core';
import { Text, Button } from '@mantine/core';
import { Link} from "react-router-dom";
import styles from './styles.module.css';



function BottomNavbar() {
    return(
    <>

    <AppShell
         footer={
            
            <Footer className={styles.FooterPosition} height={60} p="md">
            <Text> Temp Navbar</Text>
            <Link to="/history"> <Button> History</Button></Link>
            <Link to="/home"> <Button> Home</Button></Link>
            <Link to="/createactivity"> <Button> Create Activity</Button></Link>
            <Link to="/settings"> <Button> Settings</Button></Link>
            <Link to="/profile"> <Button> Profile</Button></Link>
            <Link to="/login"> <Button> Login</Button></Link>
            <Link to="/register"> <Button> Register</Button></Link>
            <Link to="/about"> <Button> About</Button></Link>
            <Link to="/help"> <Button> Help</Button></Link>
            <Link to="/display"> <Button> Display</Button></Link>
            <Link to="/review"> <Button> Review</Button></Link>
            <Link to="/reviewandsave"> <Button> Review n Save</Button></Link>
              
            </Footer>
          }  >
            
    </AppShell>
    </>

);

}

export default BottomNavbar; 