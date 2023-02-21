import styles from './Variation.module.scss'
import { v4 as uuidv4 } from 'uuid';

const Variation = ({quantity, value, ...props}) => {
    const id = uuidv4();
    return (
        <div className={styles.variation}>
            <input type="radio" id={id} value={value} {...props} />
            <label htmlFor={id}>{quantity}</label>
        </div>
    )
}

export default Variation