import styles from '../styles/cell.module.css'
import Tank from './tank'

interface Props {
	col: number,
	row: number,
	hasTank: boolean
}

export default function Cell(props: Props) {
	return (
		<div className={styles.cell}>
			{props.hasTank
				? <Tank />
				: <p>{props.col};{props.row}</p>
			}
		</div>
	)
}