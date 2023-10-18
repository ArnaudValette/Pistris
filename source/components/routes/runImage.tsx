import React, {useState} from 'react'
import {ImgSubProps} from './Image.js'
import {Box, Text} from 'ink'
import TextInput from 'ink-text-input'
import {inputFieldModeMap} from '../keybindings/keybindings.js'

//@ts-ignore
export function RunImg({sel}: ImgSubProps) {
	const [host, setHost] = useState<string>('')
	const [local, setLocal] = useState<string>('')
	//@ts-ignore
	const [t, setT] = useState<boolean>(false)
	//@ts-ignore
	const [i, setI] = useState<boolean>(false)
	//console.log(sel)
	const [state, setState] = useState(0)
	function inc() {
		setState(s => s + 1)
	}
	//@ts-ignore
	function add(setter, value) {
		if (/^[0-9]*$/.test(value) && value.length <= 5) {
			setter(value)
		}
	}
	return (
		<Box justifyContent="center">
			{state === 0 ? (
				<Port
					name={'Host'}
					setter={s => add(setHost, s)}
					value={host}
					progress={inc}
				/>
			) : state === 1 ? (
				<Port
					name={'Client'}
					setter={s => add(setLocal, s)}
					value={local}
					progress={inc}
				/>
			) : (
				<Options setT={setT} setI={setI} progress={inc} />
			)}
		</Box>
	)
}

type PortProps = {
	setter: (s: string) => void
	value: string
	progress: Function
	name: string
}
type OptionsProps = {setT: Function; setI: Function; progress: Function}

function Port({setter, value, name, progress}: PortProps) {
	inputFieldModeMap({accept: () => progress()})
	return (
		<Box justifyContent="center" flexDirection="column">
			<Text>
				<Text bold>{name}</Text> port{' '}
				<Text color={'blue'}>
					(enter to skip, defaulted to <Text italic>3000</Text>)
				</Text>
				:
			</Text>
			<Box justifyContent="center" borderStyle={'single'} minWidth={50}>
				<TextInput value={value} onChange={setter} />
			</Box>
		</Box>
	)
}

//@ts-ignore
function Options({setT, setI}: OptionsProps) {
	return <Box></Box>
}
