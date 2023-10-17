import {exec} from 'child_process'
import {Text, Box, useApp, useFocus} from 'ink'
import React, {useEffect, useState} from 'react'
import {DTdata} from '../app.js'

export function useDockerTable(command: string): {data: DTdata} {
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

export function TableRow({
	row,
	head,
	setter,
}: {
	row: string[]
	head?: boolean
	setter?: Function
}) {
	const f = head ? {isFocused: false} : useFocus({autoFocus: true})
	useEffect(() => {
		if (f.isFocused && setter) {
			setter(row)
		}
	}, [f.isFocused])
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
export function DockerTable({data, setter}: {data: DTdata; setter: Function}) {
	return (
		<Box flexDirection="column" width="100%">
			<TableRow row={data.heads} head />
			{data.rows.map((row: string[], i: number) => (
				<TableRow row={row} key={i} setter={setter} />
			))}
		</Box>
	)
}
