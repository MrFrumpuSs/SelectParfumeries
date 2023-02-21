import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCreative, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-creative";
import styles from './Banner.module.scss'
import { BsArrowRight } from "react-icons/bs";
import Button from '../UI/Button/Button';
import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/router'
import url from 'url';

const Banner = ({data}) => {
    const router = useRouter();
    const [white, setWhite] = useState(data[0].white);
    const sliderMode = (swiper) => {
        if(data[swiper.realIndex].white) {
            setWhite(true);
        } else {
            setWhite(false);
        }
    }
    const goLink = (link) => {
        const host = url.parse(link).host;
        const href = url.parse(link).href;
        if(host) {
            window.open(href);
        } else {
            router.push(href);
        }
    }
   
    return (
        <section className={styles.banner}>
            <Swiper modules={[Navigation, Pagination, EffectCreative, Autoplay]} autoplay={{delay: 6000}} speed={800} effect={"creative"} creativeEffect={{prev: {shadow: true,translate: [0, 0, -300],},next: {translate: ["100%", 0, 0],},}} style={{'--swiper-theme-color': white ? '#fff': '#000', '--swiper-navigation-size': '30px'}} navigation pagination={{ clickable: true }} spaceBetween={10} slidesPerView={1} loop='true' onSlideChange={(swiper) => sliderMode(swiper)}>
                {data.map(banner=>
                    <SwiperSlide className={styles.slider} key={banner._id}>
                        <div className={styles.slide}>
                            <Image priority className={styles.img} src={banner.img} layout="fill"></Image>
                            <div className={[styles.slide_inner, 'container'].join(' ')}>
                                <div className={banner.white ? [styles.content, styles.white].join(' ') : styles.content}>
                                    <h1 className={styles.title}>{banner.title}</h1>
                                    <p className={styles.description}>{banner.description}</p>
                                    <Button onClick={e=> goLink(banner.link)} className={styles.btn}>{banner.btnname} <BsArrowRight/></Button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
        </section>
    )
}

export default Banner