import React, { useContext, useEffect } from 'react'
import styles from './Introduction.module.css';
import { ObserveContext } from '../../context/ObserveContext';

export default function Introduction() {
  const { handleIPosition } = useContext(ObserveContext);

  useEffect(() => {
    const onScroll = () => handleIPosition(window.scrollY + 250);
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [handleIPosition]);

  return (
    <div className={styles.intro}>

    </div>
  )
}
