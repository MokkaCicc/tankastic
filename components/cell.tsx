import styles from '../styles/cell.module.css'

interface Props {
	col: number,
	row: number
}

export default function Cell(props: Props) {
	return (
		<div className={styles.cell}>
			<p>{props.col};{props.row}</p>
		</div>
	)
}