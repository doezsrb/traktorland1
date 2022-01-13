import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
import styles from "./swiper.module.css";
import { useState } from "react";

SwiperCore.use([Navigation, Autoplay]);

const swiper = ({ akcije }) => {
  const [swiperContext, setSwiperContext] = useState();

  const swipeNext = () => {
    swiperContext.slideNext();
  };

  const swipePrev = () => {
    swiperContext.slidePrev();
  };

  return (
    <div className={styles.root}>
      <div onClick={swipePrev} className={styles.arrowPrev}>
        <img src="/slajder/left.png"></img>
      </div>
      <Swiper
        className={styles.swiperRoot}
        spaceBetween={50}
        speed={500}
        centeredSlides
        slidesPerView="auto"
        autoplay={{ delay: 2000 }}
        loop={true}
        onSwiper={setSwiperContext}
      >
        {akcije.map((akcija) => {
          return (
            <SwiperSlide className={styles.swiperSlide}>
              <a
                className={styles.swiperSlideLink}
                href={akcija.link_proizvoda}
              >
                <img
                  src={akcija.thumb}
                  alt="Slika"
                  className={styles.slideImg}
                />
                <p className={styles.akcijaIme}>{akcija.ime}</p>
                <p className={styles.cena}>
                  <span
                    style={{ textDecoration: "line-through", color: "#F54343" }}
                  >
                    {akcija.cena} RSD
                  </span>
                </p>
                <p className={styles.popust}>{akcija.popust} RSD</p>
              </a>
            </SwiperSlide>
          );
        })}

        {/* <SwiperSlide className={styles.swiperSlide}>Slide 2</SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>Slide 3</SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>Slide 4</SwiperSlide>
            
            <SwiperSlide className={styles.swiperSlide}>Slide 5</SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>Slide 6</SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>Slide 7</SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>Slide 8</SwiperSlide> */}
      </Swiper>
      <div onClick={swipeNext} className={styles.arrowNext}>
        <img src="/slajder/right.png"></img>
      </div>
    </div>
  );
};
export default swiper;
