import React, {Fragment, useState} from 'react'

export type ProgressProps = {state: number; elements: Array<React.JSX.Element>}

export function Progress({state, elements}: ProgressProps) {
	const E = elements[state] || Fragment
	return <>{E}</>
}

export function useProgress() {
	const [state, setState] = useState<number>(0)
	function jump(n?: number, c?: boolean) {
		if (c && n) {
			setState(x => x + n)
		} else {
			inc()
		}
	}
	function inc() {
		setState(x => x + 1)
	}
	return {state, jump}
}
