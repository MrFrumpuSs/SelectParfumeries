import styles from './Search.module.scss'
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Search = ({className, setSearch}) => {
    const router = useRouter();
    const [s, setS] = useState('');
    const Search = () => {
        setSearch(false);
        router.push({pathname: '/catalog', query: { s: s }});
    }
    return (
        <div className={[styles.search, className].join(' ')} onClick={e=> setSearch(false)}>
            <div className={styles.inner} onClick={e => e.stopPropagation()}>
                <Input className={styles.input} value={s} onChange={e=> setS(e.target.value)} type="text" placeholder="Поиск..."></Input>
                <Button className={styles.button} onClick={e=> Search()}>Найти</Button>
            </div>
        </div>
    );
}

export default Search;
