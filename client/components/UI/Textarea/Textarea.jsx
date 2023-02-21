import uniqueId from '../../../utils/uniqueid';
import styles from './Textarea.module.scss'
import { motion } from "framer-motion"

const Textarea = ({label, placeholder, className, name, field, validationSchema, errors, ...props}) => {
	let id = uniqueId();
	let fieldF = '';
	if(field) {
		fieldF = {...field(name, validationSchema)};
	} else {
		fieldF = ''
	}
	return (
		<>
			<div className={field && errors[name] ? [styles.textarea_box, styles.textarea_error, className].join(' ') : [styles.textarea_box, className].join(' ')}>
				<label className={styles.label} htmlFor={id}>{label}</label>
				<textarea className={styles.textarea} id={id} placeholder={placeholder} name={name} {...fieldF} {...props}></textarea>
				{field && errors[name] &&
				<motion.p className={styles.error} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
					{errors[name].message}
				</motion.p>
				
				}
			</div>
			
		</>
		
		
	);
};

export default Textarea;