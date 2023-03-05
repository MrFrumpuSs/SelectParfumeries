import styles from './CreateBannerForm.module.scss'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const CreateBannerForm = ({submitForm, fetchbanner, btnLock}) => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if(fetchbanner) {
            setValue("title", fetchbanner.title);
            setValue("description", fetchbanner.description);
            setValue("btnname", fetchbanner.btnname);
            setValue("link", fetchbanner.link);
            setValue("white", fetchbanner.white);
        }
    }, [ ])
    return (
        <form className={styles.register_form} onSubmit={handleSubmit(data => submitForm(data))}>   
            <Input placeholder="Заголовок" className={styles.input} type="text" label="Заголовок" name="title" errors={errors} field={register}
            validationSchema={
                {
                    required: "Поле должно быть заполнено"
                }
            }/>
            <Input placeholder="Подзаголовок" className={styles.input} type="text" label="Подзаголовок" name="description" errors={errors} field={register}
            validationSchema={
                {
                    required: "Поле должно быть заполнено"
                }
            }/>
            <Input placeholder="Название кнопки" className={styles.input} type="text" label="Название кнопки" name="btnname" errors={errors} field={register}
            validationSchema={
                {
                    required: "Поле должно быть заполнено"
                }
            }/>
            <Input placeholder="Ссылка" className={styles.input} type="text" label="Ссылка" name="link" errors={errors} field={register}
            validationSchema={
                {
                    required: "Поле должно быть заполнено"
                }
            }/>
            <Input className={styles.input} type="file" placeholder="Изображение" label="Изображение" name="img" errors={errors} field={register} 
                validationSchema={
                    fetchbanner ? { required: false, } : { required: "Поле должно быть заполнено", }
            }/>
            <Input className={styles.input} type="checkbox" label="Белый текст" name='white' errors={errors} field={register} />
            <Button className={styles.button} disabled={btnLock}>Редактировать баннер</Button>
        </form>
    )
}

export default CreateBannerForm