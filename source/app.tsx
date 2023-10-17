import React, {Dispatch, ReactElement, SetStateAction, useState} from 'react'
import {Box, Text} from 'ink'
import {Build, Conts, Router, Image, Home} from './components/Routes.js'

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
	Home: Home,
	Images: Image,
	Containers: Conts,
	build: Build,
}

export default function App() {
	const [mode, setMode] = useState<keyof RouterDisp>('Home')
	return (
		<Box borderStyle="round" flexDirection="column">
			<Box margin={1}>
				<Text bold inverse>{`    ${mode}    `}</Text>
			</Box>
			<Router dsptch={Dispatch} mode={mode} setMode={setMode} />
		</Box>
	)
}
