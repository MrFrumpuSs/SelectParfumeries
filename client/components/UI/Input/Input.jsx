import uniqueId from '../../../utils/uniqueid';
import styles from './Input.module.scss'
import { motion } from "framer-motion"

const Input = ({label, placeholder, type, className, name, field, validationSchema, errors, ...props}) => {
	let id = uniqueId();
	let fieldF = '';
	if(field) {
		fieldF = {...field(name, validationSchema)};
	} else {
		fieldF = ''
	}
	return (
		<>
			<div className={field && errors[name] ? [styles.input_box, styles.input_error, className].join(' ') : [styles.input_box, className].join(' ')}>
				{type !== 'checkbox'
				?
					<>
						{label ? <label className={styles.label} htmlFor={id}>{label}</label> : null}
						<input className={styles.input} id={id} type={type} placeholder={placeholder} name={name} {...fieldF} {...props}/>
					</>
				:
					<>
						<input className={styles.input_cb} id={id} type={type} placeholder={placeholder} name={name} {...fieldF} {...props}/>
						<label className={styles.label_cb} htmlFor={id}>{label}</label>
					</>
				}
				
				
				{field && errors[name] &&
				<motion.p className={styles.error} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
					{errors[name].message}
				</motion.p>
				
				}
			</div>
			
		</>
		
		
	);
};

export default Input;