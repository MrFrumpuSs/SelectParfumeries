import ParfumService from '../../API/ParfumService';
import RequestService from '../../API/RequestService';
import ReviewService from '../../API/ReviewService';
import Image from 'next/image';
import Navbar from '../../components/UI/Navbar/Navbar';
import Variation from '../../components/UI/Variation/Variation';
import Footer from '../../components/UI/Footer/Footer';
import styles from '../../styles/product/[id].module.scss'
import { useState } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Tabs from '../../components/UI/Tabs/Tabs';
import DescriptionTab from '../../components/Tabs/DesctiptionTab/DescriptionTab';
import Breadcrumbs from '../../components/UI/Breadcrumbs/Breadcrumbs';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../reducers/cartReducer';
import { useForm } from 'react-hook-form';
import { BiErrorCircle, BiCheckCircle } from "react-icons/bi";
import m_styles from '../../styles/modal.module.scss';
import Modal from '../../components/UI/Modal/Modal';
import Textarea from '../../components/UI/Textarea/Textarea';
import Head from 'next/head'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductPage = ({ fetchparfum, breadCrumbsItems }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const [btnLock, setBtnLock] = useState(false);
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [modalIMG, setModalIMG] = useState('');

    const addProductToCart = () => {
        dispatch(addToCart({id: fetchparfum._id, variation: price._id}));
    }
    const [curVariation, setCurVariation] = useState(fetchparfum.variations[0].quantity);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const { register : reviewform, handleSubmit : reviewSubmit, formState: { errors : reviewErrors } } = useForm();
    const [regError, setRegError] = useState('');
    const [modal2Txt, setModal2Txt] = useState('Ожидайте, в ближайшее время с вами свяжется менеджер для уточнения заказа.');

    const submitForm = async (data) => {
        setBtnLock(true);
        const response = await RequestService.create(data);
        setModal2Txt('Ожидайте, в ближайшее время с вами свяжется менеджер для уточнения заказа.');
        if(response.data?.error) {
            setBtnLock(false);
            setRegError(response.data.error);
            setBtnLock(false);
        }
        setModal(false);
        setModal2(true);
        setBtnLock(false);
    }

    const submitReview = async (data) => {
        setBtnLock(true);
        const response = await ReviewService.create(data, fetchparfum._id);
        setModal2Txt('Отзыв успешно размещен!');
        if(response.data?.error) {
            setBtnLock(false);
            setRegError(response.data.error);
            setBtnLock(false);
        }
        fetchparfum.reviews.unshift({fio: data.fio, email: data.email, text: data.text, img: response.data.img})
        setModal(false);
        setModal2(true);
        setBtnLock(false);
    }

    const [tabs, setTabs] = useState([
        {title: 'Описание', value: 'description', component: DescriptionTab, props: {description: fetchparfum.description, characteristics: fetchparfum.characteristics, itemprop: "description"}},
    ]);
    const [activeTab, setActiveTab] = useState(tabs[0]);

    let price = fetchparfum.variations.find(e=> e.quantity === curVariation);

    let btnState = cart.find(e=>e.variation === price._id);

    return (
        <>
        <Head>
            <title>{fetchparfum.name} - Select Parfumeries</title>
            <meta name="description" content={fetchparfum.description} />
            <meta property="og:title" content={fetchparfum.name + ' - Select Parfumeries'} key="og-title"/>
            <meta property="og:description" content={fetchparfum.description} key="og-description"/>
            <meta property="og:image" content={fetchparfum.img[0]} key="og-image"/>
            <meta property="og:type" content="product" key="og-type"/>
        </Head>
            <Navbar></Navbar>
            <section className={styles.card} itemScope itemType="http://schema.org/Product">
                <div className={[styles.card_inner, 'container'].join(' ')}>
                    <Breadcrumbs data={breadCrumbsItems}></Breadcrumbs>
                    <div className={styles.top}>
                        <div className={styles.sliders}>
                            <Swiper style={{"--swiper-navigation-color": "#000", '--swiper-navigation-size': '30px'}} spaceBetween={10} navigation={true} thumbs={{ swiper: thumbsSwiper }} modules={[ Navigation, Thumbs]} className={styles.slider}>
                                {fetchparfum.img.map((img, index)=>
                                    <SwiperSlide key={index}>
                                        <Image itemProp="image" loading="lazy" src={img} layout='fill'></Image>
                                    </SwiperSlide>
                                )}
                            </Swiper>
                            <Swiper onSwiper={setThumbsSwiper} spaceBetween={10} slidesPerView={4} watchSlidesProgress={true} modules={[ Navigation, Thumbs]} className={[styles.thumbs, 'thumbs'].join(' ')}>
                                {fetchparfum.img.map((img, index)=>
                                    <SwiperSlide key={index}>
                                        <Image loading="lazy" src={img} layout="fill"></Image>
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        </div>
                        <div className={styles.text}>
                            <h1 className={styles.title} itemProp="name">{fetchparfum.name}</h1>
                            <p className={styles.point} itemProp="brand">Бренд: {fetchparfum.brand.name}</p>
                            <p className={styles.point}>Объем / мл</p>
                            <div className={styles.variations}>
                                {fetchparfum.variations.map(variation=>
                                    <Variation checked={variation.quantity.toString() === curVariation.toString()} key={variation._id} onChange={e=> setCurVariation(e.target.value.toString())} quantity={variation.quantity} value={variation.quantity} name="variation"></Variation>
                                )}
                            </div>
                            {price.price === 0 
                            ?
                            <div itemProp="offers" itemScope itemType="http://schema.org/Offer" className={styles.price_box}>
                                <Button itemProp="price" content="0" className={styles.btn} onClick={e=> modal ? setModal(false) : setModal(true)}>Запросить цену</Button>
                                <meta itemProp="priceCurrency" content="RUB" />
                            </div>
                            :
                            <div itemProp="offers" itemScope itemType="http://schema.org/Offer" className={styles.price_box}>
                                {fetchparfum.sale && price.sale ?
                                    <>
                                        <p itemProp="price" content={price.price} className={styles.sale_price}>{price.price} ₽</p>
                                        <p className={styles.price}>{price.sale} ₽</p>
                                        <meta itemProp="priceCurrency" content="RUB" />
                                    </>
                                    :
                                    <>
                                        <p itemProp="price" content={price.price} className={styles.price}>{price.price} ₽</p>
                                        <meta itemProp="priceCurrency" content="RUB" />
                                    </>
                                }
                            </div>
                            }
                            <Tabs tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} layout="tabs1" Component={<activeTab.component data={activeTab.props ? activeTab.props : activeTab.props}/>} ></Tabs>
                            
                            
                            <Button className={styles.btn} disabled={btnState ? true : false} onClick={e=> addProductToCart()} >{btnState ? 'Добавлено' : 'Добавить в корзину'}</Button>
                        </div>
                    </div>
                    <div className={styles.reviews}>
                        <h1 className={styles.title}>Отзывы</h1>
                        <div className={styles.reviews_inner}>
                            <div className={styles.left}>
                                {fetchparfum.reviews.map(review=>
                                    <div key={review._id} itemProp="review" itemScope itemType="http://schema.org/Review" className={styles.review}>
                                        <div className={styles.review_header}>
                                            <h3 itemProp="author" className={styles.fio}>{review.fio}</h3>
                                            {review.email.length > 0 &&
                                                <p className={styles.email}>{review.email}</p>
                                            }
                                        </div>
                                        <div className={styles.review_body}>
                                            <p itemProp="description" className={styles.text}>{review.text}</p>
                                            {review?.img[0] &&
                                                <div onClick={e=> {setModalIMG(review.img[0]); setModal3(true)}} className={styles.review_img}><Image loading="lazy" src={review.img[0]} layout='fill'></Image></div>
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={styles.right}>
                                <form className={styles.form} onSubmit={reviewSubmit(data => submitReview(data))}>
                                    <Input placeholder="Имя, Фамилия" className={styles.input} type="text" label="Имя, Фамилия" name="fio" errors={reviewErrors} field={reviewform}
                                        validationSchema={
                                            {
                                                required: "Поле должно быть заполнено"
                                            }
                                        }
                                    />
                                    <Input placeholder="Email (не обязательно)" className={styles.input} type="text" label="Email" name="email" errors={reviewErrors} field={reviewform}
                                        validationSchema={
                                            {
                                                required: "Поле должно быть заполнено"
                                            }
                                        }
                                    />
                                    <Textarea placeholder="Отзыв" className={styles.input} type="text" label="Отзыв" name="text" errors={reviewErrors} field={reviewform}
                                        validationSchema={
                                            {
                                                required: "Поле должно быть заполнено"
                                            }
                                    }></Textarea>
                                    <Input className={styles.input} type="file" placeholder="Изображение" label="Изображение" name="img" errors={reviewErrors} field={reviewform} />
                                    <Button className={styles.button} disabled={btnLock}>Оставить отзыв</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                    <Modal active={modal} className={m_styles.modal} setActive={setModal} closable>
                        <form className={styles.form} onSubmit={handleSubmit(data => submitForm(data))}>
                            <Input placeholder="Аромат" value={fetchparfum.name} readOnly className={styles.input} type="text" label="Аромат" name="aroma" errors={errors} field={register}
                                validationSchema={
                                    {
                                        required: "Поле должно быть заполнено"
                                    }
                                }
                            />
                            <Input placeholder="ФИО" className={styles.input} type="text" label="ФИО" name="fio" errors={errors} field={register}
                                validationSchema={
                                    {
                                        required: "Поле должно быть заполнено"
                                    }
                                }
                            />
                            <Input placeholder="Телефон" className={styles.input} type="text" label="Телефон" name="number" errors={errors} field={register}
                                validationSchema={
                                    {
                                        required: "Поле должно быть заполнено"
                                    }
                                }
                            />
                            <Input placeholder="E-mail (не обязательно)" className={styles.input} type="text" label="E-mail" name="email" errors={errors} field={register}/>
                            <Button className={styles.button} disabled={btnLock}>Оставить заявку</Button>
                        </form>
                    </Modal>
                    <Modal active={modal2} className={m_styles.modal} setActive={setModal2} closable={regError ? true : false}>
                        {regError
                        ?
                            <>
                                <BiErrorCircle className={styles.t_ico} size='110px' color='#EF5944'></BiErrorCircle>
                                <h2 className={m_styles.m_title}>Ошибка!</h2>
                                <p className={m_styles.m_description}>{regError}</p>
                            </>
                        :
                            <>
                                <BiCheckCircle className={styles.t_ico} size='110px' color='#22C55E'></BiCheckCircle>
                                <h2 className={m_styles.m_title}>Успех!</h2>
                                <p className={m_styles.m_description}>{modal2Txt}</p>
                            </>
                        }    
                        {!regError &&
                            <Button className={m_styles.m_button} onClick={e => setModal2(false)}>Закрыть</Button>
                        }
                    </Modal>
                    <Modal active={modal3} className={[m_styles.modal, styles.review_modal].join(' ')} setActive={setModal3} closable>
                        <div className={styles.review_modal_inner}>
                            <Image loading="lazy" src={modalIMG} layout='fill'></Image>
                        </div>
                    </Modal>
                    
            </section>
            
            <Footer></Footer>
        </>
    );
}

export async function getServerSideProps(context) {
    
    const id = context.params.id;

    const parfum = await ParfumService.getOne(id);
    let fetchparfum = parfum.data[0];

    let breadCrumbsItems = [
        {title: 'Главная', path: '/'},
        {title: 'Каталог', path: '/catalog'}
    ];

    breadCrumbsItems.push({title: fetchparfum.name})
    

    return { props: { fetchparfum, breadCrumbsItems } }
}


export default ProductPage