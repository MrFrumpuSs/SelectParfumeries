import styles from './Product.module.scss';
import Image from 'next/image'
import Link from 'next/link'

const Product = ({data, horizontal, className}) => {
    return (
        <Link href={'/product/' + data._id}>
            <a itemScope itemType="http://schema.org/Product" className={horizontal ? [styles.product, styles.horizontal, className].join(' ') : [styles.product, className].join(' ')}>
                <div className={styles.product_inner}>
                    <div itemProp="image" className={styles.img}><Image loading="lazy" alt={'product_' + data._id} src={data.img[0]} layout="fill"></Image></div>
                    <div className={styles.content}>
                        <h3 itemProp="name" className={styles.title}>{data.name}</h3>
                        {data.variations[0].price === 0 
                        ?
                        <div itemProp="price" className={styles.price_box}>
                            <p className={styles.price}>Цена по запросу</p>      
                        </div>
                        :
                        <div itemProp="price" className={styles.price_box}>
                            {data.sale && data.variations[0].sale ?
                                <>
                                    <p className={styles.sale_price}>{data.variations[0].price} ₽</p>
                                    <p className={styles.price}>{data.variations.length > 1 ? 'от ' + data.variations[0].sale + ' ₽' : data.variations[0].sale + ' ₽'}</p>
                                </>
                                :
                                <>
                                    <p className={styles.price}>{data.variations.length > 1 ? 'от ' + data.variations[0].price + ' ₽' : data.variations[0].price + ' ₽'}</p>
                                </>
                            }       
                        </div>
                        }
                        
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default Product