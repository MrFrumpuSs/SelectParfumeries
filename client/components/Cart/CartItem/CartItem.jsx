import styles from './CartItem.module.scss'
import Image from 'next/image';
import Input from '../../UI/Input/Input';
import { setCount, removeFromCart } from '../../../reducers/cartReducer';
import { useDispatch } from 'react-redux';

const CartItem = ({data, cart}) => {
    const dispatch = useDispatch();
    const getPrice = () => {
        if(data.sale) {
            if(data.variations.sale) {
                return data.variations.sale * cart.count;
            }
            return data.variations.price * cart.count;
        }
        return data.variations.price * cart.count;
    }
    if(data.variations._id === cart?.variation) {
        return (
            <tr className={styles.tr}>
                <td className={styles.image_td}>
                    <div className={styles.image}><Image src={data.img[0]} layout='fill'></Image></div>
                </td>
                <td className={styles.name_td}>
                    <p className={styles.title}>{data.name}</p>
                    <p className={styles.quantity}>{data.variations.quantity} мл</p>
                </td>
                <td className={styles.quantity_td}>
                    <Input className={styles.quantity_inp} min='1' type='number' value={cart.count} onChange={e=> {e.target.value < 1 ? e.target.value = 1: null; dispatch(setCount({count: e.target.value, variation: cart.variation}))}}></Input>
                </td>
                <td className={styles.quantity_price}>
                    <p className={styles.price}>{getPrice() === 0 ? 'уточняется🤷🏻‍♂️' : getPrice().toLocaleString('ru') + ' ₽' }</p>
                </td>
                <td className={styles.quantity_delete}>
                    <a className={styles.delete} onClick={e=> dispatch(removeFromCart({variation: cart.variation}))}>Удалить</a>
                </td>
            </tr>
        )
    }
}

export default CartItem