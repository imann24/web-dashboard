import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '../styles/Home.module.css'
import Background from '../components/Background'

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Web Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background />
      {/* TODO: REMOVE THIS: */}
      <h1>Hello World</h1>
    </div>
  )
}

export default IndexPage
