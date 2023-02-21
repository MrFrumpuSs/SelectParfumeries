import Navbar from "../components/UI/Navbar/Navbar"
import Footer from "../components/UI/Footer/Footer"
import Info from "../components/Info/Info"
import styles from "../styles/contacts.module.scss"

const DeliveryPage = () => {
    return (
        <>
            <Navbar></Navbar>
            <Info title="Контакты">
                <p>Select Parfumeries — это возможность приобрести ароматы по приятным ценам как целиком (под заказ), так и на распив от 5 мл.</p>
                <p>Мы работаем исключительно с оригинальной продукцией!</p>
                <p>Любой человек сможет позволить себе разнообразие ароматов благодаря Select Parfumeries.</p>
                <p>Наша миссия подарить возможность каждому ощутить на себе ароматы мировых брендов.</p>
                <p>Телефон:</p>
                <a href="tel:+79166419772">+79166419772</a>
                <a href="tel:+79167236237">+79167236237</a>
                <a href="mailto:select.parfums@yandex.ru">select.parfums@yandex.ru</a>
                <iframe className={styles.map} src="https://yandex.ru/map-widget/v1/?um=constructor%3A71c44f6be37261c8694f21c74bb3d97cb1c6a3f0f4066628ee03017213be6bc0&amp;source=constructor" frameBorder="0"></iframe>
            </Info>
            <Footer></Footer>
        </>
    )
}

export default DeliveryPage