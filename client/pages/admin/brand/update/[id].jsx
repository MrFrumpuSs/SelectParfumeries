import RequireAuth from '../../../../components/RequireAuth'
import ParfumService from '../../../../API/ParfumService'
import BrandService from '../../../../API/BrandService'
import AdminAside from '../../../../components/UI/Admin/AdminAside/AdminAside'
import Footer from '../../../../components/UI/Footer/Footer'
import styles from '../../../../styles/admin.module.scss'
import CreateBrandForm from '../../../../components/Admin/CreateBrandForm/CreateBrandForm'
import { useState } from 'react'

const CreatePage = ({ fetchbrand, id }) => {

    const [btnLock, setBtnLock] = useState(false);

    const submitForm = async (data) => {
        setBtnLock(true);
        const response = await BrandService.update(data, id);
        
        if(response.data?.error) {
            console.log(response.data.error)
            alert('Ошибка');
        } else {
            alert('Успех!');
        }
        setBtnLock(false);
    }
    return (
        <RequireAuth>
            <div className={styles.admin}>
                <div className={[styles.inner].join(' ')}>
                    <AdminAside></AdminAside>
                    <div className={styles.content}>
                        <div className={styles.content_inner}>
                            <h1 className={styles.title}>Создание Бренда</h1>
                            <CreateBrandForm fetchbrand={fetchbrand} submitForm={submitForm} btnLock={btnLock}></CreateBrandForm>
                        </div>
                    </div>
                </div>
            </div>
            <Footer className={styles.footer}></Footer>
        </RequireAuth>
    )
}

export async function getServerSideProps(context) {

    const id = context.params.id;

    const brand = await BrandService.getOne(id);

    let fetchbrand = brand.data.brand[0];


    return { props: { fetchbrand, id } }
}
export default CreatePage