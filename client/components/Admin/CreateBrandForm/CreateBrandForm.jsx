import styles from './CreateBrandForm.module.scss'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const CreateBrandForm = ({submitForm, fetchbrand, btnLock}) => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
 
    useEffect(() => {
        if(fetchbrand) {
            setValue("name", fetchbrand.name);
        }
    }, [ ])
    return (
        <form className={styles.register_form} onSubmit={handleSubmit(data => submitForm(data))}>   
            <Input placeholder="Название" className={styles.input} type="text" label="Название" name="name" errors={errors} field={register}
            validationSchema={
                {
                    required: "Поле должно быть заполнено"
                }
            }/>  
            <Button className={styles.button} disabled={btnLock}>Добавить бренд</Button>
        </form>
    )
}

export default CreateBrandForm