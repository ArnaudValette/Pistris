import React, {ReactElement, useState} from 'react'
import {DTdata, RouterProps, TableProps} from '../../app.js'
import {DockerTable, useDockerTable} from '../Table.js'
import {imageModeMap, useCustomInput} from '../keybindings/keybindings.js'
import {Box} from 'ink'
import {HelpFooter} from '../HelpFooter.js'
import {RmImg} from './rmImage.js'
import {RunImg} from './runImage.js'
import {Search} from '../Search.js'

export type ImgSubProps = {
	setMode: Function
	sel: Array<string>
	rProps: RouterProps
	data: DTdata
	setter: Function
	removeByValueAtIndex: Function
}
export type ImgDisp = {
	[key: string]: (props: ImgSubProps) => ReactElement<any, any>
}
export type SubRouterProps = {
	Routes: ImgDisp
	mode: keyof ImgDisp
} & ImgSubProps

const ImageDispatch = {
	Image: ImageSelect,
	RmImg: RmImg,
	RunImg: RunImg,
	Search: Search,
}

export function Img(p: RouterProps) {
	const {data, removeByValueAtIndex} = useDockerTable('docker image ls')
	const [mode, setMode] = useState('Image')
	const [sel, setSel] = useState([])
	return (
		<>
			<ImgSubRouter
				removeByValueAtIndex={removeByValueAtIndex}
				Routes={ImageDispatch}
				mode={mode}
				setMode={setMode}
				sel={sel}
				rProps={p}
				data={data}
				setter={setSel}
			/>
		</>
	)
}

export function ImgSubRouter(props: SubRouterProps) {
	const {Routes, mode, ...rest} = props
	const Route = Routes[mode]
	//@ts-ignore
	return <Route {...rest} />
}

export function ImageSelect({
	data,
	setter,
	rProps,
	setMode,
}: TableProps & {rProps: RouterProps; setMode: Function}) {
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
				{data && <DockerTable data={data} setter={setter} />}
			</Box>
			<HelpFooter map={map} />
		</>
	)
}
