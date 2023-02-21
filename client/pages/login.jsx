import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../styles/login.module.scss';
import m_styles from '../styles/modal.module.scss';
import { useRouter } from 'next/router'
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';
import Link from 'next/link'
import { IoReturnDownBackOutline } from "react-icons/io5";
import { BiErrorCircle, BiCheckCircle } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import { motion } from "framer-motion";
import AuthService from '../API/AuthService';
import Modal from '../components/UI/Modal/Modal';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Login = () => {

    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user.isAuth);
    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const [loading, setloading] = useState(true);
    const [btnLock, setBtnLock] = useState(false);
    const [modal, setModal] = useState(false);
    const [regError, setRegError] = useState('');
    const router = useRouter();
    useEffect(()=>{
        if(isAuth) {
            router.push('/admin');
        } else {
            setloading(false);
        }
    }, [])
    const submitForm = async (data) => {
        setBtnLock(true);
        const response = await AuthService.login(data);
        if(response.data?.error) {
            setRegError(response.data.error);
            setBtnLock(false);
            setModal(true);
        } else {
            setRegError('');
            dispatch(setUser(response.data.user));
            router.push('/admin');
        }
    }

    if(!loading) {
        return (
            <div className={styles.register}>
                <form className={styles.register_form} onSubmit={handleSubmit(data => submitForm(data))}>
                    <h1 className={styles.title}>Авторизация в админ панель</h1>        
                    <Input placeholder="E-mail" className={styles.input} type="text" label="E-mail" name="email" errors={errors} field={register}
                    validationSchema={
                        {
                            required: "Поле должно быть заполнено"
                        }
                    }
                    />
                    <Input className={styles.input} type="password" placeholder="Пароль" label="Пароль" name="password" errors={errors} field={register} 
                    validationSchema={
                        {
                            required: "Поле должно быть заполнено",
                        }
                    }/>
                    <Button className={styles.button} disabled={btnLock}>Войти</Button>
                    <p className={styles.back}><IoReturnDownBackOutline size='20px' className={styles.back_ico} color='#333F51'/> Вернутся на <Link href="/"><a className={styles.link}>главную</a></Link></p>
                </form>
                <Modal active={modal} className={m_styles.modal} setActive={setModal} closable={regError ? true : false}>
                    {regError
                    ?
                        <BiErrorCircle className={styles.t_ico} size='110px' color='#EF5944'></BiErrorCircle>
                    :
                        <BiCheckCircle className={styles.t_ico} size='110px' color='#22C55E'></BiCheckCircle>
                    }
                    <h2 className={m_styles.m_title}>Во время авторизации произошла ошибка!</h2>
                    <p className={m_styles.m_description}>{regError}</p>
                    
                    {!regError &&
                        <Button className={m_styles.m_button} onClick={() => router.push('/login')}>Перейти к форме авторизации</Button>
                    }
                </Modal>
            </div>
        );
    }
};

export default Login;
