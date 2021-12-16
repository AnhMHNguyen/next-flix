import { useState } from 'react';
import Image from 'next/image';
import styles from './card.module.scss';

const Card = ({ size, video }) => {
  const [imgSrc, setImgSrc] = useState(video.imgUrl)

  const classMap = {
    'small': styles['item-sm'],
    'medium': styles['item-md'],
    'large': styles['item-lg'],
  }
  const handleOnError = () => {
    setImgSrc("https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1456&q=80")
  }
  return (
    <div className={styles.container}>
      <div className={classMap[size]}>
        <Image
          src={imgSrc}
          alt="card-image"
          layout="fill"
          onError={handleOnError}
          className={styles.cardImg}
        />
      </div>
    </div>
  );
}

export default Card;