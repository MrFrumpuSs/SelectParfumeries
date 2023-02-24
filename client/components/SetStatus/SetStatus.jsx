import Select from "../UI/Select/Select";
import { useState } from "react";
import styles from './SetStatus.module.scss'

const SetStatus = ({_id, status, setStatus, className }) => {
    const [statusVal, setStatusVal] = useState(status)
    let statusClass;
    switch (statusVal) {
        case 'pending':
            statusClass = styles.pending;
            break;
        case 'processing':
            statusClass = styles.processing;
            break;
        case 'done':
            statusClass = styles.done;
            break;
        default:
            break;
    }
    return (
        <Select className={[className, statusClass].join(' ')} value={statusVal} onChange={e=> {setStatusVal(e.target.value); setStatus(_id, e.target.value);}} name="status" options={[{title: 'Не обработан', value: 'pending'}, {title: 'В обработке', value: 'processing'}, {title: 'Завершен', value: 'done'}]}></Select>
    )
}

export default SetStatus