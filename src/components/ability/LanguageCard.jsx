import React, { useRef } from 'react'
import styles from './LanguageCard.module.css';

export default function LanguageCard({ data, handleClick, idx }) {
  const { ability, url } = data;
  const circle = useRef(null);

  const handleMouseEnter = () => {
    const element = circle.current;
    if (element) {
      element.style.strokeDashoffset = 510 - (510 * ability) / 100;
    }
  }

  const handleMouseLeave = () => {
    const element = circle.current;
    if (element) {
      element.style.strokeDashoffset = 510;
    }
  }

  return (
    <li
      className={styles.languageCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleClick(idx)}
    >
      <img src={url} alt="" />
      <svg className={styles.svg}>
        <circle cx="70" cy="70" r="80"></circle>
        <circle cx="70" cy="70" r="80" ref={circle}></circle>
      </svg>
    </li>
  )
}
