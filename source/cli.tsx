#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
//import meow from 'meow';
import App from './app.js';

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

//@ts-ignore
const {unmount,clear} = render(<App />);
export function kill(){
    clear()
    unmount()
}
export function rend(){
    render(<App/>)
}
//name={cli.flags.name} 
