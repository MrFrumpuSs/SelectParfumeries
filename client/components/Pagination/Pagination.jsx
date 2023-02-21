import React from 'react';
import styles from './Pagination.module.scss'
import { getPagesArray } from '../../utils/pages';

const Pagination = ({totalPages, page, implement, changePage, className}) => {
    let pagesArray = getPagesArray(totalPages, page, implement);
    return (
        <div className={[styles.pagination, className].join(' ')}>
            <div className={styles.pagination_inner}>
                {pagesArray[1] &&
                    <span className={styles.page} key={1} onClick={e=> changePage(1)}>1</span>
                }
                {pagesArray[1] &&
                    <span className={[styles.page, styles.separator].join(' ')}>...</span>
                }
                {
                    pagesArray[0].map(p =>
                        <span className={page === p  ? [styles.page, styles.active].join(' ') : styles.page} onClick={e=> changePage(p)} key={p}>{p}</span>      
                    )
                }
                {pagesArray[2] &&
                    <span className={[styles.page, styles.separator].join(' ')}>...</span>
                }
                {pagesArray[2] &&
                    <span className={styles.page} onClick={e=> changePage(totalPages)} key={totalPages}>{totalPages}</span>
                }
            </div>
        </div>
    );
}

export default Pagination;
