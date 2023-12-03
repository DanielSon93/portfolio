import styles from './Popup.module.css';
import { IoMdClose } from "react-icons/io";
import { v4 as uuid4 } from 'uuid';
import './swiper.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Language from './Language';

export default function Popup({ resultData, handleClick }) {
  const { fullNameKor, fullName, periodFull, imgUrl, languages, productionPurpose, explanation, link } = resultData[1];

  return (
    <div className={styles.modalBg}>
      <div className={styles.modal}>
        <div className={styles.close}>
          <IoMdClose className={styles.closeBtn} onClick={() => handleClick(null)} />
        </div>
        <section className={styles.title}>
          <h1>{fullNameKor}</h1>
          <h5>{fullName}</h5>
          <span>{periodFull}</span>
        </section>
        <main className={styles.detail}>
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className='slides'
          >
            {
              imgUrl.map(e => <SwiperSlide key={uuid4()} className='slide'>
                <img src={e} alt="" />
              </SwiperSlide>)
            }
          </Swiper>
          <div className={styles.slidesInfo}>
            <div className={styles.explanation}>
              {
                explanation.split('\n').map(e => <div key={uuid4()}>
                  {e}<br></br>
                </div>)
              }
            </div>
            <div className={styles.productionPurpose}>
              <span>제작 목적</span>
              <span>{productionPurpose}</span>
            </div>
            <div className={styles.language}>
              <span>사용 기술</span>
              <Language languages={languages} />
            </div>
            {
              fullName.includes('Fraud') || fullName === 'Portfolio' ?
                <span className={styles.link}>{link}</span> :
                <a href="#" className={styles.link}>{link}</a>
            }
          </div>
        </main>
      </div>
    </div>
  )
}
