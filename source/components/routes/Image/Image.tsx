import React from 'react'
import {Box} from 'ink'
import {RouterProps, TableProps} from '../../../app.js'
import {RmImg} from './rmImage.js'
import {RunImg} from './runImage.js'
import {PreSearch} from '../../Search.js'
import {DockerTable} from '../../Table.js'
import {imageModeMap, useCustomInput} from '../../keybindings/keybindings.js'
import {HelpFooter} from '../../HelpFooter.js'
import {Disp, PistrisSubRouteSelector, SelectorProps} from '../../Routes.js'

const Routes: Disp = {
	Image: ImageSelect,
	RmImg: RmImg,
	RunImg: RunImg,
	Search: PreSearch,
}

export function Img(rProps: RouterProps) {
	const [command, initialState] = ['docker image ls', 'Image']
	return (
		<PistrisSubRouteSelector {...{rProps, Routes, command, initialState}} />
	)
}

export function ImageSelect({
	data,
	setter,
	rProps,
	setMode,
	focused,
}: TableProps & SelectorProps) {
	const map = imageModeMap({
		...rProps,
		remove: () => setMode('RmImg'),
		run: () => setMode('RunImg'),
		find: () => setMode('Search'),
	})
	useCustomInput(map)
	return (
		<>
			<Box padding={1} marginBottom={2}>
				{data && <DockerTable data={data} setter={setter} focused={focused} />}
			</Box>
			<HelpFooter map={map} />
		</>
	)
}
