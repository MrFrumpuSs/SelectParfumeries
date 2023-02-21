import styles from './Breadcrumbs.module.scss'
import Link from 'next/link'

const BreadcrumbsItem = ({path, children, length, index}) => {
    return (
        <>
            {path
            ?
                <Link href={path}><a className={[styles.item, styles.link].join(' ')}>{children}</a></Link>
            :
                <a className={styles.item}>{children}</a>
            }
            {index !== length &&
                <div className={styles.devider}> / </div>
            }
        </>
        
    )
}

export default BreadcrumbsItem