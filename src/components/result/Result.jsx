import { useEffect, useState } from 'react';
import styles from './Result.module.css';
import axios from 'axios';
import { v4 as uuid4 } from 'uuid';
import Popup from './Popup';

export default function Result() {
  const [resultData, setResultData] = useState();
  const [clickIdx, setClickIdx] = useState(null);

  const handleClick = (idx) => {
    setClickIdx(idx);
    if (idx === null) {
      document.body.classList.remove('popupActive');
    } else {
      document.body.classList.add('popupActive');
    }
  }

  useEffect(() => {
    axios.get('/data/project.json')
      .then(res => setResultData(res.data));
  }, []);

  return (
    <ul className={styles.results}>
      {
        resultData && Object.entries(resultData).map((e, i) =>
          <li
            key={uuid4()}
            className={`${styles.result} ${clickIdx !== null ? styles.active : ''}`}
            onClick={() => handleClick(i)}>
            <h1 className={styles.title}>{e[0]}</h1>
            <ul className={styles.titleInfo}>
              <li>{e[1]['fullName']}</li>
              <li>{e[1]['development']}</li>
              <li>{e[1]['period']}</li>
            </ul>
          </li>
        )
      }
      {
        clickIdx !== null && <Popup resultData={Object.entries(resultData)[clickIdx]} handleClick={handleClick} />
      }
    </ul>
  )
}