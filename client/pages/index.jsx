import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer';
import Navbar from '../components/UI/Navbar/Navbar';
import Banner from '../components/Banner/Banner';
import BannerService from '../API/BannerService';
import ParfumService from '../API/ParfumService';
import ProductLine from '../components/ProductLine/ProductLine';
import BrandLine from '../components/BrandLine/BrandLine';
import Footer from '../components/UI/Footer/Footer';
import styles from '../styles/index.module.scss'

const Index = ({ fetchbanner, fetchnews, fetchBestsales, fetchBrandline, fetchBestdiscount }) => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();
    return (
        <>
            <Navbar></Navbar>
            <Banner data={fetchbanner.banners} ></Banner>
            <ProductLine data={fetchnews} title="Новинки" href={'/catalog'} className={styles.line}></ProductLine>
            <ProductLine data={fetchBestsales} title="Бестселлеры" href={'/catalog?sort=popular'}></ProductLine>
            <BrandLine data={fetchBrandline}></BrandLine>
            <ProductLine data={fetchBestdiscount} title="Распродажа" href={'/catalog?sale=true'}></ProductLine>
            <Footer></Footer>
        </>
    );
    
}

export async function getServerSideProps() {
    const banner = await BannerService.getAll();
    let fetchbanner = banner.data;

    const news = await ParfumService.getAll({limit: 4, sort: '_id'});
    let fetchnews = news.data.parfums;

    const bestsales = await ParfumService.getAll({limit: 4, sort: 'sales'});
    let fetchBestsales = bestsales.data.parfums;

    const brandline = await ParfumService.getAll({limit: 3, brandId: '63d6c6f45c583121fe7fe250'});
    let fetchBrandline = brandline.data.parfums;

    const bestdiscount = await ParfumService.getAll({limit: 4, sale: true});
    let fetchBestdiscount = bestdiscount.data.parfums;

    return { props: { fetchbanner, fetchnews, fetchBestsales, fetchBrandline, fetchBestdiscount } }
}

export default Index;
