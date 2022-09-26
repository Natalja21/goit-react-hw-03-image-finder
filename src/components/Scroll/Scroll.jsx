import { BsFillCaretUpFill } from "react-icons/bs";
import styles from './Scroll.module.css'

const Scroll = ({onToTop}) => {
    return (
        <BsFillCaretUpFill className={styles.btn__top} onClick={() => onToTop() } />
    )
}
export default  Scroll