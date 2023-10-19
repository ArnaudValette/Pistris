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
	let stack = useRef<number[]>([0])
	function jump(n?: number, c?: boolean) {
		if (c && n) {
			stack.current.push(state + n)
			setState(x => x + n)
		} else {
			inc()
		}
	}
	function inc() {
		stack.current.push(state + 1)
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
		if (stack.current.length > 1) {
			const target = stack.current[stack.current.length - 2] as number
			stack.current.splice(stack.current.length - 1, 1)
			setState(target)
		}
	}
	return {state, jump, incOrCommit, back}
}
