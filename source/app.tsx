import React, {Dispatch, ReactElement, SetStateAction, useState} from 'react'
import {Box} from 'ink'
import {
	AllConts,
	Build,
	Conts,
	Router,
	Image,
	Help,
} from './components/Routes.js'

export type CommandHelpProps = {
	name: string
	explt: string
}
export type RouterDisp = {
	[key: string]: (props: RouterProps) => ReactElement<any, any>
}
export type RouterProps = {
	mode: keyof RouterDisp
	setMode: Dispatch<SetStateAction<keyof RouterDisp>>
}
export type DTdata = {
	heads: string[]
	rows: Array<Array<string>>
}

const Dispatch: RouterDisp = {
	init: Help,
	image: Image,
	conts: Conts,
	'conts-all': AllConts,
	build: Build,
}

export default function App() {
	const [mode, setMode] = useState<keyof RouterDisp>('init')
	return (
		<Box borderStyle="round" flexDirection="column">
			<Router dsptch={Dispatch} mode={mode} setMode={setMode} />
		</Box>
	)
}
