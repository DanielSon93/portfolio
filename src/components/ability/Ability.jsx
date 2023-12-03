import { useEffect, useState } from 'react';
import styles from './Ability.module.css';
import LanguageCard from './LanguageCard';
import axios from 'axios';
import { v4 as uuid4 } from 'uuid';

export default function Ability() {
  const [abilityData, setAbilityData] = useState([]);
  const [isClicked, setIsClicked] = useState(Array.from({ length: 8 }, e => false));

  const handleClick = (idx) => {
    setIsClicked(prev => prev.map((e, i) => idx === i ? true : false));
  }

  useEffect(() => {
    axios.get('/data/ability.json')
      .then(res => setAbilityData(res.data));
  }, [])

  return (
    <div className={styles.abilityAndStudy}>
      <ul className={styles.ability}>
        {
          abilityData.map((e, i) => <LanguageCard key={uuid4()} data={e} handleClick={handleClick} idx={i} />)
        }
      </ul>
      <div className={styles.study}>
        <div className={styles.detail}>
          <h1>How To Study & Ability</h1>
          {
            abilityData.map((e, i) =>
              <div key={uuid4()} className={`${styles.content} ${isClicked[i] ? styles.active : ''}`}>
                {
                  e["howToStudy"].split('\n').map(e => <p key={uuid4()}>{e}<br></br></p>)
                }
              </div>
            )
          }
        </div>
      </div>
      <div className={styles.abilityBgWrap}>
        <div className={styles.abilityOrigin}>STUDY & ABILITY</div>
        {
          Array.from({ length: 5 }, () => <div key={uuid4()} className={styles.abilityClone}>
            STUDY & ABILITY&nbsp;&nbsp;&nbsp;
          </div>)
        }
      </div>
    </div >
  )
}
