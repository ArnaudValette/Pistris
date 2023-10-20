import {Box, Text} from 'ink'
import React, {useState} from 'react'
import {useFlashInfo} from '../../useFlashInfo.js'
import {handleError, runCommand} from '../../../lib/functions.js'
import {rmImgModeMap, useCustomInput} from '../../keybindings/keybindings.js'
import {HelpFooter} from '../../HelpFooter.js'
import {SubProps} from '../../Routes.js'
import {colorMap} from '../../../app.js'

export function RmImg({
	sel,
	setMode,
	removeByValueAtIndex,
}: SubProps): React.JSX.Element {
	const [s, setS] = useState<string | null>(null)
	const {flash, Flasher} = useFlashInfo({s: 'Container deleted.'})
	function fail({s}: {s: string}) {
		const cHash: string = (
			s.split(' ').filter((word: string) => word.length >= 12) as [
				string,
				string,
			]
		)[1]
		setS(cHash)
	}
	function success() {
		removeByValueAtIndex({index: 2, value: sel[2]})
		setMode('Image')
	}
	function rmCont() {
		flash()
		runCommand({
			c: `docker container rm --force ${s}`,
			fail: handleError,
			success: rmImg,
		})
	}
	function rmImg() {
		runCommand({c: `docker image rm ${sel[2]}`, fail, success})
	}
	function accept() {
		return s ? rmCont() : rmImg()
	}
	function abort() {
		setMode('Image')
	}
	const map = rmImgModeMap({accept, abort})
	useCustomInput(map)
	return (
		<>
			<Box justifyContent="center" paddingBottom={3} paddingTop={2}>
				{!s ? (
					<Confirmator data={sel[0] || 'undefined'} />
				) : (
					<Flasher>
						<Text>
							<Text color={colorMap.deleteColor} bold>
								{sel[0]}{' '}
							</Text>
							<Text>is used in container </Text>
							<Text italic>{s} </Text>
							<Text> kill and remove this container </Text>
							<Text color={colorMap.helpIndices}>(Y/n) </Text>
							<Text>?</Text>
						</Text>
					</Flasher>
				)}
			</Box>
			<HelpFooter map={map} />
		</>
	)
}
export function Confirmator({data}: {data: string}) {
	return (
		<>
			<Text>Are you sure you want to remove </Text>
			<Text bold color={colorMap.deleteColor}>
				{data}
			</Text>
			<Text> ?</Text>
		</>
	)
}
