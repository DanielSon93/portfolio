import React, { useEffect, useRef, useState } from 'react'
import styles from './Introduction.module.css';
import axios from 'axios';

export default function Introduction() {
  const [isTitleActive, setIsTitleActive] = useState([]);
  const [isSelected, setIsSelected] = useState([true, false]);
  const dom = useRef(null);

  useEffect(() => {
    axios.get('/data/introduction.json')
      .then(res => setIsTitleActive(res.data.introduction));

    const handleScroll = () => {
      if (dom.current) {
        const height = dom.current.offsetHeight;
        height - (height / 4) < window.scrollY ? setIsSelected([false, true]) : setIsSelected([true, false]);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return (
    <div className={styles.intro} ref={dom}>
      <div className={styles.sticky}>
        <h1 className={styles.title}>My Introduction</h1>
        <div className={styles.content}>
          <div className={styles.subTitle}>
            {
              isTitleActive && isTitleActive.map((e, i) =>
                <div key={i}>
                  <span className={`${styles.subTitleItem} ${isSelected[i] ? styles.active : ''}`}>{e["title"]}</span>
                </div>
              )
            }
          </div>
          <div className={styles.explanation}>
            {
              isTitleActive && isTitleActive.map((e1, i1) => {
                return <div key={i1} className={`${styles.outer} ${isSelected[i1] ? styles.active : ''}`}>
                  {
                    e1["detail"].map((e2, i2) => {
                      return <div key={i2} className={styles.inner}>
                        <h1>{e2["subTitle"]}</h1>
                        {
                          e2["explanation"].split('\n').map((e3, i3) => {
                            return <span key={i3} className={styles.explanationText}>
                              {e3}<br></br>
                            </span>
                          })
                        }
                      </div>
                    })
                  }
                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
