import React from 'react'
import {CME} from './keybindings/keybindings.js'
import {Box, Text} from 'ink'

export function HelpFooter({map}: {map: {[key: string]: CME}}) {
	return (
		<>
			<Box>
				{Object.entries(map).map((entry, index) => (
					<HelpText data={entry} key={index} />
				))}
			</Box>
		</>
	)
}

function HelpText({data}: {data: [string, CME]}) {
	return (
		<Box>
			<Text>{data[0]}</Text>
			<Text>{data[1].d}</Text>
		</Box>
	)
}
