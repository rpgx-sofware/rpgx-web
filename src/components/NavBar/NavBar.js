import { Link } from "react-router-dom";
import styles from './NavBar.module.scss'

const NavBar = (props) => {


    let links = []
    for (let link in props.links) {
        console.log(links);
        links.push(<Link key={link} to={props.links[link].dest}>{props.links[link].text}</Link>)
    }

    return(
        <nav>
           <h1 className={styles.title}>{props.title}</h1>
           {links}
        </nav>
    )
}

export default NavBar;