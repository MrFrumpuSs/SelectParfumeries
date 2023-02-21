import styles from './Cart.module.scss'
import CartItem from './CartItem/CartItem'

const Cart = ({data, cart}) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th></th>
                    <th className={styles.row_title}>Название</th>
                    <th className={styles.row_title}>Кол-во</th>
                    <th className={styles.row_title}>Сумма</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item=>
                    <CartItem key={item.variations._id} cart={cart.find(e=> item.variations._id === e.variation)} data={item}></CartItem>
                )}
                
            </tbody>
            
        </table>
    )
}

export default Cart