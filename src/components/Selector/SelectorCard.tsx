'use client';
import React, { useEffect, useState } from 'react';
import styles from './Selector.module.css';
import Image from 'next/image';

interface SelectorCardProps {
  selected: string;
}

interface CollectionData {
  name: string;
  floor: string;
  mainImage: string;
}

const SelectorCard = ({ selected }: SelectorCardProps) => {
  const [data, setData] = useState<CollectionData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await import(`@/JSON/Collections/${selected}.json`);
        setData(jsonData);
      } catch (error) {
        console.error('Erro ao importar o JSON:', error);
      }
    };

    fetchData();
  }, [selected]);

  React.useEffect(() => {
    console.log(`${selected}:`, `/Collections/${data?.mainImage}.webp`);
  }, [data, selected]);

  if (!data) {
    return <p>Carregando dados...</p>;
  }

  return (
    <div className={styles.card}>
      <Image
        src={`/Collections/${data.mainImage}.webp`} ///Orion/logo.png
        alt="Collection Image"
        width={1024}
        height={1024}
        className={styles.cardImage}
      ></Image>
      <h2>{selected}</h2>
      <p>{data.name}</p>
    </div>
  );
};

export default SelectorCard;
