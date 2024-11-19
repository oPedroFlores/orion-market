'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './Selector.module.css';
import SelectorCard from './SelectorCard';

interface CurrentItems {
  [key: string]: string[];
}

const SelectorWrapper = ({ currentItems }: { currentItems: CurrentItems }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Atualizar estado de scroll
  const updateScrollState = () => {
    if (wrapperRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = wrapperRef.current;
      setCanScrollLeft(scrollLeft > 0);

      setCanScrollRight(scrollWidth <= scrollWidth - clientWidth);
    }
  };

  // Atualizar scroll state ao montar e ao trocar `currentItems`
  useEffect(() => {
    updateScrollState();

    const wrapper = wrapperRef.current;
    wrapper?.addEventListener('scroll', updateScrollState);

    return () => {
      wrapper?.removeEventListener('scroll', updateScrollState);
    };
  }, [currentItems]); // Escuta mudanças em `currentItems`

  // Garantir que o scrollLeft seja resetado ao mudar `currentItems`
  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollLeft = 0; // Reseta o scroll ao mudar conteúdo
      updateScrollState();
    }
  }, [currentItems]);

  const handleNext = () => {
    if (wrapperRef.current) {
      const { clientWidth } = wrapperRef.current;
      wrapperRef.current.scrollBy({
        left: clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = () => {
    if (wrapperRef.current) {
      const { clientWidth } = wrapperRef.current;
      wrapperRef.current.scrollBy({
        left: -clientWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.divAndButtonWrapper}>
      <button
        className={`${styles.prevButton} ${styles.button}`}
        onClick={handlePrev}
        // disabled={!canScrollLeft} // Disable if can't scroll left
      >
        PREV
      </button>
      <div className={styles.selectorWrapper} ref={wrapperRef}>
        {currentItems.map((item: string, index: number) => (
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
      <button
        className={`${styles.nextButton} ${styles.button}`}
        onClick={handleNext}
        // disabled={!canScrollRight}
      >
        NEXT
      </button>
    </div>
  );
};

export default SelectorWrapper;
