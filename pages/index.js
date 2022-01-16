import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home(props) {
  const { IP } = props;
  return (
    <div className={styles.container}>
        <h1>YOUR IP is {IP}</h1>
    </div>
  )
}

export async function getServerSideProps({ req, res, params }) {
  const IP = req.socket.remoteAddress;
  console.log(IP)

  return {
    props: {
      IP
    }
  }
}