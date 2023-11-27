import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styles from './Main.module.css';
import { v4 as uuid4 } from 'uuid';
import { TiPlus } from "react-icons/ti";
import { ObserveContext } from '../../context/ObserveContext';
import BackGroundLine from '../background/BackGroundLine';

export default function Main({ isLoad }) {
  const [animate, setAnimate] = useState(true);
  const dom = useRef(null);
  const { iPosition } = useContext(ObserveContext);
  const title = ['SWITCH', 'FROM', 'BACK', 'TO', 'FRON'];
  const subTitle = ' WEB DEVELOPER / FRONTEND DEVELOPER ';

  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  const lines = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: uuid4(),
      timeout: (i + 1) * 1000 / 3,
    }))
  }, []);

  useEffect(() => {
    if (dom.current) {
      dom.current.style.width = `${iPosition}px`;
    }
  }, [iPosition]);

  return (
    <>
      <div className={styles.lineWrap}>
        {
          lines.map(({ id, timeout }) =>
            <BackGroundLine key={id} isLoad={isLoad[1]} timeout={timeout} />
          )
        }
      </div>
      <main className={`${styles.main} ${isLoad[0] ? styles.active : ''}`}>
        <h1 className={styles.title}>
          <div>
            <strong>
              {title[0].split('').map(e => <span key={uuid4()}>{e}</span>)}
              <span className={styles.dash} ref={dom}></span>
              {title[1].split('').map(e => <span key={uuid4()}>{e}</span>)}
            </strong>
          </div>
          <div>
            <strong>
              {title[2].split('').map(e => <span key={uuid4()}>{e}</span>)}
              &nbsp;
              {title[3].split('').map(e => <span key={uuid4()}>{e}</span>)}
              &nbsp;
              {title[4].split('').map(e => <span key={uuid4()}>{e}</span>)}
              <span
                className={`${styles.arrow} ${isLoad[0] ? styles.active : ''}`}
                onClick={handleClick}
              >T</span>
            </strong>
          </div>
        </h1>
        <div className={styles.reason} onMouseEnter={() => setAnimate(false)} onMouseLeave={() => setAnimate(true)}>
          <div className={`${styles.original} ${animate ? styles.active : ''}`}>
            {
              Array.from({ length: 7 }, () => <p key={uuid4()}>
                {subTitle}
                <TiPlus className={styles.plus} />
              </p>)
            }
          </div>
          <div className={`${styles.clone} ${animate ? styles.active : ''}`}>
            {
              Array.from({ length: 7 }, () => <p key={uuid4()}>
                {subTitle}
                <TiPlus className={styles.plus} />
              </p>)
            }
          </div>
        </div>
      </main>
    </>
  )
}
