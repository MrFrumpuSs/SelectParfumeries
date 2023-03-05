import { useEffect } from 'react'
import styles from './CreateParfumForm.module.scss'
import Input from '../../UI/Input/Input'
import Textarea from '../../UI/Textarea/Textarea'
import Button from '../../UI/Button/Button'
import Select from '../../UI/Select/Select'
import { useForm, useFieldArray} from 'react-hook-form';

const CreateParfumForm = ({fetchbrands, fetchparfum, submitForm, btnLock}) => {
    const { register, watch, setValue, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            variations: [{ quantity: 0, price: 0 }],
            characteristics: [{ left: '', right: '' }]
        }
    });
    const watchShowSale = watch("sale", false);
    const { fields : variations, append: appendVariations, remove: removeVariations } = useFieldArray({
        control, 
        name: "variations",
    });

    const { fields : characteristics, append: appendCharacteristics, remove: removeCharacteristics } = useFieldArray({
        control, 
        name: "characteristics",
    });
    useEffect(() => {
        if(fetchparfum) {
            setValue("name", fetchparfum.name);
            setValue("description", fetchparfum.description);
            setValue("sex", fetchparfum.sex);
            setValue("brand", fetchparfum.brand?._id);
            setValue("variations", fetchparfum.variations);
            setValue("characteristics", fetchparfum.characteristics);
            setValue("raspiv", fetchparfum.raspiv);
        }
    }, [ ])
    
    return (
        <form className={styles.register_form} onSubmit={handleSubmit(data => submitForm(data))}>   
            <div className={styles.left}>
                <Input placeholder="Название" className={styles.input} type="text" label="Название" name="name" errors={errors} field={register}
                validationSchema={
                    {
                        required: "Поле должно быть заполнено"
                    }
                }
                />
                <Textarea className={styles.input} placeholder="Описание" label="Описание" name="description" errors={errors} field={register} 
                validationSchema={
                    {
                        required: "Поле должно быть заполнено",
                    }
                }></Textarea>

                <Input className={styles.input} type="file" placeholder="Изображение" label="Изображение" name="img" errors={errors} field={register} 
                validationSchema={
                    fetchparfum ? { required: false, } : { required: "Поле должно быть заполнено", }
                    
                }/>
            </div>
            <div className={styles.right}>
                <div className={styles.inputs_row}>
                    <Select className={styles.select} name="sex" field={register} options={[{title: 'Мужской', value: 'MAN'}, {title: 'Женский', value: 'WOMAN'}, {title: 'Унисекс', value: 'UNISEX'}]}></Select>
                    <Select className={styles.select} name="brand" field={register} options={fetchbrands}></Select>
                </div>
                

                {variations.map((field, index) => (
                    <div className={styles.inputs_row} key={field.id}>
                        <Input className={styles.input} type="text" placeholder="Объем (мл)" label="Объем (мл)" name={`variations.${index}.quantity`} errors={errors} field={register} 
                        validationSchema={
                            {
                                required: "Поле должно быть заполнено",
                            }
                        }/>
                        <Input className={styles.input} type="text" placeholder="Цена" label="Цена" name={`variations.${index}.price`} errors={errors} field={register} 
                            validationSchema={
                                {
                                    required: "Поле должно быть заполнено",
                                }
                        }/>
                        {watchShowSale &&
                            <Input className={styles.input} type="text" placeholder="Цена по скидке" label="Цена по скидке" name={`variations.${index}.sale`} errors={errors} field={register}/>
                        }
                        <Button type="button" className={styles.remove}  onClick={() => variations.length > 1 ? removeVariations(index) : null}>Удалить поле</Button>

                    </div>
                    
                ))}
                <Button type="button" className={styles.append} onClick={() => appendVariations({ quantity: 0, price: 0 })}>Добавить поле</Button>

                
                {characteristics.map((field, index) => (
                    <div className={styles.inputs_row} key={field.id}>
                        <Input className={styles.input} type="text" placeholder="Лево" label="Лево" name={`characteristics.${index}.left`} errors={errors} field={register} 
                        validationSchema={
                            {
                                required: "Поле должно быть заполнено",
                            }
                        }/>
                        <Input className={styles.input} type="text" placeholder="Право" label="Право" name={`characteristics.${index}.right`} errors={errors} field={register} 
                            validationSchema={
                                {
                                    required: "Поле должно быть заполнено",
                                }
                        }/>
                        <Button type="button" className={styles.remove}  onClick={() => characteristics.length > 1 ? removeCharacteristics(index) : null}>Удалить поле</Button>
                    </div>
                    
                ))}
                <Button type="button" className={styles.append} onClick={() => appendCharacteristics({ left: '', right: '' })}>Добавить поле</Button>
                <Input className={styles.input} type="checkbox" placeholder="Лево" label="Присутствуют скидочные вариации" name='sale' errors={errors} field={register} />
                <Input className={styles.input} type="checkbox" label="Распив" name='raspiv' errors={errors} field={register} />
              
            </div>
            <Button className={styles.button} disabled={btnLock}>Добавить</Button>
        </form>
    )
}

export default CreateParfumForm