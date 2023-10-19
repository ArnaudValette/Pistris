import React, {useState} from 'react'
import {ImgSubProps} from './Image.js'
import {Box, useStdout} from 'ink'
import {runCommand} from '../../lib/functions.js'
import {OptionToggler, SetterData, useOptionsHook} from '../OptionToggler.js'
import {Port} from '../Input.js'

export function RunImg({sel, setMode, rProps}: ImgSubProps) {
	const [host, setHost] = useState<string>('')
	const [local, setLocal] = useState<string>('')
	const ti = useOptionsHook([
		{name: 'tty', short: 't', description: 'Toggle tty'},
		{name: 'interactive', short: 'i', description: 'Toggle interactive'},
	])
	const p = useOptionsHook([
		{name: 'bind ports', short: 'p', description: 'Toggle port mapping'},
	])
	const [state, setState] = useState(0)
	const x = useStdout()

	function inc() {
		setState(s => s + 1)
	}

	function add(setter: Function, value: string) {
		if (/^[0-9]*$/.test(value) && value.length <= 5) {
			setter(value)
		}
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
		const h = host === '' ? '3000' : host
		const l = local === '' ? '3000' : local
		const next = []
		ti.forEach((sd: SetterData) => {
			if (sd.getState()) {
				next.push(`-${sd.short} `)
			}
		})
		next.push(`-p ${h}:${l} `)
		next.push(`${sel[0]}:${sel[1]}`)
		const res = base.concat(next.join(''))
		runCommand({c: res, fail, success})
	}

	return (
		<Box justifyContent="center">
			{state === 0 ? (
				<OptionToggler
					setters={p}
					progress={() => {
						if (p[0]?.getState()) {
							setState(1)
						} else {
							setState(3)
						}
					}}
				/>
			) : state === 1 ? (
				<Port
					name={'Host'}
					setter={s => add(setHost, s)}
					value={host}
					progress={inc}
				/>
			) : state === 2 ? (
				<Port
					name={'Client'}
					setter={s => add(setLocal, s)}
					value={local}
					progress={inc}
				/>
			) : (
				<OptionToggler setters={ti} progress={commit} />
			)}
		</Box>
	)
}
