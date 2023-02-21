import styles from './Footer.module.scss'
import Link from 'next/link'
import { BsWhatsapp } from "react-icons/bs";

const Footer = ({className}) => {
    return (
        <footer className={[styles.footer, className].join(' ')}>
            <div className={styles.top}>
                <div className={[styles.top_inner, 'container'].join(' ')}>
                    <ul className={styles.menu}>
                        <li className={styles.menu_item}><Link href="/catalog"><a>Каталог</a></Link></li>
                        <li className={styles.menu_item}><Link href="/catalog?raspiv=true"><a>Распив</a></Link></li>
                        <li className={styles.menu_item}><Link href="/brands"><a>Бренды</a></Link></li>
                        <li className={styles.menu_item}><Link href="/booking"><a>Под заказ</a></Link></li>
                        <li className={styles.menu_item}><Link href="/delivery"><a>Доставка</a></Link></li>
                        <li className={styles.menu_item}><Link href="/payment"><a>Оплата</a></Link></li>
                        <li className={styles.menu_item}><Link href="/contacts"><a>Контакты</a></Link></li>
                    </ul>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={[styles.bottom_inner, 'container'].join(' ')}>
                    <p className={styles.allright}>© 2022-2023 Logo</p>
                    <a href="https://wa.me/+79166419772" className={styles.tg}><BsWhatsapp/></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer