import RequireAuth from '../../components/RequireAuth'
import OrderService from '../../API/OrderService'
import Footer from '../../components/UI/Footer/Footer'
import styles from '../../styles/admin.module.scss'
import AdminAside from '../../components/UI/Admin/AdminAside/AdminAside'
import AdminOrders from '../../components/Admin/AdminOrders/AdminOrders'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const AdminPage = ({ fetchorders, orderscount }) => {
    
    const [data, setData] = useState({
        orders: '',
        orderscount: '',
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async() => {
            const orders = await OrderService.getAll();
            setData({orders: orders.data.orders, orderscount: orders.data.count});
            setLoading(false);
        }
        fetchData();
    }, [])
    

    const router = useRouter();
    const setPage = (page, pathquery) => {
        router.push({ pathname: '/admin/orders/page/'+ page, query: { ...pathquery } }  );
    }
    if(!loading) {
        return (
            <RequireAuth>
                <div className={styles.admin}>
                    <div className={[styles.inner].join(' ')}>
                        <AdminAside></AdminAside>
                        <AdminOrders data={data.orders} count={data.orderscount} setPage={setPage}></AdminOrders>
                    </div>
                </div>
                <Footer className={styles.footer}></Footer>
            </RequireAuth>
        )
    }
}

export default AdminPage