import {exec} from 'child_process'
import {Text, Box, useApp, useFocus} from 'ink'
import React, {useEffect, useState} from 'react'
import {DTdata, TableProps, colorMap} from '../app.js'

export function useDockerTable(command: string): {
	data: DTdata
	removeByValueAtIndex: Function
} {
	const {exit} = useApp()
	const [data, setData] = useState<DTdata>({heads: [], rows: []})
	function removeByValueAtIndex({
		value,
		index,
	}: {
		value: string
		index: number
	}) {
		setData(data => {
			const heads = data.heads
			const rows = data.rows.filter(d => d[index] !== value)
			return {heads, rows}
		})
	}
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

	return {data, removeByValueAtIndex}
}

export function TableRow({
	row,
	head,
	setter,
	id,
	focused,
}: {
	row: string[]
	id: number
	focused: boolean
	head?: boolean
	setter?: Function
}) {
	const f = head
		? {isFocused: false}
		: useFocus({autoFocus: focused, id: `${id}`})
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
					<Text
						color={f.isFocused ? colorMap.baseColor : colorMap.dimColor2}
						dimColor={head || false}
					>
						{s}
					</Text>
				</Box>
			))}
		</Box>
	)
}
export function DockerTable({data, setter, focused}: TableProps) {
	return (
		<Box flexDirection="column" width="100%">
			{/*<TableRow row={data.heads} head /> */}
			{data.rows.length > 0 ? (
				data.rows.map((row: string[], i: number) => (
					<TableRow
						row={row}
						key={i}
						id={i}
						setter={setter}
						focused={focused?.current === i}
					/>
				))
			) : (
				<Box justifyContent="center">
					<Text color={colorMap.nothingToSee}>There's nothing to see...</Text>
				</Box>
			)}
		</Box>
	)
}
