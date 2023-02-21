import styles from './Info.module.scss'

const Info = ({title, children}) => {
    return (
        <div className={styles.info}>
            <div className={[styles.inner, 'container'].join(' ')}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Info