import styles from './Button.module.css'

const Btn = ({ type, text, onLoading }) => (<div className={styles.box}><button className={styles.button} type={type} onClick={() => onLoading()}>{text}</button></div>);


export default Btn