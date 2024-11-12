// SelectorWrapper.jsx
import React, { useState } from 'react';
import styles from './Selector.module.css';
import SelectorCard from './SelectorCard';

const SelectorWrapper = ({ currentItems }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={styles.selectorWrapper}>
      {currentItems.map((item, index) => (
        <SelectorCard
          key={index}
          selected={item}
          isBlurred={hoveredIndex !== null && hoveredIndex !== index}
          onHover={() => setHoveredIndex(index)}
          onLeave={() => setHoveredIndex(null)}
          myIndex={index}
        />
      ))}
    </div>
  );
};

export default SelectorWrapper;
