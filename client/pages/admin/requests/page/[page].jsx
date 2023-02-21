import RequireAuth from '../../../../components/RequireAuth'
import RequestService from '../../../../API/RequestService'
import Footer from '../../../../components/UI/Footer/Footer'
import styles from '../../../../styles/admin.module.scss'
import AdminAside from '../../../../components/UI/Admin/AdminAside/AdminAside'
import AdminRequests from '../../../../components/Admin/AdminRequests/AdminRequests'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const RequestsPage = ({page}) => {
    
    const [data, setData] = useState({
        requests: '',
        requestscount: '',
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async() => {
            const requests = await RequestService.getAll({page: page});
            setData({requests: requests.data.request, requestscount: requests.data.count});
            setLoading(false);
        }
        fetchData();
    }, [page])
    

    const router = useRouter();
    const setPage = (page, pathquery) => {
        router.push({ pathname: '/admin/requests/page/'+ page, query: { ...pathquery } }  );
    }
    if(!loading) {
        return (
            <RequireAuth>
                <div className={styles.admin}>
                    <div className={[styles.inner].join(' ')}>
                        <AdminAside></AdminAside>
                        <AdminRequests data={data.requests} count={data.requestscount} page={page} setPage={setPage}></AdminRequests>
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

export default RequestsPage