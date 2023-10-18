import React, {Dispatch, ReactElement, SetStateAction, useState} from 'react'
import {Box, Text} from 'ink'
import {Build, Conts, Router, Home} from './components/Routes.js'
import {Img} from './components/routes/Image.js'

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
	dsptch: RouterDisp
	data?: any
}
export type DTdata = {
	heads: string[]
	rows: Array<Array<string>>
}
export type TableProps = {
	data: DTdata
	setter: Function
}

const Dispatch: RouterDisp = {
	Home: Home,
	Images: Img,
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
