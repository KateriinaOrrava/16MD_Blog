
import styles from "./Home.module.css"
import about from "./img/about.png"
import add from "./img/add.png"

import posts from "./img/posts.png"
import {Link} from "react-router-dom";

const Home = () => {
    return <>
    <h1>Lorem Ipsum</h1>

    <div className={styles.container}>
        <ul>
            <li><Link to="/add"><img src={add} alt="" className={styles.linkImage} /></Link></li>
            <li><Link to="/about"><img src={about} alt="" className={styles.linkImage} /></Link></li>
            <li><Link to="/posts"><img src={posts} className={styles.linkImage} alt="" /></Link></li>
        </ul>
    </div>
    <h3>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</h3>
    <p>"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
    </p>
    </>
}
export default Home