import '@/styles/globals.css';
import React, { useEffect } from 'react';
import Navbar from '../components/navBar';
import Footer from '../components/footer';
import {BlogProvider} from '../components/blogContext';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader');
      if (loader) {
        loader.style.display = 'none';
      }
    }
  }, []);

  return (
    <BlogProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer/>
    </BlogProvider>
  );
}
