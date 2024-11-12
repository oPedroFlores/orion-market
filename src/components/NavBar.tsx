import Image from 'next/image';
import React from 'react';
import styles from '@/components/css/NavBar.module.css';
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoWrapper}>
        <Image src="/Orion/logo.png" alt="Orion Logo" width={50} height={50} />
        <p>Orion Market</p>
      </div>
      <div className={styles.links}>
        <Link href="/"> Home </Link>
        <Link href="/about"> About </Link>
        <Link href="/contact"> Contact </Link>
      </div>

      <div className={styles.userDiv}>User Div</div>
    </nav>
  );
};

export default NavBar;
