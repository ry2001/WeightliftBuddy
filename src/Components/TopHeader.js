import { AppShell, Navbar, Header, Aside, Footer } from '@mantine/core';
import { Text, Button, Center, Title} from '@mantine/core';
import { Link} from "react-router-dom";
import styles from './styles.module.css';
import StickyBox from "react-sticky-box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faUserCircle, faGear, faClock, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

function TopHeader(props) {
    const {header} =props
    return(
    <>
    <AppShell
    header={<Header fixed position={{ top: 0, left: 0, right:0}} className={styles.TopHeader} > <Center><Title>{header}</Title></Center> </Header>}>


      </AppShell>

    
    </>

);

}

export default TopHeader; 