import RequireAuth from '../../../../components/RequireAuth'
import BookingService from '../../../../API/BookingService'
import Footer from '../../../../components/UI/Footer/Footer'
import styles from '../../../../styles/admin.module.scss'
import AdminAside from '../../../../components/UI/Admin/AdminAside/AdminAside'
import AdminBookings from '../../../../components/Admin/AdminBookings/AdminBookings'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const BookingsPage = ({page}) => {
    
    const [data, setData] = useState({
        bookings: '',
        bookingscount: '',
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async() => {
            const bookings = await BookingService.getAll({page: page});
            setData({bookings: bookings.data.booking, bookingscount: bookings.data.count});
            setLoading(false);
        }
        fetchData();
    }, [page])
    

    const router = useRouter();
    const setPage = (page, pathquery) => {
        router.push({ pathname: '/admin/bookings/page/'+ page, query: { ...pathquery } }  );
    }
    if(!loading) {
        return (
            <RequireAuth>
                <div className={styles.admin}>
                    <div className={[styles.inner].join(' ')}>
                        <AdminAside></AdminAside>
                        <AdminBookings data={data.bookings} count={data.bookingscount} page={page} setPage={setPage}></AdminBookings>
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

export default BookingsPage