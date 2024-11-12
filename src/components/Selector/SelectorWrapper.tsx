import React from 'react';
import styles from './Selector.module.css';
import SelectorCard from './SelectorCard';
const SelectorWrapper = ({ currentItems }) => {
  return (
    <div className={styles.selectorWrapper}>
      {currentItems.map((item, index) => (
        <SelectorCard key={index} selected={item} />
      ))}
    </div>
  );
};

export default SelectorWrapper;
