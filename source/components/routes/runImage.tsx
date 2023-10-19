import React from 'react'
import {ImgSubProps} from './Image.js'
import {Box, useStdout} from 'ink'
import {runCommand} from '../../lib/functions.js'
import {OptionToggler, SetterData, useOptionsHook} from '../OptionToggler.js'
import {Name, Port, PortMappingProps, useName, usePorts} from '../Input.js'
import {Progress, useProgress} from '../Progress.js'

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
	const x = useStdout()

	function success() {
		console.log(x)
		rProps.setMode('Containers')
	}

	function fail({s}: any) {
		console.log(s)
		setMode('Image')
	}

	function commit() {
		const base = 'docker run '
		const h = host.getValue()
		const l = local.getValue()
		const next = []
		ti.forEach((sd: SetterData) => {
			if (sd.getState()) {
				next.push(`-${sd.short} `)
			}
		})
		next.push(`-p ${h}:${l} `)
		next.push(`--name ${name.getValue()} `)
		next.push(`${sel[0]}:${sel[1]}`)
		if (c[0]?.getState()) {
			next.push(` ${command.getValue()}`)
		}
		const res = base.concat(next.join(''))
		runCommand({c: res, fail, success})
	}

	return (
		<Box justifyContent="center">
			<Progress
				state={prog.state}
				elements={[
					<OptionToggler
						setters={p}
						progress={() => prog.jump(3, !p[0]?.getState())}
					/>,
					<Port {...host} progress={prog.jump} />,
					<Port {...local} progress={prog.jump} />,

					<OptionToggler
						setters={n}
						progress={() => prog.jump(2, !n[0]?.getState())}
					/>,
					<Name {...name} progress={prog.jump} />,
					<OptionToggler
						setters={[...ti, ...c]}
						progress={() => prog.incOrCommit(commit, !c[0]?.getState())}
					/>,
					<Name {...command} progress={commit} />,
				]}
			/>
		</Box>
	)
}
