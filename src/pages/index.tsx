import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '../styles/Home.module.css'
import Background from '../components/Background'
import Weather from '../components/Weather'

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Web Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background />
      <div className={styles.innerContainer}>
        <Weather />
      </div>
    </div>
  )
}

export default IndexPage
