import RequireAuth from '../../components/RequireAuth'
import BannerService from '../../API/BannerService'
import Footer from '../../components/UI/Footer/Footer'
import styles from '../../styles/admin.module.scss'
import AdminAside from '../../components/UI/Admin/AdminAside/AdminAside'
import AdminBanner from '../../components/Admin/AdminBanner/AdminBanner'
import { useState } from 'react'

const BannerPage = ({ fetchbanner }) => {
    return (
        <RequireAuth>
            <div className={styles.admin}>
                <div className={[styles.inner].join(' ')}>
                    <AdminAside></AdminAside>
                    <AdminBanner data={fetchbanner}></AdminBanner>
                </div>
            </div>
            <Footer className={styles.footer}></Footer>
        </RequireAuth>
    )
}

export async function getServerSideProps() {

    const banner = await BannerService.getAll();
    let fetchbanner = banner.data.banners;

    return { props: { fetchbanner } }
}

export default BannerPage