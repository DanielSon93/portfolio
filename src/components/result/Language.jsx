import React from 'react'
import { v4 as uuid4 } from 'uuid';
import styles from './Language.module.css';

export default function Language({ languages }) {
  return (
    <ul className={styles.languages}>
      {
        languages.map(e => <li key={uuid4()} className={styles.language}>
          {e}
        </li>)
      }
    </ul>
  )
}
