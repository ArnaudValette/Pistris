import React from 'react'
import {CME} from './keybindings/keybindings.js'
import {Box, Text} from 'ink'

type HelpFooterMap = {[key: string]: CME}
type MapEntry = [string, CME]
type MapEntries = Array<MapEntry>

export function HelpFooter({map}: {map: HelpFooterMap}) {
	const entries: MapEntries = Object.entries(map)
	return (
		<Box
			width="100%"
			borderStyle={'single'}
			borderBottom={false}
			borderLeft={false}
			borderRight={false}
			flexDirection="row"
			justifyContent="space-around"
		>
			{entries.map((entry, index) => (
				<HelpText data={entry} key={index} />
			))}
		</Box>
	)
}

function HelpText({data}: {data: MapEntry}) {
	return (
		<Box justifyContent="center" flexGrow={1} gap={1}>
			<Text bold>{data[0]}</Text>
			<Text>{data[1].d}</Text>
		</Box>
	)
}
