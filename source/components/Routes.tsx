import {Fragment, MutableRefObject, ReactElement, useRef, useState} from 'react'
import {DTdata, RouterProps} from '../app.js'
import React from 'react'
import {helpModeMap} from './keybindings/keybindings.js'
import {Box, useInput, Text} from 'ink'
import {HelpFooter} from './HelpFooter.js'
import {HomePage} from './HomePage.js'
import {useDockerTable} from './Table.js'

export type SelectorProps = {
	rProps: RouterProps
	setMode: Function
	focused: MutableRefObject<number>
}
export type SubProps = {
	setMode: Function
	sel: Array<string>
	rProps: RouterProps
	data: DTdata
	focused: MutableRefObject<number>
	setter: Function
	removeByValueAtIndex: Function
	indexOfSearchColumn: number
	initialState: string
}
export type SubRouterProps = {
	Routes: Disp
	mode: keyof Disp
} & SubProps

export type Disp = {
	[key: string]: (props: SubProps) => ReactElement<any, any>
}

export function Router(props: RouterProps): ReactElement<any, any> {
	const Route = props.dsptch[props.mode] || Fragment
	return <Route {...props} />
}

export function SubRouter(props: SubRouterProps) {
	const {Routes, mode, ...rest} = props
	const Route = Routes[mode]
	//@ts-ignore
	return <Route {...rest} />
}

export type PistrisSubRouteSelectorProps = {
	rProps: RouterProps
	command: string
	initialState: string
	Routes: Disp
	indexOfSearchColumn?: number
}
export function PistrisSubRouteSelector({
	rProps,
	command,
	initialState,
	Routes,
	indexOfSearchColumn,
}: PistrisSubRouteSelectorProps) {
	const {data, removeByValueAtIndex} = useDockerTable(command)
	const [mode, setMode] = useState(initialState)
	const [sel, setter] = useState([])
	const focused = useRef<number>(0)
	return (
		<SubRouter
			{...{
				Routes,
				mode,
				setMode,
				sel,
				rProps,
				initialState,
				data,
				focused,
				setter,
				removeByValueAtIndex,
				indexOfSearchColumn: indexOfSearchColumn || 0,
			}}
		/>
	)
}
export function Build(p: RouterProps) {
	console.log(p)
	return (
		<Box>
			<Text>Build</Text>
		</Box>
	)
}

export function Home(p: RouterProps) {
	const map = helpModeMap(p)
	useInput(input => {
		if (map[input as keyof typeof map]) {
			map[input as keyof typeof map].exec()
		}
	})
	return (
		<>
			<Box flexDirection="row" marginBottom={2}>
				<HomePage />
			</Box>
			<HelpFooter map={map} />
		</>
	)
}
