import React from 'react'
import {SubProps} from '../../Routes.js'
import {Box} from 'ink'
import {useFlashInfo} from '../../useFlashInfo.js'
import {runDockerAndExit} from '../../../lib/functions.js'
import {useAbortMap} from '../../keybindings/keybindings.js'
import {OptionToggler, SetterData, useOptionsHook} from '../../OptionToggler.js'
import {Progress, useProgress} from '../../Progress.js'

export function StartContainer(props: SubProps) {
	const {BackFlash} = useFlashInfo({s: 'Container started'})
	const ai = useOptionsHook([
		{name: 'attach', short: 'a', description: 'Toggle stdout'},
		{name: 'interactive', short: 'i', description: 'Toggle interactive'},
	])
	const prog = useProgress()
	const abortMap = useAbortMap(() => props.setMode('Container'))
	function commit() {
		const base = 'start'
		const next = []
		ai.forEach((sd: SetterData) => {
			if (sd.getState()) {
				next.push(`-${sd.short}`)
			}
		})
		next.push(`${props.sel[props.sel.length - 1]}`)
		const res = [base, ...next]
		const attached = ai[0]?.getState() as boolean
		runDockerAndExit({c: res, fail, detached: !attached})
	}

	//@ts-ignore
	function fail(s: any) {
		props.setMode('Container')
	}

	return (
		<Box justifyContent="center" paddingBottom={3} paddingTop={2}>
			{props.sel[4]?.startsWith('Exited') ||
			props.sel[4]?.startsWith('Created') ? (
				<Progress
					state={prog.state}
					elements={[
						<OptionToggler addMap={abortMap} setters={ai} progress={commit} />,
					]}
				/>
			) : (
				<BackFlash
					then={() => props.setMode('Container')}
					for={'This container is already running !'}
				/>
			)}
		</Box>
	)
}
