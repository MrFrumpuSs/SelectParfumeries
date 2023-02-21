import uniqueId from '../../../utils/uniqueid';
import styles from './Select.module.scss'
import { motion } from "framer-motion"

const Select = ({className, options, name, field, ...props}) => {
	let id = uniqueId();
	let fieldF = '';
	if(field) {
		fieldF = {...field(name)};
	} else {
		fieldF = ''
	}
	return (
		<>
			<div className={[styles.select_box, className].join(' ')}>
				<select id={id} className={styles.select} name={name} {...fieldF} {...props}>
					{
						options.map(option=>
							<option key={option.value} value={option.value}>{option.title}</option>
						)
					}
				</select>
			</div>
		</>
		
		
	);
};

export default Select;