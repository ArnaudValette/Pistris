import React, {Dispatch, SetStateAction, useState} from 'react'
import {
	KeyMap,
	guessMapFromSetters,
	inputFieldModeMap,
	useCustomInput,
} from './keybindings/keybindings.js'
import {HelpFooter} from './HelpFooter.js'
import {Box, Text} from 'ink'
import {colorMap} from '../app.js'

export type OptionTogglerProps = {
	setters: Array<SetterData>
	progress: Function
	addMap?: KeyMap
}

type optionsData = {
	name: string
	short: string
	description: string
}

export function useOptionsHook(data: Array<optionsData>): Array<SetterData> {
	return data.map((d: optionsData) => {
		const x = useState<boolean>(false)
		return new SetterData(d.name, d.short, d.description, x)
	})
}

export function OptionToggler({setters, progress, addMap}: OptionTogglerProps) {
	const map = {...guessMapFromSetters(setters), ...addMap}
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
				borderStyle={'round'}
				borderColor={colorMap.optionsFrame}
				flexDirection="column"
				padding={1}
				marginBottom={3}
			>
				{setters.map((s: SetterData, index: number) => (
					<Option key={index} name={s.name} val={s.getState()} />
				))}
			</Box>
			<HelpFooter map={map} />
		</Box>
	)
}

function Option({val, name}: {val: boolean; name: string}) {
	return (
		<Box gap={1}>
			<Text bold>{name}:</Text>
			{val ? (
				<Text color={colorMap.On} italic bold>
					ON
				</Text>
			) : (
				<Text color={colorMap.Off} italic bold>
					off
				</Text>
			)}
		</Box>
	)
}
export type hook<T> = [T, Dispatch<SetStateAction<T>>]
export interface _SetterData {
	name: string
	short: string
	description: string
	hook: hook<boolean>
}
export class SetterData implements _SetterData {
	name: string
	short: string
	description: string
	hook: hook<boolean>
	constructor(
		name: string,
		short: string,
		description: string,
		hook: hook<boolean>,
	) {
		this.name = name
		this.short = short
		this.description = description
		this.hook = hook
	}
	toggle() {
		return this.hook[1](!this.hook[0])
	}
	getState() {
		return this.hook[0]
	}
}
