import styles from '../styles/Home.module.css'
import Terminal, { ColorMode, LineType } from 'react-terminal-ui';


export default function Home(props) {
  const { IP,data  } = props;
  const dataArr = Object.keys(data);
  const terminalData = dataArr.map( key => {
    const datafield = data[key];
    return ({
      type: LineType.Output, value: `${key} : ${datafield}`})
  })
  debugger;
  return (
    <div className={styles.container}>

    <Terminal name='Gregs terminal' colorMode={ ColorMode.Light }  lineData={terminalData} onInput={ terminalInput => console.log(`New terminal input received: '${ terminalInput }'`) }/>

          
    </div>
  )
}

export async function getServerSideProps({ req, res, params }) {
  const IP = (req.headers['x-forwarded-for'] ||  '24.146.137.46').split(',')[0].trim();
  const request = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=823e20bde8f34d41b9f4757f6b13dca8&ip=${IP}`);
  const data = await request.json()
  debugger;
  console.log(req)

  return {
    props: {
      IP,
      data
    }
  }
}