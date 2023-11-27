import React, { useContext, useState } from 'react';
import styles from './Header.module.css';
import { v4 as uuid4 } from 'uuid';
import { ObserveContext } from '../../context/ObserveContext';
import { RiContactsFill, RiContactsLine } from 'react-icons/ri';
import { CgDarkMode } from "react-icons/cg";
import { DarkModeContext } from '../../context/DarkModeContext';

export default function Header({ isResult }) {
  const { isDarkMode, handleDarkMode } = useContext(DarkModeContext);
  const [contactUs, setContactUs] = useState(false);
  const { isIntersect } = useContext(ObserveContext);

  const handleMouseEnter = () => setContactUs(true);
  const handleMouseLeave = () => setContactUs(false);
  const handleAboutClick = (e) => {
    const text = e.target.innerText;
    for (let i = 0; i < navAbout.length; i++) {
      if (text === navAbout[i].title) scrollTo(i + 1);
    }
  }

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <header className={`${styles.header} ${isIntersect ? styles.active : ''} ${isResult ? styles.resultActive : ''}`}>
      <div className={`${styles.logo} ${isIntersect ? styles.active : ''}`} onClick={handleLogoClick}>
        <img src="/img/logo.png" alt="logo" />
      </div>
      <nav className={styles.nav}>
        <ul className={`${styles.about} ${isIntersect ? styles.active : ''}`}>
          {
            navAbout.map(({ id, title }) => <li key={id} onClick={handleAboutClick}>{title}</li>)
          }
        </ul>
        <CgDarkMode
          className={`${styles.darkMode} ${isDarkMode ? styles.darkActive : ''} ${isIntersect ? styles.active : ''}`}
          onClick={handleDarkMode} />
        <div
          className={`${styles.menu} ${isIntersect ? styles.active : ''}`}>
          <div
            className={styles.contact}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {
              contactUs ? <RiContactsFill className={styles.contactMe} /> : <RiContactsLine className={styles.contactMe} />
            }
          </div>
        </div>
      </nav>
    </header>
  )
}

const navAbout = [
  {
    id: uuid4(),
    title: 'MY INTRODUCTION'
  },
  {
    id: uuid4(),
    title: 'HOW TO STUDY & ABILITY'
  },
  {
    id: uuid4(),
    title: 'THE RESULT'
  },
];

const scrollTo = (times) => {
  window.scrollTo({
    top: window.innerHeight * times,
    left: 0,
    behavior: 'smooth',
  });
}