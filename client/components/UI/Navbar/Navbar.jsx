import React from 'react';
import styles from './Navbar.module.scss';
import { BsSearch, BsCart2 } from "react-icons/bs";
import Link from 'next/link'
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Logo from '../../../assets/logo.webp'
import Image from 'next/image';
import { useRouter } from 'next/router';
import Search from '../../Search/Search';
import SearchStyles from '../../Search/Search.module.scss';

const Navbar = () => {
    const router = useRouter();
    const count = useSelector((state) => state.cart.count);
    const [burger, setBurger] = useState(false);
    const [search, setSearch] = useState(false);
    const openBurger = () => {
        burger ? setBurger(false) : setBurger(true); 
    }
    return (
        <div className={[styles.navbar, 'container'].join(' ')}>
            <div className={styles.top}>
                <a href="tel:+79166419772" className={styles.number}>+7 916 641-97-72</a>
                <div className={styles.logo} onClick={e=> router.push('/')}><Image src={Logo} layout="fill"></Image></div>
                <div className={styles.icons}>
                    <a className={styles.ico} onClick={e=> setSearch(true)}><BsSearch color="#161616"></BsSearch></a>
                    <Link href="/cart"><a className={[styles.ico, styles.cart].join(' ')}><BsCart2 color="#161616"></BsCart2>{count > 0 ? <p className={styles.count}>{count < 100 ? count : '99+'}</p> : null}</a></Link>
                    <a onClick={e=> openBurger()} className={burger ? [styles.burger, styles.active].join(' ') : styles.burger }></a>
                </div>
            </div>
            <nav className={burger ? [styles.bottom, styles.active].join(' ') : styles.bottom }>
                <ul className={styles.menu}>
                    <li className={styles.menu_item}><Link href="/catalog"><a>Каталог <IoIosArrowDown/></a></Link>
                        <div className={styles.sub_menu_wrapper}>
                            <ul className={styles.sub_menu}>
                                <li className={styles.sub_menu_item}><Link href="/catalog"><a>Новинки</a></Link></li>
                                <li className={styles.sub_menu_item}><Link href="/catalog/woman"><a>Женская</a></Link></li>
                                <li className={styles.sub_menu_item}><Link href="/catalog/man"><a>Мужская</a></Link></li>
                                <li className={styles.sub_menu_item}><Link href="/catalog/unisex"><a>Унисекс</a></Link></li>
                            </ul>
                        </div>
                    </li>
                    <li className={styles.menu_item}><Link href="/catalog?raspiv=true"><a>Распив <IoIosArrowDown/></a></Link>
                        <div className={styles.sub_menu_wrapper}>
                            <ul className={styles.sub_menu}>
                                <li className={styles.sub_menu_item}><Link href="/catalog?raspiv=true"><a>Новинки</a></Link></li>
                                <li className={styles.sub_menu_item}><Link href="/catalog/woman?raspiv=true"><a>Женская</a></Link></li>
                                <li className={styles.sub_menu_item}><Link href="/catalog/man?raspiv=true"><a>Мужская</a></Link></li>
                                <li className={styles.sub_menu_item}><Link href="/catalog/unisex?raspiv=true"><a>Унисекс</a></Link></li>
                            </ul>
                        </div>
                    </li>
                    <li className={styles.menu_item}><Link href="/brands"><a>Бренды</a></Link></li>
                    <li className={styles.menu_item}><Link href="/booking"><a>Под заказ</a></Link></li>
                    <li className={styles.menu_item}><Link href="/delivery"><a>Доставка</a></Link></li>
                    <li className={styles.menu_item}><Link href="/payment"><a>Оплата</a></Link></li>
                    <li className={styles.menu_item}><Link href="/contacts"><a>Контакты</a></Link></li>
                    <a href="tel:+79999999999" className={styles.m_number}>+7 999 999-99-99</a>
                </ul>
            </nav>
            <Search setSearch={setSearch} className={search ? SearchStyles.active : null}></Search>
        </div>
    )
    
}

export default Navbar