"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import SelectorsJson from "@/JSON/Selectors.json" assert { type: "json" };

import SelectorWrapper from "@/components/Selector/SelectorWrapper";

const selectors = ["Home", "Hot Now", "Minting", "Discover", "Gaming"];

interface SelectorsJsonType {
  home: string[];
  hotnow: string[];
  minting: string[];
  discover: string[];
  gaming: string[];
}

export default function Home() {
  const [currentSelector, setCurrentSelector] = useState(0);
  const selectorsJson: SelectorsJsonType = SelectorsJson;

  // Mapeamento das chaves do JSON para os seletores
  const selectorKeys: (keyof SelectorsJsonType)[] = [
    "home",
    "hotnow",
    "minting",
    "discover",
    "gaming",
  ];

  // Função para lidar com a seleção
  const handleSelect = (index: number) => {
    setCurrentSelector(index);
  };

  // Obter o array correto do JSON com base no seletor atual
  const currentItems =
    SelectorsJson[selectorKeys[currentSelector] as keyof typeof SelectorsJson];

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
                currentSelector === index ? styles.activeSelector : ""
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
