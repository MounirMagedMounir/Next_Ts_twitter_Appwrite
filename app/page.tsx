'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getUserLocalStorge } from '@/data/local/webData';
import { UseAppSelector } from '@/Redux/store';
import { PaletteMode } from '@mui/material';
import { useEffect, useState } from 'react';


export default function page() {
  const settings = UseAppSelector( (state) => state.settings.value);


  return (
    <main className={styles.main}>
      <div className={styles.description}>
     
  <h1>home</h1>
        
      </div>
    </main>
      )
}
