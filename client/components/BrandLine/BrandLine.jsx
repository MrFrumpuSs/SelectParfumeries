import styles from './BrandLine.module.scss'
import Product from '../Product/Product'
import Image from 'next/image'
import Link from 'next/link'
import { BsArrowRight } from "react-icons/bs";

const BrandLine = ({data}) => {
    return (
        <section className={styles.line}>
            <div className={[styles.inner, 'container'].join(' ')}>
                <div className={styles.flex}>
                    {data.map(product=>
                        <Product key={product._id} horizontal data={product}></Product>    
                    )}
                </div>
                <Link href={'/catalog?brandId=' + data[0]?.brand?._id}>
                    <a className={styles.brand}>
                        <div className={styles.text}>
                            <h2 className={styles.title}>{data[0]?.brand?.name}</h2>
                            <p className={styles.gobrand}>Перейти к бренду<BsArrowRight/></p>
                        </div>
                        <div className={styles.image}><Image src={data[0]?.img[0]} layout="fill"></Image></div>
                    </a>
                </Link>
            </div>
        </section>
    )
}

export default BrandLine