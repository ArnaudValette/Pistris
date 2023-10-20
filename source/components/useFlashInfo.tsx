import {Text} from 'ink'
import React, {PropsWithChildren, useEffect, useState} from 'react'
import {colorMap} from '../app.js'

export type BackFlashProps = {
	then: Function
	for: string
}
export function useFlashInfo({s}: {s: string}) {
	const [toggle, setToggle] = useState<boolean>(false)
	function flash(then?: Function) {
		setToggle(true)
		setTimeout(() => {
			setToggle(false)
			if (then) {
				then()
			}
		}, 500)
	}
	function Flasher({children}: PropsWithChildren): React.ReactElement {
		return (
			<>{toggle ? <Text color={colorMap.baseColor}>{s}</Text> : children}</>
		)
	}
	function BackFlash(b: BackFlashProps) {
		useEffect(() => {
			setTimeout(() => {
				b.then()
			}, 500)
		}, [])
		return <Text color={colorMap.baseColor}>{b.for}</Text>
	}
	return {flash, Flasher, BackFlash, toggle}
}
