import React, {ReactElement, useState} from 'react'
import {DTdata, RouterProps, TableProps} from '../../app.js'
import {DockerTable, useDockerTable} from '../Table.js'
import {imageModeMap, upDownNav} from '../keybindings/keybindings.js'
import {Box, Text, useInput} from 'ink'
import {HelpFooter} from '../HelpFooter.js'

type ImgSubProps = {
	setMode: Function
	sel: Array<string>
	p: RouterProps
	data: DTdata
	setter: Function
}
type ImgDisp = {
	[key: string]: (props: ImgSubProps) => ReactElement<any, any>
}
type SubRouterProps = {
	Routes: ImgDisp
	mode: keyof ImgDisp
} & ImgSubProps

const ImageDispatch = {
	Image: ImageSelect,
	RmImg: RmImg,
	RunImg: RunImg,
}
export function Img(p: RouterProps) {
	const {data} = useDockerTable('docker image ls')
	const [mode, setMode] = useState('Image')
	const [sel, setSel] = useState([])
	return (
		<>
			<ImgSubRouter
				Routes={ImageDispatch}
				mode={mode}
				setMode={setMode}
				sel={sel}
				p={p}
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
	p,
	setMode,
}: TableProps & {p: RouterProps; setMode: Function}) {
	const nav = upDownNav()
	const map = imageModeMap({
		...p,
		remove: () => setMode('RmImg'),
		run: () => setMode('RunImg'),
	})
	useInput((input, k) => {
		nav(k, input)
		if (map[input as keyof typeof map]) {
			map[input as keyof typeof map].exec()
		}
	})
	return (
		<>
			<Box padding={1} marginBottom={2}>
				{data && <DockerTable data={data} setter={setter} />}
			</Box>
			<HelpFooter map={map} />
		</>
	)
}

export function RmImg({sel}: ImgSubProps) {
	return (
		<Box>
			<Text>{sel}</Text>
		</Box>
	)
}
export function RunImg({sel}: ImgSubProps) {
	return (
		<Box>
			<Text>{sel}</Text>
		</Box>
	)
}
