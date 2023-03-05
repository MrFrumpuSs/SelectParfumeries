import Navbar from "../components/UI/Navbar/Navbar"
import Footer from "../components/UI/Footer/Footer"
import Info from "../components/Info/Info"
import Head from "next/head"

const DeliveryPage = () => {
    return (
        <>
            <Head>
                <title>Доставка - Select Parfumeries</title>
                <meta name="description" content="1. Доставка по г. Сочи: - При сумме заказа до 10.000₽ Стоимость доставки составит 300₽ - При сумме заказа от 10.000₽ Стоимость доставки составит 150₽" />
                <meta property="og:title" content='Доставка - Select Parfumeries' key="og-title"/>
                <meta property="og:description" content="1. Доставка по г. Сочи: - При сумме заказа до 10.000₽ Стоимость доставки составит 300₽ - При сумме заказа от 10.000₽ Стоимость доставки составит 150₽" key="og-description"/>
            </Head>
            <Navbar></Navbar>
            <Info title="Доставка">
            <p>
                1. Доставка по г. Сочи:<br/>
                - При сумме заказа до 10.000₽<br/>
                Стоимость доставки составит 300₽<br/>
                - При сумме заказа от 10.000₽<br/>
                Стоимость доставки составит 150₽<br/>
            </p>
            <p>
                2. Курьерская доставка в другие регионы РФ:<br/>
                - Доставка при помощи транспортной компании удобный и быстрый способ доставки в крупные города России. Сроки доставки и стоимость можно рассчитать на сайте компании СДЭК самостоятельно, либо это сделает наш менеджер после оформления заказа. Все заказы осуществляются по полной предоплате.
            </p>
            </Info>
            <Footer></Footer>
        </>
    )
}

export default DeliveryPage