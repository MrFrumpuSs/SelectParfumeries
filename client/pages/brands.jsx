import styles from '../styles/brands.module.scss'
import Navbar from '../components/UI/Navbar/Navbar'
import Footer from '../components/UI/Footer/Footer'
import BrandService from '../API/BrandService'
import Link from 'next/link'
import Breadcrumbs from '../components/UI/Breadcrumbs/Breadcrumbs'

const BrandsPage = ({ fetchbrands, breadCrumbsItems }) => {
    fetchbrands.sort(function(a,b){
        return a.name.localeCompare(b.name);
    })
    let firstChars = fetchbrands.map(n => n.name[0].toUpperCase())
    
    firstChars = firstChars.filter(function(item, pos) {
        return firstChars.indexOf(item) == pos;
    })

    return (
        <>
            <Navbar></Navbar>
            <section className={styles.brands}>
                <Breadcrumbs className={[styles.breadcrumbs, 'container'].join(' ')} data={breadCrumbsItems}></Breadcrumbs>
                <div className={[styles.inner, 'container'].join(' ')}>
                    {
                        firstChars.map((char, index)=>
                            <div key={index} className={styles.block}>
                                <h1 className={styles.title}>{char}</h1>
                                {
                                    fetchbrands.map(e =>
                                        <div className={styles.brands_list} key={e._id}>
                                            { e.name[0].toUpperCase() === char &&
                                                <Link href={'/catalog?brandId=' + e._id}><a>{e.name}</a></Link>
                                            }
                                        </div> 
                                        
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}

export async function getServerSideProps() {

    const brands = await BrandService.getAll();
    let fetchbrands = brands.data.brands;

    let breadCrumbsItems = [
        {title: 'Главная', path: '/'},
        {title: 'Бренды'}
    ];
    

    return { props: { fetchbrands, breadCrumbsItems } }
}

export default BrandsPage