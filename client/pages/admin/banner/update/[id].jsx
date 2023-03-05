import RequireAuth from '../../../../components/RequireAuth'
import BannerService from '../../../../API/BannerService'
import AdminAside from '../../../../components/UI/Admin/AdminAside/AdminAside'
import Footer from '../../../../components/UI/Footer/Footer'
import styles from '../../../../styles/admin.module.scss'
import CreateBannerForm from '../../../../components/Admin/CreateBannerForm/CreateBannerForm'
import { useState } from 'react'

const UpdatePage = ({ fetchbanner, id }) => {

    const [btnLock, setBtnLock] = useState(false);

    const submitForm = async (data) => {
        setBtnLock(true);
        const response = await BannerService.update(data, id);
        
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
                            <h1 className={styles.title}>Редактирование Баннера</h1>
                            <CreateBannerForm fetchbanner={fetchbanner} submitForm={submitForm} btnLock={btnLock}></CreateBannerForm>
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

    const banner = await BannerService.getOne(id);

    let fetchbanner= banner.data.banner[0];


    return { props: { fetchbanner, id } }
}
export default UpdatePage