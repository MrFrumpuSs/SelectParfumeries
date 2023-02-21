import React from 'react'
import Link from 'next/link'
import styles from './AdminAside.module.scss'
import Logo from '../../../../assets/logo.webp'
import Image from 'next/image'
import { useRouter } from 'next/router'
const AdminAside = () => {
    const router = useRouter();
    console.log()
    return (
        <aside className={styles.sidebar}>
            <Link href='/'><a className={styles.logo}><Image src={Logo} layout='fill'></Image></a></Link>
            <ul className={styles.ul}>
                <li className={router.pathname === '/admin' ? [styles.li, styles.active].join(' ') : styles.li}><Link href="/admin"><a>Главная</a></Link></li>
                <li className={router.pathname === '/admin/create' ? [styles.li, styles.active].join(' ') : styles.li}><Link href="/admin/create"><a>Добавить аромат</a></Link></li>
                <li className={router.pathname === '/admin/brands' ? [styles.li, styles.active].join(' ') : styles.li}><Link href="/admin/brands"><a>Бренды</a></Link></li>
                <li className={router.pathname === '/admin/brand/create' ? [styles.li, styles.active].join(' ') : styles.li}><Link href="/admin/brand/create"><a>Добавить бренд</a></Link></li>
                <li className={router.pathname === '/admin/orders' ? [styles.li, styles.active].join(' ') : styles.li}><Link href="/admin/orders"><a>Заявки</a></Link></li>
                <li className={router.pathname === '/admin/bookings' ? [styles.li, styles.active].join(' ') : styles.li}><Link href="/admin/bookings"><a>Под заказ</a></Link></li>
                <li className={router.pathname === '/admin/requests' ? [styles.li, styles.active].join(' ') : styles.li}><Link href="/admin/requests"><a>Запрос цены</a></Link></li>
            </ul>
        </aside>
    )
}

export default AdminAside