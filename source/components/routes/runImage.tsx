import React, {useState} from 'react'
import {ImgSubProps} from './Image.js'
import {Box, useStdout} from 'ink'
import {runCommand} from '../../lib/functions.js'
import {OptionToggler, SetterData, useOptionsHook} from '../OptionToggler.js'
import {Name, Port, PortMappingProps, useName, usePorts} from '../Input.js'
import {Progress} from '../Progress.js'

export function RunImg({sel, setMode, rProps}: ImgSubProps) {
	const [host, local] = usePorts([
		{name: 'Host', default: '3000'},
		{name: 'Local', default: '3000'},
	]) as [PortMappingProps, PortMappingProps]
	const name = useName({name: 'Give it a name:', default: 'my-new-application'})
	const ti = useOptionsHook([
		{name: 'tty', short: 't', description: 'Toggle tty'},
		{name: 'interactive', short: 'i', description: 'Toggle interactive'},
	])
	const p = useOptionsHook([
		{name: 'bind ports', short: 'p', description: 'Toggle port mapping'},
	])
	const n = useOptionsHook([
		{name: 'Give it a name', short: 'n', description: 'Name the container'},
	])
	const [state, setState] = useState(0)
	const x = useStdout()

	function inc() {
		setState(s => s + 1)
	}

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
		const res = base.concat(next.join(''))
		runCommand({c: res, fail, success})
	}

	return (
		<Box justifyContent="center">
			<Progress
				state={state}
				elements={[
					<OptionToggler
						setters={p}
						progress={() => {
							if (p[0]?.getState()) {
								setState(1)
							} else {
								setState(3)
							}
						}}
					/>,
					<Port {...host} progress={inc} />,
					<Port {...local} progress={inc} />,

					<OptionToggler
						setters={n}
						progress={() => {
							if (n[0]?.getState()) {
								setState(4)
							} else {
								setState(5)
							}
						}}
					/>,
					<Name {...name} progress={inc} />,
					<OptionToggler setters={ti} progress={commit} />,
				]}
			/>
		</Box>
	)
}
