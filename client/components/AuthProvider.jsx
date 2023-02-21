import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import { getCart } from '../reducers/cartReducer';
import { useRouter } from 'next/router';
import AuthService from '../API/AuthService';

const AuthProvider = ({ Component, pageProps }) => {
    const [loading, setLoading] = useState(true);
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(()=>{
        const fetchAuth = async () => {
            const response = await AuthService.auth();
            if(!response.data?.error) {
                dispatch(setUser(response.data.user));
            }
            dispatch(getCart());
            setLoading(false);
        }
        fetchAuth();
    }, [])
    if(!loading) {
        return(
            <Component {...pageProps} />
        ) 
    }
    
}

export default AuthProvider