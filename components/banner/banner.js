import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './banner.module.scss';

const Banner = ({ title, videoId }) => {
  const router = useRouter();
  const handleOnPlay = (e) => {
    e.preventDefault();
    router.push(`/video/${videoId}`);
  }
  const handleOnMore = (e) => {
    e.preventDefault();
    router.push(`/video/${videoId}`);
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.nseriesWrapper}>
          <p className={styles.firstLetter}>N</p>
          <p className={styles.series}>S E R I E S</p>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div className={styles.btnWrapper}>
          <button className={styles.playBtn} onClick={handleOnPlay}>
            <div className={styles.playIcon}>
              <Image
                src="/static/play_arrow.svg"
                alt="Play icon"
                width={24}
                height={24}
              />
            </div>
            <span className={styles.playText}>Play</span>
          </button>
          <button className={styles.infoBtn} onClick={handleOnMore}>
            <div className={styles.infoIcon}>  
              <Image
                src="/static/more-info.svg"
                alt="info icon"
                width={24}
                height={24}
              />
            </div>
            <span className={styles.infoText}>More Info</span>
          </button>
        </div>
      </div>
      {/* <div className={styles.fadeBottom}></div> */}
    </div>
  );
}

export default Banner;