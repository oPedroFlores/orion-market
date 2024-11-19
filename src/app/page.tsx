'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import SelectorsJson from '@/JSON/Selectors.json';
import SelectorWrapper from '@/components/Selector/SelectorWrapper';

const selectors = ['Home', 'Hot Now', 'Minting', 'Discover', 'Gaming'];

export default function Home() {
  const [currentSelector, setCurrentSelector] = useState(0);

  // Mapeamento das chaves do JSON para os seletores
  const selectorKeys = ['home', 'hotnow', 'minting', 'discover', 'gaming'];

  // Função para lidar com a seleção
  const handleSelect = (index: number) => {
    setCurrentSelector(index);
  };

  // Obter o array correto do JSON com base no seletor atual
  const currentItems = SelectorsJson[selectorKeys[currentSelector]];

  return (
    <>
      <section className={styles.section}>
        {/* Menu de seletores */}
        <div className={styles.contentSelector}>
          {selectors.map((selector, index) => (
            <p
              key={index}
              onClick={() => handleSelect(index)}
              className={`${styles.selector} ${
                currentSelector === index ? styles.activeSelector : ''
              }`}
            >
              {selector}
            </p>
          ))}
        </div>

        {currentItems && (
          <SelectorWrapper
            key={selectorKeys[currentSelector]}
            currentItems={currentItems}
          />
        )}
      </section>
    </>
  );
}
