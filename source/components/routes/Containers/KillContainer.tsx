import React from 'react'
import {SubProps} from '../../Routes.js'
import {Box} from 'ink'
import {useFlashInfo} from '../../useFlashInfo.js'
import {runCommand} from '../../../lib/functions.js'
import {rmImgModeMap, useCustomInput} from '../../keybindings/keybindings.js'
import {Confirmator} from '../Image/rmImage.js'
import {HelpFooter} from '../../HelpFooter.js'

export function KillContainer(props: SubProps) {
	const {flash, Flasher, BackFlash} = useFlashInfo({s: 'Container killed'})
	function success() {
		props.removeByValueAtIndex({index: 0, value: props.sel[0]})
		props.setMode('Container')
	}
	function rmCont() {
		flash()
		runCommand({
			c: `docker kill ${props.sel[props.sel.length - 1]}`,
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
				{props.sel[4]?.startsWith('Exited') ? (
					<BackFlash
						then={() => props.setMode('Container')}
						for={'This container is not running !'}
					/>
				) : (
					<Flasher>
						<Confirmator
							data={props.sel[1] || 'undefined'}
							overload={'Are you sure you want to kill'}
						/>
					</Flasher>
				)}
			</Box>
			<HelpFooter map={map} />
		</>
	)
}
