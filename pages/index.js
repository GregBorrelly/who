import styles from '../styles/Home.module.css'
import Terminal, { ColorMode, LineType } from 'react-terminal-ui';

import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Home(props) {
  const { IP,data  } = props;
  const dataArr = Object.keys(data);
  const terminalData = dataArr.filter(key => {
    if(key == 'ip' || key == 'country_flag' ) return null;
    else return key;
  }).map( key => {
    const datafield = data[key];
    return ({
      type: LineType.Output, value: `${key} : ${datafield}`})
  })
  terminalData.unshift({type: LineType.Input, value: `echo data for IP: ${IP}`});

  const defaultProps = {
    center: {
      lat: Number(data.latitude),
      lng: Number(data.longitude)
    },
    zoom: 10
  };
  return (
    <div className={styles.container}>
    <Terminal name='USER IDENTIFICATION SERVICE'   lineData={terminalData} onInput={ terminalInput => console.log(`New terminal input received: '${ terminalInput }'`) }/>

          
    </div>
  )
}

export async function getServerSideProps({ req, res, params }) {
  const IP = (req.headers['x-forwarded-for'] ||  '24.146.137.46').split(',')[0].trim();
  const request = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=823e20bde8f34d41b9f4757f6b13dca8&ip=${IP}`);
  const data = await request.json();
  return {
    props: {
      IP,
      data
    }
  }
}