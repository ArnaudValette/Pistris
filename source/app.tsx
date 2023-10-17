import React, {
	Dispatch,
	Fragment,
	ReactElement,
	SetStateAction,
	useEffect,
	useState,
} from 'react'
import {Box, Text, useApp, useFocus, useInput} from 'ink'
import {exec} from 'child_process'

/* type Props = {
 * 	//name: string | undefined
 * }
 *  */
type CommandHelpProps = {
	name: string
	explt: string
}
type RouterDisp = {
	[key: string]: (props: RouterProps) => ReactElement<any, any>
}
type RouterProps = {
	mode: keyof RouterDisp
	setMode: Dispatch<SetStateAction<keyof RouterDisp>>
}
type DTdata = {
	heads: string[]
	rows: Array<Array<string>>
}
function CH({name, explt}: CommandHelpProps) {
	return (
		<Box flexDirection="row" gap={2} padding={1} flexGrow={1} width="50%">
			<Text>{name}</Text>
			<Text>{explt}</Text>
		</Box>
	)
}
function Help(p: RouterProps) {
	const {exit} = useApp()
	useInput(input => {
		if (input === 'q') {
			exit()
		}
		if (input === 'i') {
			p.setMode('image')
		}
		if (input === 'c') {
			p.setMode('conts')
		}
		if (input === 'a') {
			p.setMode('conts-all')
		}
		if (input === 'b') {
			p.setMode('build')
		}
	})
	return (
		<Box flexDirection="row" flexWrap="wrap">
			<CH name="Q" explt="Quit" />
			<CH name="i" explt="List images" />
			<CH name="c" explt="List active containers" />
			<CH name="a" explt="List all containers" />
			<CH name="b" explt="Build from current dir" />
		</Box>
	)
}
function useDockerTable(command: string): {data: DTdata} {
	const {exit} = useApp()
	const [data, setData] = useState<DTdata>({heads: [], rows: []})
	function DockerTable(s: string): DTdata {
		const lines = s.split('\n')
		lines.pop()
		//@ts-ignore
		const heads = lines.splice(0, 1)[0].split(/\s\s+/)
		const rows = lines.map((line: string) => line.split(/\s\s+/))
		return {heads, rows: rows as string[][]}
	}
	useEffect(() => {
		exec(command, (error, stdout) => {
			if (error) {
				exit()
			}
			if (stdout) {
				setData(DockerTable(stdout))
			}
		})
	}, [])

	return {data}
}
function TableRow({row, head}: {row: string[]; head?: boolean}) {
	const f = head ? {isFocused: false} : useFocus({autoFocus: true})
	return (
		<Box
			flexDirection="row"
			width="100%"
			justifyContent="space-between"
			gap={2}
		>
			{row.map((s: string, i: number) => (
				<Box justifyContent="center" key={i} width={`${100 / row.length}%`}>
					<Text color={f.isFocused ? 'blue' : 'white'} dimColor={head || false}>
						{s}
					</Text>
				</Box>
			))}
		</Box>
	)
}
function DockerTable({data}: {data: DTdata}) {
	return (
		<Box flexDirection="column" width="100%">
			<TableRow row={data.heads} head />
			{data.rows.map((row: string[], i: number) => (
				<TableRow row={row} key={i} />
			))}
		</Box>
	)
}
function Image(p: RouterProps) {
	console.log(p)
	const {data} = useDockerTable('docker image ls')
	return <Box padding={1}>{data && <DockerTable data={data} />}</Box>
}
function Conts(p: RouterProps) {
	console.log(p)
	return (
		<Box>
			<Text>Conts</Text>
		</Box>
	)
}
function AllConts(p: RouterProps) {
	console.log(p)
	return (
		<Box>
			<Text>AllConts</Text>
		</Box>
	)
}
function Build(p: RouterProps) {
	console.log(p)
	return (
		<Box>
			<Text>Build</Text>
		</Box>
	)
}
function Router({mode, setMode}: RouterProps): ReactElement<any, any> {
	const Dispatch: RouterDisp = {
		init: Help,
		image: Image,
		conts: Conts,
		'conts-all': AllConts,
		build: Build,
	}
	const Route = Dispatch[mode] || Fragment
	return <Route mode={mode} setMode={setMode} />
}

export default function App() {
	const [mode, setMode] = useState<keyof RouterDisp>('init')
	return (
		<Box borderStyle="round">
			<Router mode={mode} setMode={setMode} />
		</Box>
	)
}
