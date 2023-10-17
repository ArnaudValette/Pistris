import {Box, Text} from 'ink'
import {CommandHelpProps} from '../app.js'
import React from 'react'

export function CH({name, explt}: CommandHelpProps) {
	return (
		<Box flexDirection="row" gap={2} padding={1} flexGrow={1} width="50%">
			<Text>{name}</Text>
			<Text>{explt}</Text>
		</Box>
	)
}
