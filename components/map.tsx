import Cell from './cell'
import styles from '../styles/map.module.css'

interface Props {
	cols: number,
	rows: number
}

export default function Map(props: Props) {
	const cells = []
	for (let col = 0; col < props.cols; col++) {
		for (let row = 0; row < props.rows; row++) {
			cells.push(<Cell key={`${col};${row}`} col={col} row={row} />)
		}
	}

	return (
		<div className={styles.map}
			style={{
				gridTemplateColumns: "auto ".repeat(props.cols),
				width: (50 + 5) * props.cols - 5
			}}
		>
			{cells}
		</div >
	)
}
