import {Fragment, ReactElement, useState} from 'react'
import {RouterDisp, RouterProps} from '../app.js'
import React from 'react'
import {DockerTable, useDockerTable} from './Table.js'
import {
	contsModeMap,
	helpModeMap,
	imageModeMap,
	upDownNav,
} from './keybindings/keybindings.js'
import {Box, useInput, Text} from 'ink'
import {HelpFooter} from './HelpFooter.js'
import {HomePage} from './HomePage.js'

export function Router({
	mode,
	setMode,
	dsptch,
}: RouterProps & {dsptch: RouterDisp}): ReactElement<any, any> {
	const Route = dsptch[mode] || Fragment
	return <Route mode={mode} setMode={setMode} />
}

export function Image(p: RouterProps) {
	const {data} = useDockerTable('docker image ls')
	function remove() {
		console.log(sel)
	}
	function run() {
		console.log(sel)
	}
	const map = imageModeMap({...p, remove, run})
	const nav = upDownNav()
	const [sel, setSel] = useState([])
	useInput((input, k) => {
		nav(k, input)
		if (map[input as keyof typeof map]) {
			const res = map[input as keyof typeof map].exec()
			if (res === 'remove') {
				console.log(sel)
			}
		}
	})
	return (
		<>
			<Box padding={1} marginBottom={2}>
				{data && <DockerTable data={data} setter={setSel} />}
			</Box>
			<HelpFooter map={map} />
		</>
	)
}
export function Conts(p: RouterProps) {
	const d1 = useDockerTable('docker ps -a')
	const d2 = useDockerTable('docker ps')
	const [toggle, setToggle] = useState(false)
	const [sel, setSel] = useState([])
	function remove() {
		console.log(sel)
	}
	function start() {}
	function kill() {}
	function filter() {
		setToggle(t => !t)
	}
	const map = contsModeMap({...p, remove, start, filter, kill})
	const nav = upDownNav()
	useInput((input, k) => {
		nav(k, input)
		if (map[input as keyof typeof map]) {
			map[input as keyof typeof map].exec()
		}
	})
	return (
		<>
			<Box padding={1} marginBottom={2}>
				{d1 && d2 && (
					<DockerTable data={toggle ? d2.data : d1.data} setter={setSel} />
				)}
			</Box>
			<HelpFooter map={map} />
		</>
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
