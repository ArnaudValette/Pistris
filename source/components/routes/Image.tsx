import React, {ReactElement, useState} from 'react'
import {DTdata, RouterProps, TableProps} from '../../app.js'
import {DockerTable, useDockerTable} from '../Table.js'
import {
	imageModeMap,
	rmImgModeMap,
	useCustomInput,
} from '../keybindings/keybindings.js'
import {Box, Text} from 'ink'
import {HelpFooter} from '../HelpFooter.js'
import {runCommand} from '../../lib/functions.js'

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
	const map = imageModeMap({
		...p,
		remove: () => setMode('RmImg'),
		run: () => setMode('RunImg'),
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

export function RmImg({sel, setMode}: ImgSubProps) {
	const [s, setS] = useState<string | null>(null)
	function fail({s}: {s: string}) {
		//12
		const cHash: string = (
			s.split(' ').filter((word: string) => word.length >= 12) as [
				string,
				string,
			]
		)[1]
		setS(cHash)
	}
	function success() {}
	function accept() {
		runCommand({c: `docker image rm ${sel[2]}`, fail, success})
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
					<>
						<Text>Are you sure you want to remove </Text>
						<Text bold color="red">
							{sel[0]}
						</Text>
						<Text> ?</Text>
					</>
				) : (
					<>
						<Text>
							<Text color={'red'} bold>
								{sel[0]}{' '}
							</Text>
							<Text>is used in container </Text>
							<Text italic>{s} </Text>
							<Text> kill and remove this container </Text>
							<Text color={'blue'}>(Y/n) </Text>
							<Text>?</Text>
						</Text>
					</>
				)}
			</Box>
			<HelpFooter map={map} />
		</>
	)
}
export function RunImg({sel}: ImgSubProps) {
	return (
		<Box>
			<Text>{sel}</Text>
		</Box>
	)
}
