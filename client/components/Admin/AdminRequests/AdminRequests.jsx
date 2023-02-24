import React from 'react'
import Image from 'next/image'
import styles from './AdminRequests.module.scss'
import Button from '../../UI/Button/Button'
import Link from 'next/link'
import Pagination from '../../Pagination/Pagination'
import { getPageCount } from '../../../utils/pages'
import { useRouter } from 'next/router'
import SetStatus from '../../SetStatus/SetStatus'
import RequestService from '../../../API/RequestService'

const AdminBookings = ({data, count, page, setPage}) => {
    const router = useRouter();
    const pageCount = getPageCount(count, 20);
    let pathquery = router.query;
    delete pathquery.page;
    page = page || 1;
    const changePage = (page) => {
        setPage(page, pathquery);
    }
    const setStatus = async (id, status) => {
        const response = await RequestService.updateStatus(status, id);
    }

    return (
        <div className={styles.content}>
            <h1 className={styles.title}>Запрос цены</h1>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.table_head}>
                        <th>Аромат</th>
                        <th>ФИО</th>
                        <th>Номер телефона</th>
                        <th>E-mail</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(order=>
                        <tr key={order._id} className={styles.item}>
                            <td className={styles.item_aroma}>{order.aroma}</td>
                            <td className={styles.item_fio}>{order.fio}</td>
                            <td className={styles.item_number}>{order.number}</td>
                            <td className={styles.item_email}>{order.email}</td>
                            <td className={styles.item_status}><SetStatus className={styles.status_select} _id={order._id} status={order.status} setStatus={setStatus}></SetStatus></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination className={styles.pagination} totalPages={pageCount} page={+page} implement={2} changePage={changePage}></Pagination>
        </div>
    )
}

export default AdminBookings