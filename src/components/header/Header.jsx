import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { v4 as uuid4 } from 'uuid';
import { ObserveContext } from '../../context/ObserveContext';
import { RiContactsFill, RiContactsLine } from 'react-icons/ri';
import { CgDarkMode } from "react-icons/cg";
import { DarkModeContext } from '../../context/DarkModeContext';
import ContactCard from './ContactCard';

export default function Header({ isResult }) {
  const [contactUs, setContactUs] = useState(false);
  const [contactClick, setContactClick] = useState(false);
  const { isDarkMode, handleDarkMode } = useContext(DarkModeContext);
  const { isIntersect } = useContext(ObserveContext);
  const dom = useRef(null);

  const handleAboutClick = (e) => {
    const text = e.target.innerText;
    if (text === navAbout[0].title) {
      scrollTo(1);
    } else if (text === navAbout[1].title) {
      scrollTo(3);
    } else if (text === navAbout[2].title) {
      scrollTo(4);
    }
  }

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      if (dom !== null) {
        if (!dom.current.contains(e.target)) setContactClick(false);
      }
    })
  }, [])

  return (
    <header className={`${styles.header} ${isIntersect ? styles.active : ''} ${isResult ? styles.resultActive : ''}`}>
      <div
        className={`${styles.logo} ${isIntersect ? styles.active : ''}`}
        onClick={handleLogoClick}>
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
          className={`${styles.menu} ${isIntersect ? styles.active : ''}`} ref={dom}>
          <div
            className={styles.contact}
            onMouseEnter={() => setContactUs(true)}
            onMouseLeave={() => setContactUs(false)}
            onClick={() => setContactClick(prev => !prev)}
          >
            {
              contactUs || contactClick ? <RiContactsFill className={styles.contactMe} /> : <RiContactsLine className={styles.contactMe} />
            }
          </div>
          {
            <div className={`${styles.contactCardWrap} ${contactClick ? styles.contactActive : ''} ${isIntersect ? styles.active : ''}`}>
              <ContactCard isIntersect={isIntersect} />
            </div>
          }
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