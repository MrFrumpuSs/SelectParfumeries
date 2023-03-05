import Navbar from '../components/UI/Navbar/Navbar'
import Footer from '../components/UI/Footer/Footer'
import styles from '../styles/cart.module.scss'
import Cart from '../components/Cart/Cart'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ParfumService from '../API/ParfumService';
import { useState } from 'react';
import num_word from '../utils/num_word';
import Button from '../components/UI/Button/Button';
import Breadcrumbs from '../components/UI/Breadcrumbs/Breadcrumbs'
import { useRouter } from 'next/router';
import Head from 'next/head';

const CartPage = ({breadCrumbsItems}) => {
    const router = useRouter();
    const cart = useSelector((state) => state.cart.cart);
    const count = useSelector((state) => state.cart.count);

    const [loading, setLoading] = useState(true);
    const [parfums, setParfums] = useState([]);
    let cartArr = [];
    cart.map(e=>{
        cartArr.push(e.variation);
    })
    useEffect(() => {
        let payload = {limit: 0, var_ids: JSON.stringify(cartArr)};
        const fetchData = async () => {
            const parfums = await ParfumService.getAll(payload);
            setParfums(parfums.data.parfums);
            setLoading(false);
        }
        fetchData();
    }, [])
    
    let totalPrice = 0;
    cart.map(e=> {
        parfums.forEach((el, index) => {
            if(e.variation === el.variations._id) {
                if(el.sale) {
                    if(el.variations.sale) {
                        totalPrice += e.count * el.variations.sale;
                    } else {
                        totalPrice += e.count * el.variations.price;
                    }
                } else {
                    totalPrice += e.count * el.variations.price;
                }
            }
        })
    })
    if(!loading) {
        return (
            <>
                <Head>
                    <title>Корзина - Select Parfumeries</title>
                    <meta property="og:title" content='Корзина - Select Parfumeries' key="og-title"/>
                </Head>
                <Navbar></Navbar>
                <section className={styles.cart}>
                    <Breadcrumbs className='container' data={breadCrumbsItems}></Breadcrumbs>
                    <div className={[styles.inner, 'container'].join(' ')}>
                        {count > 0 
                            ?
                            <>
                                <div className={styles.table_inner}>
                                    <Cart data={parfums} cart={cart}></Cart>
                                </div>
                                <div className={styles.total}>
                                    <div className={styles.total_inner}>
                                        <p className={styles.title}>Итого:</p>
                                        <ul className={styles.ul}>
                                            <li className={styles.count}>{count} {num_word(count, ['товар', 'товара', 'товаров'])}</li>
                                            <li className={styles.price}>{totalPrice === 0 ? 'уточняется🤷🏻‍♂️' : totalPrice.toLocaleString('ru') + ' ₽'}</li>
                                        </ul>
                                        <p className={styles.info}>Оплата товара производиться во время доставки</p>
                                        <p className={styles.info}>Актуальную цену уточняйте у менеджера при оформлении заказа</p>
                                        <Button onClick={e=> router.push('/checkout')}>Оформить заказ</Button>
                                    </div>
                                </div>
                            </>
                            :
                            <p>Корзина пуста.</p>
                        }
                    </div>
                </section>
                <Footer></Footer>
            </>
        )
    }
}

export async function getServerSideProps() {
    
    let breadCrumbsItems = [
        {title: 'Главная', path: '/'},
        {title: 'Корзина'}
    ];
    

    return { props: { breadCrumbsItems } }
}


export default CartPage