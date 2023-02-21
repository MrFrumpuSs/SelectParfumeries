import styles from './ProductLine.module.scss'
import Product from '../Product/Product'
import Link from 'next/link'

const ProductLine = ({data, title, href, className}) => {
    if(data.length > 0) {
        return (
            <section className={[styles.line, className].join(' ')}>
                <div className={[styles.inner, 'container'].join(' ')}>
                    <Link href={href}><a><h2 className={styles.title}>{title}</h2></a></Link>
                    <div className={styles.flex}>
                        {data.map(product=>
                            <Product className={styles.product} key={product._id} data={product}></Product>    
                        )}
                    </div>
                </div>
            </section>
        )
    }
}

export default ProductLine