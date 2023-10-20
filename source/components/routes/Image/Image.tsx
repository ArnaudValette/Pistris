import React, {useRef, useState} from 'react'
import {Box} from 'ink'
import {RouterProps, TableProps} from '../../../app.js'
import {RmImg} from './rmImage.js'
import {RunImg} from './runImage.js'
import {PreSearch} from '../../Search.js'
import {DockerTable, useDockerTable} from '../../Table.js'
import {imageModeMap, useCustomInput} from '../../keybindings/keybindings.js'
import {HelpFooter} from '../../HelpFooter.js'
import {SelectorProps, SubRouter} from '../../Routes.js'

const ImageDispatch = {
	Image: ImageSelect,
	RmImg: RmImg,
	RunImg: RunImg,
	Search: PreSearch,
}

export function Img(p: RouterProps) {
	const {data, removeByValueAtIndex} = useDockerTable('docker image ls')
	const [mode, setMode] = useState('Image')
	const [sel, setSel] = useState([])
	const focused = useRef<number>(0)
	return (
		<>
			<SubRouter
				removeByValueAtIndex={removeByValueAtIndex}
				Routes={ImageDispatch}
				mode={mode}
				setMode={setMode}
				sel={sel}
				rProps={p}
				focused={focused}
				data={data}
				setter={setSel}
			/>
		</>
	)
}

export function ImageSelect({
	data,
	setter,
	rProps,
	setMode,
	focused,
}: TableProps & SelectorProps) {
	const map = imageModeMap({
		...rProps,
		remove: () => setMode('RmImg'),
		run: () => setMode('RunImg'),
		find: () => setMode('Search'),
	})
	useCustomInput(map)
	return (
		<>
			<Box padding={1} marginBottom={2}>
				{data && <DockerTable data={data} setter={setter} focused={focused} />}
			</Box>
			<HelpFooter map={map} />
		</>
	)
}
