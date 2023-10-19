import React from 'react'
import {inputFieldModeMap} from './keybindings/keybindings.js'
import {Box, Text} from 'ink'
import TextInput from 'ink-text-input'

export type PortProps = {
	setter: (s: string) => void
	value: string
	progress: Function
	name: string
}

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
