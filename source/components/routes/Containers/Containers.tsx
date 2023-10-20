import React, {useState} from 'react'
import {RouterProps} from '../../../app.js'
import {DockerTable, useDockerTable} from '../../Table.js'
import {contsModeMap, upDownNav} from '../../keybindings/keybindings.js'
import {Box, useInput} from 'ink'
import {HelpFooter} from '../../HelpFooter.js'

export function Conts(p: RouterProps) {
	const [d1, d2] = [useDockerTable('docker ps -a'), useDockerTable('docker ps')]
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
