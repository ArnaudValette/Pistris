import React from 'react'
import {RouterProps, TableProps} from '../../../app.js'
import {DockerTable} from '../../Table.js'
import {
	containerModeMap,
	useCustomInput,
} from '../../keybindings/keybindings.js'
import {Box} from 'ink'
import {HelpFooter} from '../../HelpFooter.js'
import {Disp, PistrisSubRouteSelector, SelectorProps} from '../../Routes.js'
import {PreSearch} from '../../Search.js'
import {RmContainer} from './RmContainer.js'
import {StartContainer} from './StartContainer.js'
import {KillContainer} from './KillContainer.js'

const Routes: Disp = {
	Container: ContainerSelect,
	StartContainer: StartContainer,
	Search: PreSearch,
	KillContainer: KillContainer,
	RmContainer: RmContainer,
	//TODO: should add an ATTACH option
}
export function Conts(rProps: RouterProps) {
	const [command, initialState] = ['docker ps -a', 'Container']
	return (
		<PistrisSubRouteSelector
			{...{rProps, command, initialState, Routes, indexOfSearchColumn: 1}}
		/>
	)
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
