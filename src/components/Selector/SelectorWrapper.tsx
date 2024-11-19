"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Selector.module.css";
import SelectorCard from "./SelectorCard";

interface CurrentItems {
  items: string[]; // Ou apenas use string[] diretamente
}

interface SelectorWrapperProps {
  currentItems: string[];
}

const SelectorWrapper: React.FC<SelectorWrapperProps> = ({ currentItems }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const updateScrollState = () => {
    if (wrapperRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = wrapperRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollWidth > scrollLeft + clientWidth);
    }
  };

  useEffect(() => {
    updateScrollState();

    const wrapper = wrapperRef.current;
    wrapper?.addEventListener("scroll", updateScrollState);

    return () => {
      wrapper?.removeEventListener("scroll", updateScrollState);
    };
  }, [currentItems]);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollLeft = 0;
      updateScrollState();
    }
  }, [currentItems]);

  const handleNext = () => {
    if (wrapperRef.current) {
      const { clientWidth } = wrapperRef.current;
      wrapperRef.current.scrollBy({
        left: clientWidth,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (wrapperRef.current) {
      const { clientWidth } = wrapperRef.current;
      wrapperRef.current.scrollBy({
        left: -clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.divAndButtonWrapper}>
      <button
        className={`${styles.prevButton} ${styles.button}`}
        onClick={handlePrev}
      >
        <span className={`${styles.arrow} ${styles.prevArrow}`}></span>
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
      >
        <span className={`${styles.arrow} ${styles.nextArrow}`}></span>
      </button>
    </div>
  );
};

export default SelectorWrapper;
