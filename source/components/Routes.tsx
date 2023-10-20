import {Fragment, ReactElement} from 'react'
import {RouterProps} from '../app.js'
import React from 'react'
import {helpModeMap} from './keybindings/keybindings.js'
import {Box, useInput, Text} from 'ink'
import {HelpFooter} from './HelpFooter.js'
import {HomePage} from './HomePage.js'

export function Router(props: RouterProps): ReactElement<any, any> {
	const Route = props.dsptch[props.mode] || Fragment
	return <Route {...props} />
}

export function Build(p: RouterProps) {
	console.log(p)
	return (
		<Box>
			<Text>Build</Text>
		</Box>
	)
}

export function Home(p: RouterProps) {
	const map = helpModeMap(p)
	useInput(input => {
		if (map[input as keyof typeof map]) {
			map[input as keyof typeof map].exec()
		}
	})
	return (
		<>
			<Box flexDirection="row" marginBottom={2}>
				<HomePage />
			</Box>
			<HelpFooter map={map} />
		</>
	)
}
