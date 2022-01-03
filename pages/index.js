import { useRouter } from 'next/router';
import Head from 'next/head';
import Modal from 'react-modal';
import Banner from '../components/banner/banner';
import NavBar from '../components/navbar/navbar';
import SectionCard from '../components/card/section-card';
import { getCommonVideos, getPopularVideos, getWatchAgainVideos, getLikedVideos } from '../lib/videos';
import MyModal from '../components/modal/modal';
import redirectUser from '../utils/redirectUser';
import styles from '../styles/Home.module.scss';

Modal.setAppElement('#__next');

export const getServerSideProps = async ({ req }) => {
  const { userId, token } = await redirectUser(req);
  
  const watchAgainVideos = await getWatchAgainVideos(userId, token);
  const favouritedVideos = await getLikedVideos(userId, token);
  
  const disneyVideos = await getCommonVideos("disney trailer");
  const kpopVideos = await getCommonVideos("kpop mv");
  const podcastVideos = await getCommonVideos("podcast");
  const popularVideos = await getPopularVideos();
  return {
    props: {
      disneyVideos,
      kpopVideos,
      podcastVideos,
      popularVideos,
      watchAgainVideos,
      favouritedVideos
    }
  }
}

export default function Home({ disneyVideos, kpopVideos, podcastVideos, popularVideos, watchAgainVideos, favouritedVideos }) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextflix</title>
        <meta name="description" content="Discover Youtube Videos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <NavBar />
        <Banner
          videoId="4zH5iYM4wJo"
          title="Clifford the red dog"
        />
        <div className={styles.sectionWrapper}>
          <SectionCard title="Disney" videos={disneyVideos} size="large"/>
          <SectionCard title="Watch Again" videos={watchAgainVideos}/>
          <SectionCard title="You liked" videos={favouritedVideos}/>
          <SectionCard title="Podcasts" videos={podcastVideos}/>
          <SectionCard title="K-pop" videos={kpopVideos} size="medium"/>
          <SectionCard title="Popular" videos={popularVideos} />
        </div>
        <MyModal open={!!router.query.video} url='/' videoId={router.query.video} router={router} />
      </div>
    </div>
  )
}
