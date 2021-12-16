import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './video-detail.module.scss';
import Like from '../icons/like-icon';
import DisLike from '../icons/dislike-icon';
import MyList from '../icons/mylist-icon';
import useSWR from 'swr';
import Loading from '../loading/loading';


const VideoDetail = ({ videoId }) => {
  const [video, setVideo]= useState(null);
  const [toggleMyList, setToggleMyList] = useState(false);
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDisLike, setToggleDisLike] = useState(false);

  const videoFetcher = url => fetch(url).then(res => res.json())
  const { data: videoData, error: videoError } = useSWR(`/api/getVideoById?id=${videoId}`, videoFetcher);
  
  useEffect(() => {
    if (videoData && videoData.length > 0) {
      setVideo(videoData[0])
    }
  }, [videoData])
  
  const statsFetcher = url => fetch(url).then(res => res.json())
  const { data: statsData, error: statsError } = useSWR(`/api/stats?videoId=${videoId}`, statsFetcher);

  useEffect(() => {
    if (statsData && statsData.length > 0) {
      if (statsData[0].favourited === 1) {
        setToggleLike(true);
      } else if (statsData[0].favourited === 0) {
        setToggleDisLike(true);
      }
    }
  }, [statsData])
  
  const sendFavourite = async (favourited, saved) => {
    return await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({
        videoId,
        favourited,
        saved
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleToggleMyList = async() => {
    setToggleMyList(!toggleMyList);

    const myList = !toggleMyList;
    const favourited = statsData[0].favourited;
    const response = await sendFavourite(favourited, myList);
  };
  const handleToggleLike = async () => {
    let favourited = null;
    if (toggleLike) {
      setToggleLike(false);
    } else {
      favourited = 1;
      if (toggleDisLike) {
        setToggleDisLike(false)
      }
      setToggleLike(true);
    }
    const response = await sendFavourite(favourited, toggleMyList);
  };
  const handleToggleDislike = async () => {
    let favourited = null;
    if (toggleDisLike) {
      setToggleDisLike(false);
    } else {
      favourited = 0;
      if (toggleLike) {
        setToggleLike(false);
      }
      setToggleDisLike(true);
    }

    const response = await sendFavourite(favourited, toggleMyList);
  };

  return video === null ? <Loading /> : (
    <div className={styles.layout}>
    <Head>
      <title>{video.title}</title>
      <meta name="description" content={`${video.title} - Nextflix`}></meta>
    </Head>
    <div className={styles.container}>
      <div className={styles.videoWrapper}>
        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          type="text/html"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
          allowFullScreen
        />
        <div className={styles.btnWrapper}>
          <button onClick={handleToggleMyList}>
            <div className={styles.iconWrapper}>
              <MyList added={toggleMyList} />
            </div>
          </button>
          <button onClick={handleToggleLike}>
            <div className={styles.iconWrapper}>
              <Like selected={toggleLike} />
            </div>
          </button>
          <button onClick={handleToggleDislike}>
            <div className={styles.iconWrapper}>
              <DisLike selected={toggleDisLike} />
            </div>
          </button>
        </div>
      </div>
      <div className={styles.detailWrapper}>
         <div className={styles.col1}>
          <p className={styles.publishTime}>{video.publishTime}</p>
          <p className={styles.title}>{video.title}</p>
          <p className={styles.description}>{video.description}</p>
        </div>
        <div className={styles.col2}>
          <p className={styles.subTextWrapper}>
            <span className={styles.textColor}>Cast: </span>
            <span className={styles.channelTitle}>{video.channelTitle}</span>
          </p>
          <p className={styles.subTextWrapper}>
            <span className={styles.textColor}>View Count: </span>
            <span className={styles.channelTitle}>{video.statistics.viewCount ? video.statistics.viewCount : 'N/A'}</span>
          </p>
        </div>
      </div>
      </div>
      </div>
  );
}

export default VideoDetail;