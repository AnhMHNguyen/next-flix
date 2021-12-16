import Modal from 'react-modal';
import VideoDetail from '../video-detail/video-detail';
  
const MyModal = ({ open, url, videoId, router }) => {
  return (
    <Modal
      isOpen={open}
      onRequestClose={() => router.push(url, url, { scroll: false })}
      onAfterOpen={() => document.body.style.overflow = 'hidden'}
      onAfterClose={() => document.body.style.overflow = 'unset'}
      style={{
        display: 'flex',
        overlay: {
          zIndex: 99,
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        },
        content: {
          backgroundColor: 'rgb(20, 20, 20)',
          border: 'none',
          borderRadius: '.85rem',
          height: '100%',
          padding: '0',
          maxWidth: '800px',
          margin: 'auto',
          overflow: 'hidden',
        },
      }}
    >
      <VideoDetail videoId={videoId} />
    </Modal>
  );
}
export default MyModal;