import React, {
	Dispatch,
	MutableRefObject,
	ReactElement,
	SetStateAction,
	useState,
} from 'react'
import {Box, Text} from 'ink'
import {Build, Router, Home} from './components/Routes.js'
import {Img} from './components/routes/Image/Image.js'
import {Conts} from './components/routes/Containers/Containers.js'

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
	focused?: MutableRefObject<number>
}

const Dispatch: RouterDisp = {
	Home: Home,
	Images: Img,
	Containers: Conts,
	build: Build,
}

export const colorMap = {
	mainFrame: '#0000AA',
	routeFlag: '#AA00FF',
	Pistris: '#AA55FF',
	helpFrame: '#FF99CC',
	helpIndices: '#EEEEFF',
	helpDesc: '#AAFFFF',
	nothingToSee: 'yellow',
	baseColor: '#FFFFFF',
	dimColor: '#66AABB',
	dimColor2: '#6d9cbd',
	optionsFrame: '#335533',
	On: '#00FFAA',
	Off: '#FF00AA',
	deleteColor: 'red',
}
export default function App() {
	const [mode, setMode] = useState<keyof RouterDisp>('Home')
	return (
		<Box
			borderStyle="round"
			borderColor={colorMap.mainFrame}
			flexDirection="column"
		>
			<Box margin={1}>
				<Text bold inverse color={colorMap.routeFlag}>{`    ${mode}    `}</Text>
			</Box>
			<Router dsptch={Dispatch} mode={mode} setMode={setMode} />
		</Box>
	)
}
