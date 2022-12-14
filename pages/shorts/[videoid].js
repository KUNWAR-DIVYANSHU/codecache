import NavBar from "../../components/NavBar/Navbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from '../../styles/dashboard.module.css'

import playerStyles from '../videos/videoPlayer.module.css'

import { useEffect, useState } from "react"

import Head from "next/head"
import ShortsVideo from "../../components/ShortsVideo/ShortsVideo"
import ReactPlayer from "react-player"

export async function getStaticPaths() {
    return {
      paths: [{ params: { videoid: 'home'} }],
      fallback: 'blocking',     // can also be true or 'blocking'
    }
  }

export async function getStaticProps(context) {
    return {
        props: { videoid: context.params.videoid },
    };
}

export default function ShortsPage(props) {
  const [theme, setTheme] = useState("dark");
  const [sideExpanded, setSideExpanded] = useState(false);

  const [hasWindow, setHasWindow] = useState(false);


  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
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
        <title>{props.videoid}</title>
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


        <div className={styles.dashboardContainer}>
          <div>
            <NavBar theme={theme} setTheme={setTheme} 
            sideExpanded={sideExpanded} setSideExpanded={setSideExpanded}/>
          </div>
          <div className={styles.sideBarWithMain} >
            <Sidebar theme={theme} setTheme={setTheme} 
            sideExpanded={sideExpanded}/>

<div className={playerStyles.shortContainer}>
            {/* shorts goes here */}
            {hasWindow && (
            <ReactPlayer 
            className={playerStyles.shortVideoPlayer}
            url={`https://www.youtube.com/shorts/${props.videoid}`}
            controls={true}
            playing={true}
            light={true || props.videoData.thumbnail}
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: {
                  showinfo: 0,
                  modestbranding: 1,
                  rel: 0,
                  color: "red",
                },
              },
            }}
            />
            )}
</div>

          </div>
        </div>
      </main>


    </div>
  );
}
