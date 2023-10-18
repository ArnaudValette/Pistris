import React, {useState} from 'react'
import {RouterProps, TableProps} from '../../app.js'
import {DockerTable, useDockerTable} from '../Table.js'
import {imageModeMap, upDownNav} from '../keybindings/keybindings.js'
import {Box, useInput} from 'ink'
import {HelpFooter} from '../HelpFooter.js'

export function Display({data, setter}: TableProps) {
	return (
		<Box padding={1} marginBottom={2}>
			{data && <DockerTable data={data} setter={setter} />}
		</Box>
	)
}
export function Img(p: RouterProps) {
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
			<Display data={data} setter={setSel} />
			<HelpFooter map={map} />
		</>
	)
}

export function RmImg() {}
export function RunImg() {}
