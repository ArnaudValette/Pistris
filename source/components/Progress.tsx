import React, {Fragment} from 'react'

export type ProgressProps = {state: number; elements: Array<React.JSX.Element>}

export function Progress({state, elements}: ProgressProps) {
	const E = elements[state] || Fragment
	return <>{E}</>
}
