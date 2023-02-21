import React from 'react'
import Image from 'next/image'
import styles from './AdminParfums.module.scss'
import Button from '../../UI/Button/Button'
import Link from 'next/link'
import Pagination from '../../Pagination/Pagination'
import { getPageCount } from '../../../utils/pages'
import { useRouter } from 'next/router'
import ParfumService from '../../../API/ParfumService'

const AdminParfums = ({data, count, page, setPage, removeParfum}) => {
    const router = useRouter();
    const pageCount = getPageCount(count, 20);
    let pathquery = router.query;
    delete pathquery.page;
    page = page || 1;
    const getSex = (parfum) => {    
        switch (parfum.sex) {
            case 'MAN':
                return 'Мужской';
            case 'WOMAN':
                    return 'Женский';
            case 'UNISEX':
                return 'Унисекс';
            default:
                break;
        }
    }
    const changePage = (page) => {
        setPage(page, pathquery);
    }
    
    const removeParfumConf = (id) => {
        ParfumService.delete(id);
        removeParfum(id);
    }
    return (
        <div className={styles.content}>
            <h1 className={styles.title}>Ароматы</h1>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.table_head}>
                        <th>Изображение</th>
                        <th>Название</th>
                        <th>Бренд</th>
                        <th>Пол</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(parfum=>
                        <tr key={parfum._id} className={styles.item}>
                            <td className={styles.item_img}>
                                <Image src={parfum.img[0]} layout="fill" loading='lazy'></Image>
                            </td>
                            <td className={styles.item_title}>{parfum.name}</td>
                            <td className={styles.item_brand}>{parfum.brand.name}</td>
                            <td className={styles.item_sex}>{getSex(parfum)}</td>
                            <td className={styles.item_btns}>
                                <div className={styles.item_btns_inner}>
                                    <Button onClick={e=> router.push('/admin/update/' + parfum._id)} className={styles.edit}>Редактировать</Button>
                                    <a style={{cursor: 'pointer'}} onClick={e=> confirm("Вы действительно хотите удалить парфюм ?") ? removeParfumConf(parfum._id) : null} className={styles.remove}>Удалить</a>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination className={styles.pagination} totalPages={pageCount} page={+page} implement={2} changePage={changePage}></Pagination>
        </div>
    )
}

export default AdminParfums