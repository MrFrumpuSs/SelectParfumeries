import styles from '../styles/checkout.module.scss'
import Navbar from '../components/UI/Navbar/Navbar'
import Footer from '../components/UI/Footer/Footer'
import { useForm } from 'react-hook-form';
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';
import { useState, useEffect } from 'react';
import ParfumService from '../API/ParfumService';
import { useSelector } from 'react-redux';
import num_word from '../utils/num_word';
import { useRouter } from 'next/router';
import OrderService from '../API/OrderService';
import { useDispatch } from 'react-redux';
import { removeCart } from '../reducers/cartReducer';

const Checkout = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const [btnLock, setBtnLock] = useState(false);
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

    const submitForm = async (data) => {
        setBtnLock(true);
        const response = await OrderService.create({...data, cart: cart});
        if(response.data?.error) {
            router.push('/');
        } else {
            dispatch(removeCart());
            router.push('/order/' + response.data._id);
        }
    }
    if(!loading) {
        return (
            <>
                <Navbar></Navbar>
                <section className={styles.checkout}>
                    <div className={[styles.inner, 'container'].join(' ')}>
                        {parfums.length > 0
                            ?
                            <>
                                <form className={styles.form} onSubmit={handleSubmit(data => submitForm(data))}>
                                    <Input placeholder="Имя" className={styles.input} type="text" label="Имя" name="name" errors={errors} field={register}
                                        validationSchema={
                                            {
                                                required: "Поле должно быть заполнено"
                                            }
                                        }
                                    />
                                    <Input placeholder="Фамилия" className={styles.input} type="text" label="Фамилия" name="sname" errors={errors} field={register}
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
                                    <Input placeholder="Адрес" className={styles.input} type="text" label="Адрес" name="adress" errors={errors} field={register}
                                        validationSchema={
                                            {
                                                required: "Поле должно быть заполнено"
                                            }
                                        }
                                    />
                                    <Button className={styles.button} disabled={btnLock}>Оформить заказ</Button>
                                </form>
                                <div className={styles.total}>
                                    <div className={styles.total_inner}>
                                        <p className={styles.title}>Итого:</p>
                                        <ul className={styles.ul}>
                                            <li className={styles.count}>{count} {num_word(count, ['товар', 'товара', 'товаров'])}</li>
                                            <li className={styles.price}>{totalPrice === 0 ? 'уточняется🤷🏻‍♂️' : totalPrice.toLocaleString('ru') + ' ₽'}</li>
                                        </ul>
                                        <p className={styles.info}>Оплата товара производиться во время доставки</p>
                                        <p className={styles.info}>Актуальную цену уточняйте у менеджера при оформлении заказа</p>
                                    </div>
                                </div>
                            </>
                            :
                            <p>Во время оформления заказа произошла ошибка!</p>
                        }
                        
                    </div>
                </section>
                <Footer></Footer>
            </>
        )
    }
    
}

export default Checkout