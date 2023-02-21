import RequireAuth from '../../../components/RequireAuth'
import ParfumService from '../../../API/ParfumService'
import BrandService from '../../../API/BrandService'
import AdminAside from '../../../components/UI/Admin/AdminAside/AdminAside'
import Footer from '../../../components/UI/Footer/Footer'
import styles from '../../../styles/admin.module.scss'
import CreateParfumForm from '../../../components/Admin/CreateParfumForm/CreateParfumForm'
import { useState } from 'react'

const CreatePage = ({ fetchbrands, fetchparfum, id}) => {
    

    const [btnLock, setBtnLock] = useState(false);

    const submitForm = async (data) => {
        setBtnLock(true);
        const response = await ParfumService.update(data, id);
        
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
                            <h1 className={styles.title}>Создание парфюма</h1>
                            <CreateParfumForm fetchparfum={fetchparfum} fetchbrands={fetchbrands} submitForm={submitForm} btnLock={btnLock}></CreateParfumForm>
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

    const parfum = await ParfumService.getOne(id);
    let fetchparfum = parfum.data[0];


    const brands = await BrandService.getAll();
    let fetchbrands = [];

    brands.data.brands.forEach((brand, index)=>{
        fetchbrands[index] = {title: brand.name, value: brand._id};
    })


    return { props: { fetchbrands, fetchparfum, id } }
}

export default CreatePage