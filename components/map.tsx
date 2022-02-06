import Cell from './cell'
import styles from '../styles/map.module.css'
import { Tank } from '@prisma/client'

interface Props {
	cols: number,
	rows: number,
	tanks: Tank[]
}

export default function Map(props: Props) {
	const cells = []
	for (let row = 0; row < props.rows; row++) {
		for (let col = 0; col < props.cols; col++) {
			const hasTank = tankExist(props.tanks, col, row)
			cells.push(<Cell key={`${col};${row}`} col={col} row={row} hasTank={hasTank} />)
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

function tankExist(tanks: Tank[], x: number, y: number) {
	for (const tank of tanks) {
		if (tank.x === x && tank.y === y) return true
	}
	return false
}