import styles from './ContactCard.module.css';
import { v4 as uuid4 } from 'uuid';

export default function ContactCard({ isIntersect }) {

  return (
    <div className={`${styles.contactCard} ${isIntersect ? styles.active : ''}`}>
      <img src="/img/myImg.png" alt="" className={styles.img} />
      <div className={styles.midLine}></div>
      <ul className={styles.info}>
        {
          Object.entries(myInfo).map(e => <li key={uuid4()}>
            {e[0]} : {e[1]}
          </li>)
        }
      </ul>
    </div>
  )
}

const myInfo = {
  "name": "손 다니엘",
  "phone number": "010-9038-9307",
  "e-mail": "ths_eksldpf@naver.com",
  "address": "서울특별시 중랑구",
}