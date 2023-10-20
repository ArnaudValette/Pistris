import React from 'react'
import {RouterProps, TableProps} from '../../../app.js'
import {DockerTable} from '../../Table.js'
import {
	containerModeMap,
	useCustomInput,
} from '../../keybindings/keybindings.js'
import {Box} from 'ink'
import {HelpFooter} from '../../HelpFooter.js'
import {
	Disp,
	PistrisSubRouteSelector,
	SelectorProps,
	SubProps,
} from '../../Routes.js'
import {PreSearch} from '../../Search.js'

const Routes: Disp = {
	Container: ContainerSelect,
	StartContainer: StartContainer,
	Search: PreSearch,
	KillContainer: KillContainer,
}
export function Conts(rProps: RouterProps) {
	const [command, initialState] = ['docker ps -a', 'Container']
	return (
		<PistrisSubRouteSelector
			{...{rProps, command, initialState, Routes, indexOfSearchColumn: 1}}
		/>
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
