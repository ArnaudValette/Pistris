import React, {useState} from 'react'
import {ImgSubProps} from './Image.js'
import {Box, Text, useStdout} from 'ink'
import TextInput from 'ink-text-input'
import {
	inputFieldModeMap,
	runImageOptionsModeMap,
	useCustomInput,
} from '../keybindings/keybindings.js'
import {HelpFooter} from '../HelpFooter.js'
import {runCommand} from '../../lib/functions.js'

export function RunImg({sel, setMode, p}: ImgSubProps) {
	const [host, setHost] = useState<string>('')
	const [local, setLocal] = useState<string>('')
	const [t, setT] = useState<boolean>(false)
	const [i, setI] = useState<boolean>(false)
	const [state, setState] = useState(0)
	const x = useStdout()
	function inc() {
		setState(s => s + 1)
	}
	//@ts-ignore
	function add(setter, value) {
		if (/^[0-9]*$/.test(value) && value.length <= 5) {
			setter(value)
		}
	}
	function success() {
		console.log(x)
		p.setMode('Containers')
	}
	function fail({s}: any) {
		console.log(s)
		setMode('Image')
	}
	function commit() {
		const base = 'docker run '
		const h = host === '' ? '3000' : host
		const l = local === '' ? '3000' : local
		const next = []
		if (t) next.push('-t ')
		if (i) next.push('-i ')
		next.push(`-p ${h}:${l} `)
		next.push(`${sel[0]}:${sel[1]}`)
		const res = base.concat(next.join(''))
		runCommand({c: res, fail, success})
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
				<Options setT={setT} t={t} i={i} setI={setI} progress={commit} />
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
type OptionsProps = {
	setT: Function
	setI: Function
	t: boolean
	i: boolean
	progress: Function
}

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
			<Box
				justifyContent="center"
				borderStyle={'single'}
				borderColor={'blue'}
				borderDimColor
				minWidth={10}
			>
				<TextInput value={value} onChange={setter} />
			</Box>
		</Box>
	)
}

//@ts-ignore
function Options({setT, setI, i, t, progress}: OptionsProps) {
	const map = runImageOptionsModeMap({setT, setI})
	useCustomInput(map, false)
	inputFieldModeMap({accept: () => progress()})
	return (
		<Box
			alignItems="center"
			justifyContent="center"
			flexDirection="column"
			width={'100%'}
		>
			<Box
				width={'75%'}
				justifyContent="center"
				borderStyle={'single'}
				borderColor={'blue'}
				borderDimColor
				flexDirection="column"
			>
				<Option name={'interactive'} val={i} />
				<Option name={'tty'} val={t} />
			</Box>
			<HelpFooter map={map} />
		</Box>
	)
}
function Option({val, name}: {val: boolean; name: string}) {
	return (
		<Box>
			<Text bold>{name}:</Text>
			{val ? (
				<Text color={'green'} italic bold>
					ON
				</Text>
			) : (
				<Text color={'red'} italic bold>
					off
				</Text>
			)}
		</Box>
	)
}
