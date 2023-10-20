import React from 'react'
import {SubProps} from '../../Routes.js'
import {Box} from 'ink'
import {Confirmator} from '../Image/rmImage.js'
import {useFlashInfo} from '../../useFlashInfo.js'
import {runCommand} from '../../../lib/functions.js'
import {rmImgModeMap, useCustomInput} from '../../keybindings/keybindings.js'
import {HelpFooter} from '../../HelpFooter.js'

export function RmContainer(props: SubProps) {
	const {flash, Flasher} = useFlashInfo({s: 'Container killed'})
	function success() {
		props.removeByValueAtIndex({index: 0, value: props.sel[0]})
		props.setMode('Container')
	}
	function rmCont() {
		flash()
		runCommand({
			c: `docker container rm --force ${props.sel[0]}`,
			fail: () => {},
			success,
		})
	}
	function accept() {
		rmCont()
	}
	function abort() {
		props.setMode('Container')
	}
	const map = rmImgModeMap({accept, abort})
	useCustomInput(map)
	return (
		<>
			<Box justifyContent="center" paddingBottom={3} paddingTop={2}>
				<Flasher>
					<Confirmator data={props.sel[1] || 'undefined'} />
				</Flasher>
			</Box>
			<HelpFooter map={map} />
		</>
	)
}
