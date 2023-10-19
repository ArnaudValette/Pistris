import React, {Dispatch, SetStateAction, useState} from 'react'
import {
	guessMapFromSetters,
	inputFieldModeMap,
	useCustomInput,
} from './keybindings/keybindings.js'
import {HelpFooter} from './HelpFooter.js'
import {Box, Text} from 'ink'

export type OptionTogglerProps = {
	setters: Array<SetterData>
	progress: Function
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

export function OptionToggler({setters, progress}: OptionTogglerProps) {
	const map = guessMapFromSetters(setters)
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
