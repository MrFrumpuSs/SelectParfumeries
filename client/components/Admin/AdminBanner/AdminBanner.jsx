import React from 'react'
import { useRouter } from 'next/router'
import styles from './AdminBanner.module.scss'
import Button from '../../UI/Button/Button'
import Image from 'next/image'
const AdminBanner = ({data}) => {
    const router = useRouter();
    return (
        <div className={styles.content}>
            <h1 className={styles.title}>Баннер</h1>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.table_head}>
                        <th>Изображение</th>
                        <th>Заголовок</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(banner=>
                        <tr key={banner._id} className={styles.item}>
                            <td className={styles.item_title}><div className={styles.img}><Image loading="lazy" src={banner.img} layout="fill"></Image></div></td>
                            <td className={styles.item_title}>{banner.title}</td>
                            <td className={styles.item_btns}>
                                <div className={styles.item_btns_inner}>
                                    <Button onClick={e=> router.push('/admin/banner/update/' + banner._id)} className={styles.edit}>Редактировать</Button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default AdminBanner