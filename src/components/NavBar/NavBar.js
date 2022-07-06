import { Link } from "react-router-dom";
import styles from './NavBar.module.scss'

const NavBar = (props) => {

    let links = []
    let linksRight = []
    for (let link in props.links) {
        links.push(<li key={link}><Link to={props.links[link].dest}>{props.links[link].text}</Link></li>)
    }

    for (let link in props.linksRight) {
        linksRight.push(<li key={link}><Link to={props.linksRight[link].dest} onClick={props.linksRight[link].action}>{props.linksRight[link].text}</Link></li>)
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