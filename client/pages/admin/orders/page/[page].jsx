import RequireAuth from '../../../../components/RequireAuth'
import OrderService from '../../../../API/OrderService'
import Footer from '../../../../components/UI/Footer/Footer'
import styles from '../../../../styles/admin.module.scss'
import AdminAside from '../../../../components/UI/Admin/AdminAside/AdminAside'
import AdminOrders from '../../../../components/Admin/AdminOrders/AdminOrders'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const AdminPage = ({ page }) => {
    const router = useRouter();
    const [data, setData] = useState({
        orders: '',
        orderscount: '',
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async() => {
            const orders = await OrderService.getAll({page: page});
            setData({orders: orders.data.orders, orderscount: orders.data.count});
            setLoading(false);
        }
        fetchData();
    }, [page])
    

  
    const setPage = (page, pathquery) => {
        router.push({ pathname: '/admin/orders/page/'+ page, query: { ...pathquery } }  );
    }
    if(!loading) {
        return (
            <RequireAuth>
                <div className={styles.admin}>
                    <div className={[styles.inner].join(' ')}>
                        <AdminAside></AdminAside>
                        <AdminOrders data={data.orders} count={data.orderscount} page={page} setPage={setPage}></AdminOrders>
                    </div>
                </div>
                <Footer className={styles.footer}></Footer>
            </RequireAuth>
        )
    }
}

export async function getServerSideProps(context) {
    const page = context.params.page;

    return { props: { page } }
}

export default AdminPage