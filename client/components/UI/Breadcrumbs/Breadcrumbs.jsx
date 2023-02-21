import styles from './Breadcrumbs.module.scss';
import BreadcrumbsItem from './BreadcrumbsItem';

const Breadcrumbs = ({data, className}) => {
    return (
        <div className={[styles.breadcrumbs, className].join(' ')}>
            {
                data.map((item, index)=>
                    <BreadcrumbsItem key={index} length={data.length} index={index+1} path={item.path}>{item.title}</BreadcrumbsItem>
                )
            }
            <BreadcrumbsItem></BreadcrumbsItem>
        </div>
    )
}

export default Breadcrumbs