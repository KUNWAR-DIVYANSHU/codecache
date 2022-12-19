import NavBar from "../components/NavBar/Navbar"
import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar/Sidebar"
import buycofeicon from '../media/icons/buycofe.png'
import bg from "../media/Home.jpg"

import DashHome from "../components/Home/DashHome"

import styles from "../styles/dashboard.module.css"


export async function getStaticPaths() {
  return {
    paths: [{ params: { page: 'home'} }, 
    { params: { page: 'browse' } }, 
    { params: { page: 'notification'  } },
    { params: { page: 'buymeacoffee' } }],
    fallback: false,     // can also be true or 'blocking'
  }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  const data = {
    '':'home',
    'home':'Home - Code Cache',
    'browse':'Browse By Tags - Code Cache',
    'notification':'Notification - Code Cache',
    'buymeacoffee': 'Buy me a Coffee - Code Cache',
  }
  return {
    // Passed to the page component as props
    // props: { title: title },
    props:{title : data[context.params.page]}
  }
}

export default function Home(props) {
  const [theme, setTheme] = useState("dark");
  const [sideExpanded, setSideExpanded] = useState(false);
  const [selectedTab , setSelectedTab] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("theme") === "light") {
      setTheme("light");
    } else {
      sessionStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="some description here" />
        <link
          rel="icon"
          href="/favicon_light.png"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main style={{ overflowY: "hidden" }}>

        {/* <Image
          src={bg}
          alt="bg"
          style={{
            width: "100%",
            opacity: "0.2",
            objectFit: "contain",
            objectPosition: "top",
            position: "absolute",
            zIndex: "-2",
          }}
        /> */}

        <div className={styles.dashboardContainer}>
          <div>
            <NavBar theme={theme} setTheme={setTheme} 
            sideExpanded={sideExpanded} setSideExpanded={setSideExpanded}/>
          </div>
          <div className={styles.sideBarWithMain} >
            <Sidebar theme={theme} setTheme={setTheme} 
            sideExpanded={sideExpanded}/>
            <DashHome theme={theme}/>
          </div>
        </div>
      </main>
    </div>
  );
}
