import {Fragment, ReactElement, useState} from 'react'
import {RouterDisp, RouterProps} from '../app.js'
import React from 'react'
import {DockerTable, useDockerTable} from './Table.js'
import {helpModeMap, imageModeMap} from './keybindings/keybindings.js'
import {Box, useInput, Text} from 'ink'
import {CH} from './CommandPannel.js'

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
	const [sel, setSel] = useState([])
	useInput(input => {
		if (map[input as keyof typeof map]) {
			const res = map[input as keyof typeof map].exec()
			if (res === 'remove') {
				console.log(sel)
			}
		}
	})
	return (
		<>
			<Box padding={1}>
				{data && <DockerTable data={data} setter={setSel} />}
			</Box>
		</>
	)
}
export function Conts(p: RouterProps) {
	console.log(p)
	return (
		<Box>
			<Text>Conts</Text>
		</Box>
	)
}
export function AllConts(p: RouterProps) {
	console.log(p)
	return (
		<Box>
			<Text>AllConts</Text>
		</Box>
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

export function Help(p: RouterProps) {
	const map = helpModeMap(p)
	useInput(input => {
		if (map[input as keyof typeof map]) {
			map[input as keyof typeof map].exec()
		}
	})
	return (
		<Box flexDirection="row" flexWrap="wrap">
			<CH name="Q" explt="Quit" />
			<CH name="i" explt="List images" />
			<CH name="c" explt="List active containers" />
			<CH name="a" explt="List all containers" />
			<CH name="b" explt="Build from current dir" />
		</Box>
	)
}
