import Head from "next/head";
import React from "react";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const Contact = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <h1>Contact Page</h1>
        
      </main>
    </>
  );
};

export default Contact;