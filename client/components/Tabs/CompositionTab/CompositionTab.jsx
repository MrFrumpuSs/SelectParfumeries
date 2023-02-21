import styles from './Composition.module.scss'

const CompositionTab = ({data}) => {
    return (
        <p className={styles.composition}>
            {data}
        </p>
    )
}

export default CompositionTab