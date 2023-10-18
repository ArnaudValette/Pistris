import {Text} from 'ink'
import React, {PropsWithChildren, useState} from 'react'

export function useFlashInfo({s}: {s: string}) {
	const [toggle, setToggle] = useState<boolean>(false)
	function flash() {
		setToggle(true)
		setTimeout(() => setToggle(false), 500)
	}
	function Flasher({children}: PropsWithChildren): React.ReactElement {
		return <>{toggle ? <Text>{s}</Text> : children}</>
	}
	return {flash, Flasher}
}
