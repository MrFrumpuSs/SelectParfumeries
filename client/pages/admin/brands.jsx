import RequireAuth from '../../components/RequireAuth'
import BrandService from '../../API/BrandService'
import Footer from '../../components/UI/Footer/Footer'
import styles from '../../styles/admin.module.scss'
import AdminAside from '../../components/UI/Admin/AdminAside/AdminAside'
import AdminBrands from '../../components/Admin/AdminBrands/AdminBrands'
import { useState } from 'react'

const BrandsPage = ({ fetchbrands }) => {
    const removeBrand = (id) => {
        setBrands(brands.filter(e => e._id !== id));
    }
    const [brands, setBrands] = useState(fetchbrands);
    return (
        <RequireAuth>
            <div className={styles.admin}>
                <div className={[styles.inner].join(' ')}>
                    <AdminAside></AdminAside>
                    <AdminBrands removeBrand={removeBrand} data={brands}></AdminBrands>
                </div>
            </div>
            <Footer className={styles.footer}></Footer>
        </RequireAuth>
    )
}

export async function getServerSideProps() {

    const brands = await BrandService.getAll();
    let fetchbrands = brands.data.brands;

    return { props: { fetchbrands } }
}

export default BrandsPage