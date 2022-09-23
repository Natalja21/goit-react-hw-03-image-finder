import styles from './Loader.module.css';
import { CirclesWithBar } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className={styles.backdrop}>
    <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel="circles-with-bar-loading"
      />
      </div>
  )
}