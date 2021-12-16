import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from './card';
import arrowNext from '../../public/static/arrow_forward.svg';
import arrowPrev from '../../public/static/arrow_back.svg';
import styles from './section-card.module.scss';



const SectionCard = ({ title, size = "small", videos = [] }) => {
  const ref = useRef(null);
  const handleOnPrev = () => {
    if (ref.current !== null && ref.current.swiper !== null) {
      ref.current.swiper.slidePrev();
    }
  }

  const handleOnNext = () => {
    if (ref.current !== null && ref.current.swiper !== null) {
      ref.current.swiper.slideNext();
    }
  };

  const swiperParams = {
    slidesPerView:  size === 'small' ? 2 : 3,
    loopFillGroupWithBlank: true,
    spaceBetween: 2,
    breakpoints: {
      640: {
        slidesPerView: size === 'small' ? 3 : 4,
        spaceBetween: 3,
      },
      768: {
        slidesPerView: size === 'small' ? 4 : 5,
        spaceBetween: 3,
      },
      1024: {
        slidesPerView: size === 'small' ? 5 : 6,
        spaceBetween: 3,
      },
      1280: {
        slidesPerView: size === 'small' ? 7 : 8,
        spaceBetween: 3
      },
    },
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{ title }</h2>
      <div className={styles.swiperWrapper}>
        {videos.length > 0 &&
          <div className={styles.prevBtn} onClick={handleOnPrev}>
            <Image src={arrowPrev} alt="arrow prev" width="48px" height="48px" />
          </div>
        }
        <Swiper
          {...swiperParams}
          ref={ref}
          className={styles.cardWrapper}
        >
          {videos.map((video, idx) => (
            <SwiperSlide key={idx}>
              <Link href={`/?video=${video.id}`} as={`/video/${video.id}`} scroll={false}>
                <a>
                  <Card size={size} video={video}/>
                </a>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {videos.length > 0 &&
          <div className={styles.nextBtn} onClick={handleOnNext}>
            <Image src={arrowNext} alt="arrow next" width={48} height={48} />
          </div>
        }
      </div>
    </section>
  );
}

export default SectionCard;