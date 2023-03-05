import Navbar from "../../../components/UI/Navbar/Navbar"
import Footer from "../../../components/UI/Footer/Footer"
import ParfumService from "../../../API/ParfumService"
import BrandService from "../../../API/BrandService"
import Catalog from "../../../components/Catalog/Catalog"
import { useRouter } from 'next/router'
import Head from "next/head"

const СatalogPage = ({fetchparfums, parfumscount, fetchbrands, page, breadCrumbsItems}) => {
    const router = useRouter();
    const setPage = (page, pathquery) => {
        router.push({ pathname: '/catalog/page/'+ page, query: { ...pathquery } }  );
    }
    return (
        <>
            <Head>
                <title>Каталог - Select Parfumeries</title>
                <meta property="og:title" content='Каталог - Select Parfumeries' key="og-title"/>
            </Head>
            <Navbar></Navbar>
            <Catalog setPage={setPage} page={page} data={fetchparfums} brands={fetchbrands} count={parfumscount} breadCrumbsItems={breadCrumbsItems}></Catalog>
            <Footer></Footer>
        </>
    )
}

export async function getServerSideProps(context) {
    
    const page = context.params.page;
    
    const {brandId, sale, raspiv, s, price, sort} = context.query;
    let payload = {limit: 20, page: page, sort: '_id'};
    if(brandId) {
        payload["brandId"] = brandId;
    }
    if(sale) {
        payload["sale"] = sale;
    }
    if(s) {
        payload["s"] = s;
    }
    if(raspiv) {
        payload["raspiv"] = true;
    } else {
        payload["raspiv"] = 'undefined';
    }
    if(price) {
        payload["price"] = price;
    }
    if(sort) {
        switch (sort) {
            case 'price_desc':
                payload["sort"] = 'price';
                payload["order"] = 'desc';
                break;
            case 'price':
                payload["sort"] = 'price';
                payload["order"] = 'asc';
                break;
            case 'popular':
                payload["sort"] = 'sales';
                payload["order"] = 'desc';
                break;
            default:
                break;
        }   
    }
    let breadCrumbsItems = [
        {title: 'Главная', path: '/'},
        {title: 'Каталог'}
    ];

    const parfums = await ParfumService.getAll(payload);
    let fetchparfums = parfums.data.parfums;
    let parfumscount = parfums.data.count;

    const brands = await BrandService.getAll();
    let fetchbrands = brands.data.brands;

    return { props: { fetchparfums, parfumscount, fetchbrands, page, breadCrumbsItems } }
}

export default СatalogPage