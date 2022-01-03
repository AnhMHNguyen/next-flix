import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Modal from 'react-modal';
import NavBar from '../../components/navbar/navbar';
import { getMyList } from '../../lib/videos';
import redirectUser from '../../utils/redirectUser';
import Card from '../../components/card/card';
import styles from '../../styles/MyList.module.scss';
import MyModal from '../../components/modal/modal';

Modal.setAppElement('#__next');

export const getServerSideProps = async ({ req }) => {
  const { userId, token } = await redirectUser(req);

  const videos = await getMyList(userId, token);
  return {
    props: {
      videos
    }
  }
}

const MyList = ({ videos }) => {
  const router = useRouter();
  
  return (
    <div className={styles.layout}>
      <Head>
        <title>My List - Nextflix</title>
        <meta name="description" content="My list" />
      </Head>
      <div className={styles.container}>
        <NavBar />
        <div className={styles.contentWrapper}>
          <h2>My List</h2>
          <div className={styles.cardWrapper}>
            {videos.map((video, idx)=> (
              <Link href={`/browse/my-list/?video=${video.id}`} as={`/video/${video.id}`} scroll={false} key={idx}>
                <a>
                  <Card size="small" video={video} className={styles.card}/>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* <Modal
          isOpen={!!router.query.video}
          onRequestClose={() => router.push('/browse/my-list', '/browse/my-list', { scroll: false })}
          onAfterOpen={() => document.body.style.overflow = 'hidden'}
          onAfterClose={() => document.body.style.overflow = 'unset'}
          closeTimeoutMS={1000}
          overlayClassName={styles.overlay}
          style={{
            display: 'flex',
            overlay: {
              zIndex: 99,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
            content: {
              backgroundColor: 'rgb(20, 20, 20)',
              border: 'none',
              borderRadius: '.85rem',
              height: '100%',
              padding: '0',
              maxWidth: '800px',
              margin: 'auto',
            }
          }}
        >
          <VideoDetail videoId={router.query.video} />
        </Modal> */}
      <MyModal open={!!router.query.video} url="/browse/my-list" videoId={router.query.video} router={router} />
    </div>
  );
}

export default MyList;