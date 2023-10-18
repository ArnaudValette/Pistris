import React, {useState} from 'react'
import {ImgSubProps} from './Image.js'
import {Box, Text} from 'ink'

export function RunImg({sel}: ImgSubProps) {
	const [host, setHost] = useState<string | null>(null)
	const [local, setLocal] = useState<string | null>(null)
	const [t, setT] = useState<boolean>(false)
	const [i, setI] = useState<boolean>(false)
	return (
		<Box>
			{!host ? (
				<Port setter={setHost} value={host} />
			) : !local ? (
				<Port setter={setLocal} value={local} />
			) : (
				<Options setT={setT} setI={setI} />
			)}
		</Box>
	)
}

type PortProps = {setter: Function; value: string | null}
type Options = {setT: Function; setI: Function}

function Port({setter, value}: PortProps) {
	return <Box></Box>
}

function Options({setT, setI}: OptionsProps) {
	return <Box></Box>
}
