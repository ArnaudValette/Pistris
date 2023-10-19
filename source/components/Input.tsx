import React, {useState} from 'react'
import {KeyMap, inputFieldModeMap} from './keybindings/keybindings.js'
import {Box, Text} from 'ink'
import TextInput from 'ink-text-input'

export type PortData = {
	name: string
	default: string
}
export type PortProps = {
	value: string
	setter: (s: string) => void
	progress: Function
	addMap?: KeyMap
} & Omit<PortData, 'default'>

export function Port({setter, value, name, progress}: PortProps) {
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

export type PortMappingProps = Omit<PortProps, 'progress'> & {
	getValue: Function
}

export function usePortMapping(data: PortData): PortMappingProps {
	const [port, setPort] = useState<string>('')
	function add(value: string) {
		if (/^[0-9]*$/.test(value) && value.length <= 5) {
			setPort(value)
		}
	}

	function getValue() {
		return port === '' ? data.default : port
	}

	return {setter: add, value: port, name: data.name, getValue}
}

export function usePorts(data: Array<PortData>): Array<PortMappingProps> {
	return data.map((d: PortData) => usePortMapping(d))
}

export function useName(data: {name: string; default: string}) {
	const [x, setX] = useState<string>('')
	function getValue() {
		return x === '' ? data.default : x
	}
	return {value: x, setter: setX, name: data.name, getValue}
}
export function Name({setter, value, name, progress}: PortProps) {
	inputFieldModeMap({accept: () => progress()})
	return (
		<Box justifyContent="center" flexDirection="column">
			<Text>
				<Text bold>{name}</Text>:
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
