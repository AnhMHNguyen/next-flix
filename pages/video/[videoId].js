import { useRouter } from 'next/router';
import NavBar from '../../components/navbar/navbar';
import VideoDetail from '../../components/video-detail/video-detail';
import styles from '../../styles/Video.module.scss';

const Video = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.contentWrapper}>
        <VideoDetail videoId={router.query.videoId}/>
      </div>
    </div>
  );
}

export default Video;