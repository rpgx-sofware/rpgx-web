import { Link } from "react-router-dom";
import styles from './NavBar.module.scss'

const NavBar = (props) => {

    let links = []
    let linksRight = []
    for (let link in props.links) {
        links.push(<li><Link key={link} to={props.links[link].dest}>{props.links[link].text}</Link></li>)
    }

    for (let link in props.linksRight) {
        linksRight.push(<li><Link key={link} to={props.linksRight[link].dest}>{props.linksRight[link].text}</Link></li>)
    }

    return(
        <nav>
           <h1 className={styles.title}>{props.title}</h1>
           <ul className={`${styles.links}`}>
            {links}
           </ul>
           <ul className={`${styles.links} ${styles.linksRight}`}>
            {linksRight}
           </ul>
        </nav>
    )
}

export default NavBar;