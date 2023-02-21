import { useState } from 'react'
import styles from './Catalog.module.scss'
import stylesproduct from '../Product/Product.module.scss'
import Product from '../Product/Product'
import Pagination from '../Pagination/Pagination'
import { getPageCount } from '../../utils/pages'
import Link from 'next/link'
import { useRouter } from 'next/router'
import url from 'url';
import Input from '../UI/Input/Input'
import debounce from "lodash.debounce";
import Breadcrumbs from '../UI/Breadcrumbs/Breadcrumbs'
import Select from '../UI/Select/Select'
import { IoIosArrowDown } from "react-icons/io";

const Catalog = ({data, brands, count, setPage, page, breadCrumbsItems}) => {
    const router = useRouter()
    page = page || 1;
    const pageCount = getPageCount(count, 20);
    const [sort, setSort] = useState(router.query.sort)
    const [allBrands, setAllBrands] = useState(false);
    const [filterActive, setFilterActive] = useState(false);

    const [price, setPrice] = useState(
        {gt: null, lt: null}
    )

    const changePage = (page) => {
        setPage(page, pathquery);
    }
    const path = url.parse(router.asPath).pathname;
    let pathquery = router.query;
    let sex = router.query.sex;
    delete pathquery.page;
    delete pathquery.sex;

    const sortProducts = (sort) => {
        setSort(sort);
        router.push({ pathname: path, query: { ...pathquery, sort: sort } }  );
    }

    const changePrice = (gt, lt) => {
        setPrice({gt: gt, lt: lt});
        let fprice = null;
        if (lt === '' && gt === ''){
            fprice = null;
        }
        else if(gt === null || gt === '') {
            fprice = 0 + '-' + lt;
        } 
        else if(lt === null || lt === '') {
            fprice = gt;
        }
        else {
            fprice = gt + '-' + lt;
        }
        router.push({ pathname: path, query: { ...pathquery, price: fprice } });
    }

    const brandClasses = (e) => {
        let classes = [styles.block_li];
        if(e > 10 && !allBrands) {
            classes.push(styles.hidden)
        }
        return classes.join(' ');
    }
    return (
        <section className={styles.catalog}>
            <div className={[styles.top_menu, 'container'].join(' ')}>
                <Breadcrumbs className={styles.breadcrumbs} data={breadCrumbsItems}></Breadcrumbs>
                <Select value={sort} onChange={e=> sortProducts(e.target.value)} options={[{title: 'По умолчанию', value: ''}, {title: 'По убыванию цены', value: 'price_desc'}, {title: 'По возрастанию цены', value: 'price'}, {title: 'По популярности', value: 'popular'}]}></Select>
            </div>
            <div className={[styles.inner, 'container'].join(' ')}>
                <aside className={styles.sidebar}>
                    <a className={styles.filter} onClick={e=> {filterActive ? setFilterActive(false) : setFilterActive(true)}}>Фильтр по товарам <IoIosArrowDown/></a>
                    <div className={filterActive ? [ styles.sidebar_inner, styles.active].join(' ') :  styles.sidebar_inner}>
                        <div className={styles.block}>
                            <h3 className={styles.block_title}>Тип</h3>
                            <ul className={styles.block_ul}>
                                <li className={sex === undefined ? [styles.block_li, styles.active].join(' ') : styles.block_li}><Link href={'/catalog'}><a>Все</a></Link></li>
                                <li className={sex === 'woman' ? [styles.block_li, styles.active].join(' ') : styles.block_li} ><Link href={'/catalog/woman'}><a>Женская</a></Link></li>
                                <li className={sex === 'man' ? [styles.block_li, styles.active].join(' ') : styles.block_li}><Link href={'/catalog/man'}><a>Мужская</a></Link></li>
                                <li className={sex === 'unisex' ? [styles.block_li, styles.active].join(' ') : styles.block_li}><Link href={'/catalog/unisex'}><a>Унисекс</a></Link></li>
                            </ul>
                        </div>
                        <div className={styles.block}>
                            <h3 className={styles.block_title}>Бренд</h3>
                            <ul className={styles.block_ul}>
                                <li className={router.query.brandId === '' ? [styles.block_li, styles.active].join(' ') : styles.block_li}><Link href={{ pathname: path, query: { ...pathquery, brandId: null } }}><a>Все</a></Link></li>
                                {brands.map((brand, index)=>
                                    <li key={brand._id} className={router.query.brandId === brand._id ? [brandClasses(index), styles.active].join(' ') : brandClasses(index)}><Link href={{ pathname: path, query: { ...pathquery, brandId: brand._id } }}><a>{brand.name}</a></Link></li>
                                )}
                                <a onClick={e=> {allBrands ? setAllBrands(false) : setAllBrands(true)}} className={styles.showmore}>{allBrands ? 'Показать меньше' : 'Показать все'}</a>
                            </ul>
                        </div>
                        <div className={styles.block}>
                            <h3 className={styles.block_title}>Цена</h3>
                            <ul className={styles.block_inputs}>
                                <Input className={styles.block_input} type='number' label='от' onChange={debounce(e=>changePrice(e.target.value, price.lt), 1000)}></Input>
                                <Input className={styles.block_input} type='number' label='до' onChange={debounce(e=>changePrice(price.gt, e.target.value), 1000)}></Input>
                            </ul>
                        </div>
                        <div className={styles.block}>
                            <h3 className={styles.block_title}>Акция</h3>
                            <ul className={styles.block_ul}>
                                <li className={router.query.sale === '' ? [styles.block_li, styles.active].join(' ') : styles.block_li} ><Link href={{ pathname: path, query: { ...pathquery, sale: null } }}><a>Все</a></Link></li>
                                <li className={router.query.sale === 'true' ? [styles.block_li, styles.active].join(' ') : styles.block_li}><Link href={{ pathname: path, query: { ...pathquery, sale: true } }}><a>Есть</a></Link></li>
                                <li className={router.query.sale === 'false' ? [styles.block_li, styles.active].join(' ') : styles.block_li}><Link href={{ pathname: path, query: { ...pathquery, sale: false } }}><a>Нет</a></Link></li>
                            </ul>
                        </div>
                    </div>
                </aside>
                <div className={styles.main}>
                    <div className={styles.flex}>
                        {data.length === 0 &&
                            <p>Товаров не найдено</p>
                        }
                        {data.map(product=>
                            <Product className={[styles.product, stylesproduct.catalog_v].join(' ')} key={product._id} data={product}></Product>    
                        )}
                    </div>
                    {data.length !== 0 &&
                        <Pagination totalPages={pageCount} page={+page} implement={2} changePage={changePage}></Pagination>
                    }
                </div>
                
            </div>
        </section>
    )
}

export default Catalog