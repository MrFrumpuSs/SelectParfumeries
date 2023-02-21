import React from 'react'
import { useRouter } from 'next/router'
import styles from './AdminBrands.module.scss'
import Button from '../../UI/Button/Button'
import BrandService from '../../../API/BrandService'
const AdminBrands = ({data, removeBrand}) => {
    const router = useRouter();
    const removeBrandConf = (id) => {
        BrandService.delete(id);
        removeBrand(id);
    }
    return (
        <div className={styles.content}>
            <h1 className={styles.title}>Бренды</h1>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.table_head}>
                        <th>Название</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(brand=>
                        <tr key={brand._id} className={styles.item}>
                            <td className={styles.item_title}>{brand.name}</td>
                            <td className={styles.item_btns}>
                                <div className={styles.item_btns_inner}>
                                    <Button onClick={e=> router.push('/admin/brand/update/' + brand._id)} className={styles.edit}>Редактировать</Button>
                                    <a style={{cursor: 'pointer'}} onClick={e=> confirm("Вы действительно хотите удалить бренд ?") ? removeBrandConf(brand._id) : null} className={styles.remove}>Удалить</a>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default AdminBrands