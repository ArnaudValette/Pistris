import React, {useRef, useState} from 'react'
import {RouterProps, TableProps} from '../../../app.js'
import {DockerTable, useDockerTable} from '../../Table.js'
import {
	containerModeMap,
	useCustomInput,
} from '../../keybindings/keybindings.js'
import {Box} from 'ink'
import {HelpFooter} from '../../HelpFooter.js'
import {SelectorProps, SubProps, SubRouter} from '../../Routes.js'
import {PreSearch} from '../../Search.js'

const ContsDispatch = {
	Container: ContainerSelect,
	StartContainer: StartContainer,
	Search: PreSearch,
	KillContainer: KillContainer,
}
export function Conts(p: RouterProps) {
	const {data, removeByValueAtIndex} = useDockerTable('docker ps -a')
	const [mode, setMode] = useState('Container')
	const [sel, setSel] = useState([])
	const focused = useRef<number>(0)
	return (
		<>
			<SubRouter
				Routes={ContsDispatch}
				mode={mode}
				setMode={setMode}
				sel={sel}
				rProps={p}
				data={data}
				focused={focused}
				setter={setSel}
				removeByValueAtIndex={removeByValueAtIndex}
			/>
		</>
	)
}

export function StartContainer({}: SubProps) {
	return <Box></Box>
}

export function KillContainer({}: SubProps) {
	return <Box></Box>
}
export function ContainerSelect({
	data,
	setter,
	focused,
	setMode,
	rProps,
}: TableProps & SelectorProps) {
	const map = containerModeMap({
		...rProps,
		remove: () => setMode('RmContainer'),
		start: () => setMode('StartContainer'),
		find: () => setMode('Search'),
		kill: () => setMode('KillContainer'),
	})
	useCustomInput(map)
	return (
		<>
			<Box padding={1} marginBottom={2}>
				{<DockerTable data={data} setter={setter} focused={focused} />}
			</Box>
			<HelpFooter map={map} />
		</>
	)
}
