import React from 'react'
import {ImgSubProps} from './Image.js'
import {Box} from 'ink'
import {runDockerAndExit} from '../../lib/functions.js'
import {OptionToggler, SetterData, useOptionsHook} from '../OptionToggler.js'
import {Name, Port, PortMappingProps, useName, usePorts} from '../Input.js'
import {Progress, useProgress} from '../Progress.js'
import {useAbortMap, useBackModeMap} from '../keybindings/keybindings.js'

//@ts-ignore
export function RunImg({sel, setMode, rProps}: ImgSubProps) {
	const [host, local] = usePorts([
		{name: 'Host', default: '3000'},
		{name: 'Local', default: '3000'},
	]) as [PortMappingProps, PortMappingProps]
	const name = useName({name: 'Give it a name:', default: 'my-new-application'})
	const command = useName({
		name: 'Run additional commands (passed to the container)',
		default: '',
	})
	const ti = useOptionsHook([
		{name: 'tty', short: 't', description: 'Toggle tty'},
		{name: 'interactive', short: 'i', description: 'Toggle interactive'},
		{name: 'background', short: 'd', description: 'Toggle run in background'},
	])
	const c = useOptionsHook([
		{
			name: 'Run additionnal commands (passed to the container)',
			short: 'c',
			description: 'Append commands',
		},
	])
	const p = useOptionsHook([
		{name: 'bind ports', short: 'p', description: 'Toggle port mapping'},
	])
	const n = useOptionsHook([
		{name: 'Give it a name', short: 'n', description: 'Name the container'},
	])
	const prog = useProgress()
	const map = useBackModeMap(prog.back)
	const abortMap = useAbortMap(() => setMode('Image'))

	function fail(s: any) {
		console.log(s)
		setMode('Image')
	}

	function commit() {
		const base = 'run'
		const h = host.getValue()
		const l = local.getValue()
		const next = []
		ti.forEach((sd: SetterData) => {
			if (sd.getState()) {
				next.push(`-${sd.short}`)
			}
		})
		if (p[0]?.getState()) {
			next.push(`-p`)
			next.push(`${h}:${l}`)
		}
		if (n[0]?.getState()) {
			next.push(`--name`)
			next.push(`${name.getValue()}`)
		}
		next.push(`${sel[0]}:${sel[1]}`)
		if (c[0]?.getState()) {
			next.push(`${command.getValue()}`)
		}
		//const res = base.concat(next.join(''))
		const res = [base, ...next]
		//runCommand({c: res, fail, success})
		runDockerAndExit({c: res, fail})
	}

	return (
		<Box justifyContent="center">
			<Progress
				state={prog.state}
				elements={[
					<OptionToggler
						addMap={abortMap}
						setters={p}
						progress={() => prog.jump(3, !p[0]?.getState())}
					/>,
					<Port {...host} addMap={map} progress={prog.jump} />,
					<Port {...local} addMap={map} progress={prog.jump} />,

					<OptionToggler
						addMap={map}
						setters={n}
						progress={() => prog.jump(2, !n[0]?.getState())}
					/>,
					<Name {...name} addMap={map} progress={prog.jump} />,
					<OptionToggler
						addMap={map}
						setters={[...ti, ...c]}
						progress={() => prog.incOrCommit(commit, !c[0]?.getState())}
					/>,
					<Name addMap={map} {...command} progress={commit} />,
				]}
			/>
		</Box>
	)
}
