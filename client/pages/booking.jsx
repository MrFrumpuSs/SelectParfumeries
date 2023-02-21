import styles from '../styles/booking.module.scss';
import Navbar from '../components/UI/Navbar/Navbar';
import Footer from '../components/UI/Footer/Footer';
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import BookingService from "../API/BookingService"
import m_styles from '../styles/modal.module.scss';
import Modal from '../components/UI/Modal/Modal';
import { BiErrorCircle, BiCheckCircle } from "react-icons/bi";
import { useRouter } from 'next/router';

const BookingPage = () => {
    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const [btnLock, setBtnLock] = useState(false);
    const [modal, setModal] = useState(false);
    const [regError, setRegError] = useState('');
    const router = useRouter();

    const submitForm = async (data) => {
        setBtnLock(true);
        const response = await BookingService.create(data);
        if(response.data?.error) {
            setRegError(response.data.error);
            setBtnLock(false);
            setModal(true);
        } else {
            setModal(true);
        }
    }
    return (
        <>
            <Navbar></Navbar>
            <section className={styles.booking}>
                <div className={[styles.inner, 'container'].join(' ')}>
                    <p className={styles.info}>В нашем каталоге представлен не весь ассортимент ароматов.<br/>Для уточнения информации по наличию и стоимости заполните ,пожалуйста ,форму ниже</p>
                    <form className={styles.form} onSubmit={handleSubmit(data => submitForm(data))}>
                        <Input placeholder="Бренд" className={styles.input} type="text" label="Бренд" name="brand" errors={errors} field={register}
                            validationSchema={
                                {
                                    required: "Поле должно быть заполнено"
                                }
                            }
                        />
                        <Input placeholder="Аромат" className={styles.input} type="text" label="Аромат" name="aroma" errors={errors} field={register}
                            validationSchema={
                                {
                                    required: "Поле должно быть заполнено"
                                }
                            }
                        />
                        <Input placeholder="Обьем (мл)" className={styles.input} type="number" label="Обьем (мл)" name="size" errors={errors} field={register}
                            validationSchema={
                                {
                                    required: "Поле должно быть заполнено"
                                }
                            }
                        />
                        <Input placeholder="Кол-во" className={styles.input} type="number" label="Кол-во" name="quantity" errors={errors} field={register}
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
                    <Modal active={modal} className={m_styles.modal} setActive={setModal} closable={regError ? true : false}>
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
                                <p className={m_styles.m_description}>Ожидайте, в ближайшее время с вами свяжется менеджер для уточнения заказа.</p>
                            </>
                        }    
                        {!regError &&
                            <Button className={m_styles.m_button} onClick={() => router.push('/')}>Вернуться на главную</Button>
                        }
                    </Modal>
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}

export default BookingPage