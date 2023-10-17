import {Box, Spacer, Text} from 'ink'
import React from 'react'

export function HomePage() {
	return (
		<Box
			width={'100%'}
			flexDirection="column"
			justifyContent="center"
			padding={5}
		>
			<Box flexDirection="row" justifyContent="center" width={'100%'}>
				<Text color="white" bold>
					Pistris
				</Text>
			</Box>
			<Spacer />
			<Box flexDirection="row" justifyContent="center" width={'100%'}>
				<Text italic>a comfy docker CLI</Text>
			</Box>
		</Box>
	)
}
