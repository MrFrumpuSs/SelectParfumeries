import React from 'react'
import Navbar from '../../components/UI/Navbar/Navbar'
import Footer from '../../components/UI/Footer/Footer'
import styles from '../../styles/order/[id].module.scss'
import OrderService from '../../API/OrderService'

const OrderPage = ({fetchorder}) => {
    const getVariation = (item) => {
        if(item?.id?.variations) {
            let filtred = item.id.variations.filter(variation=> variation._id === item.variation);
            return filtred[0];
        }
    }
    return (
        <>
            <Navbar></Navbar>
            <section className={styles.order}>
                <div className={[styles.inner, 'container'].join(' ')}>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td>Имя:</td>
                                <td>{fetchorder.name}</td>
                            </tr>
                            <tr>
                                <td>Фамилия:</td>
                                <td>{fetchorder.sname}</td>
                            </tr>
                            <tr>
                                <td>Номер телефона:</td>
                                <td>{fetchorder.number}</td>
                            </tr>
                            <tr>
                                <td>E-mail:</td>
                                <td>{fetchorder.email.length > 0 ? fetchorder.email : 'Не указан'}</td>
                            </tr>
                            <tr>
                                <td>Итоговая цена:</td>
                                <td>{fetchorder.price === 0 ? 'уточняется🤷🏻‍♂️' : fetchorder.price + ' ₽'}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className={styles.cart_table_wrapper}>
                        <table className={styles.cart_table}>
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Кол-во</th>
                                    <th>Цена</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fetchorder.cart.map(item=>
                                    <tr key={item?.variation}>
                                        <td>{item?.id?.name} ({getVariation(item)?.quantity} мл)</td>
                                        <td>{item?.count}</td>
                                        <td>
                                            {getVariation(item)?.price === 0 ? 'уточняется🤷🏻‍♂️' 
                                            :
                                            <>
                                                {getVariation(item)?.sale ? getVariation(item)?.sale : getVariation(item)?.price } ₽
                                            </>
                                            }
                                            
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <p className={styles.total}>Итоговая цена: <span>{fetchorder.price === 0 ? 'уточняется🤷🏻‍♂️' : fetchorder.price + ' ₽'}</span></p>
                    </div>

                </div>
            </section>
            <Footer></Footer>
        </>
    )
}

export async function getServerSideProps(context) {
    
    const id = context.params.id;

    const order = await OrderService.getOne(id);
    let fetchorder = order.data[0];

    
    return { props: { fetchorder } }
}

export default OrderPage