#!/usr/bin/env node
import React from 'react'
import {render} from 'ink'
//import meow from 'meow';
import App from './app.js'
import {ChildProcess, StdioOptions, spawn} from 'child_process'

// const usage= `Usage
// 	  $ pistris

// 	Options
// 		--name  Your name

// 	Examples
// 	  $ pistris --name=Jane
// 	  Hello, Jane
// `
// const cli = meow(
//     usage,
// 	{
// 		importMeta: import.meta,
// 		flags: {
// 			name: {
// 				type: 'string',
// 			},
// 		},
// 	},
// );

class Renderer {
	clear
	unmount
	proc: null | ChildProcess
	constructor() {
		const x = render(<App />)
		this.clear = x.clear
		this.unmount = x.unmount
		this.proc = null
	}
	spawn(
		name: string,
		c: string[],
		options: {stdio: StdioOptions; detached?: boolean},
	) {
		this.kill()
		this.proc = spawn(name, c, {
			detached: options.detached,
			stdio: options.stdio,
		})
		this.proc.on('exit', () =>
			setTimeout(() => {
				this.render()
			}, 200),
		)
		this.proc.on('error', error => console.error(error))
	}
	kill() {
		this.clear()
		this.unmount()
	}
	render() {
		const x = render(<App />)
		this.clear = x.clear
		this.unmount = x.unmount
	}
}
export const app = new Renderer()
//name={cli.flags.name}
