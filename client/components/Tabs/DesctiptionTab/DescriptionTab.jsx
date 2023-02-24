import styles from './DescriptionTab.module.scss'

const DescriptionTab = ({data}) => {
    return (
        <>
            <p itemprop={data.itemprop} className={styles.description}>{data.description}</p>
            <p className={styles.characteristics_title}>Характеристики</p>
            <div className={styles.characteristics}>
                {data.characteristics.map(item=>
                    <div key={item._id} className={styles.row}>
                        <p className={styles.cell}>{item.left}</p>
                        <p className={styles.cell}>{item.right}</p>
                    </div>    
                )}
            </div>
        </>
    )
}

export default DescriptionTab