// SelectorCard.jsx
'use client';
import React, { useEffect, useState } from 'react';
import styles from './Selector.module.css';
import Image from 'next/image';

interface SelectorCardProps {
  selected: string;
  isBlurred: boolean;
  onHover: () => void;
  onLeave: () => void;
  myIndex: number; // Adicionado: Índice do card
}

interface CollectionData {
  name: string;
  floor: string;
  mainImage: string;
  verified: boolean;
}

const SelectorCard: React.FC<SelectorCardProps> = ({
  selected,
  isBlurred,
  onHover,
  onLeave,
  myIndex, // Recebe o índice como prop
}: SelectorCardProps) => {
  const [data, setData] = useState<CollectionData | null>(null);
  const [isMounted, setIsMounted] = useState(false); // Estado para controlar a montagem

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

  useEffect(() => {
    console.log(`${selected}:`, `/Collections/${data?.mainImage}.webp`);
  }, [data, selected]);

  // Adiciona a classe 'animeLeft' após a montagem
  useEffect(() => {
    const timer = setTimeout(
      () => {
        setIsMounted(true);
      },
      myIndex * 50 > 500 ? myIndex * 100 : 0,
    ); // Ajuste o atraso aqui (em milissegundos)

    return () => clearTimeout(timer);
  }, [myIndex]);

  if (!data) {
    return <p>Carregando dados...</p>;
  }

  return (
    <div
      className={`${styles.cardWrapper} ${isBlurred ? styles.blurred : ''} ${
        isMounted ? 'animeLeft' : ''
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ animationDelay: `${myIndex * 0.2}s` }} // Define o delay baseado no índice
      tabIndex={0} // Para acessibilidade via teclado
    >
      {/* Overlay para Hover */}
      <div className={styles.cardOverlayHover}></div>

      {/* Vários divs com a classe mousePositionTracker */}
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className={styles.mousePositionTracker}></div>
      ))}

      <div className={styles.cardContent}>
        <Image
          src={`/Collections/${data.mainImage}.webp`} // Orion/logo.png
          alt="Collection Image"
          width={1024}
          height={1024}
          className={styles.cardImage}
        />
        <div className={styles.cardOverlay}>
          <h4>
            {data.name}
            {data.verified && (
              <Image
                src="/SVG/verified2.svg"
                alt="Verified"
                width={24}
                height={24}
              />
            )}
          </h4>
          <p>{data.floor}</p>
        </div>
      </div>
    </div>
  );
};

export default SelectorCard;
