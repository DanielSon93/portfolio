import styles from './Popup.module.css';
import { IoMdClose } from "react-icons/io";

export default function Popup({ resultData, handleClick }) {
  return (
    <div className={styles.modal}>
      <div className={styles.close}>
        <IoMdClose className={styles.closeBtn} onClick={() => handleClick(null)} />
      </div>
      <div className={styles.title}>
        <h1>{resultData[1]['fullNameKor']}</h1>
      </div>
    </div>
  )
}
