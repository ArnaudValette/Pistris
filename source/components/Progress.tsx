import React, {Fragment, useRef, useState} from 'react'

export type ProgressProps = {
	state: number
	elements: Array<React.JSX.Element>
}

export function Progress({state, elements}: ProgressProps) {
	const E = elements[state] || Fragment
	return <>{E}</>
}

export function useProgress() {
	const [state, setState] = useState<number>(0)
	let previousOkayPosition = useRef<number[]>([])
	function jump(n?: number, c?: boolean) {
		if (c && n) {
			previousOkayPosition.current.push(state)
			setState(x => x + n)
		} else {
			inc(n)
		}
	}
	function inc(n?: number) {
		// if some args is passed to inc,
		// it means the current position is an okay one
		if (n) {
			previousOkayPosition.current.push(state)
		}
		setState(x => x + 1)
	}
	function incOrCommit(commitFunction?: Function, c?: boolean) {
		if (commitFunction && c) {
			commitFunction()
		} else {
			inc()
		}
	}
	function back() {
		setState(
			previousOkayPosition.current[
				previousOkayPosition.current.length - 1
			] as number,
		)
		previousOkayPosition.current.splice(
			previousOkayPosition.current.length - 1,
			1,
		)
	}
	return {state, jump, incOrCommit, back}
}
