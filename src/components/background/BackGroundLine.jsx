import React from 'react'
import styles from './BackGroundLine.module.css';

export default function BackGroundLine({ isLoad, timeout }) {
  return (
    <div
      className={`${styles.line} ${isLoad ? styles.active : ''}`}
      style={{
        transition: `height ${timeout}ms`,
      }}
    >
    </div>
  )
}
