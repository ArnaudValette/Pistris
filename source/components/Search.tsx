import {Box, Text} from 'ink'
import React, {useState} from 'react'
import {ImgSubProps} from './routes/Image.js'
import TextInput from 'ink-text-input'
import {DTdata} from '../app.js'
import Fuse from 'fuse.js'

export function useSearch() {
	const [isSearchMode, setSearchMode] = useState<boolean>(false)
	const [val, setVal] = useState<string>('')
	const [id, setId] = useState<number>(0)
	return {isSearchMode, val, id, setSearchMode, setVal, setId}
}

//@ts-ignore
export function Search({data, setter, sel}: ImgSubProps) {
	const {val, setVal} = useSearch()
	return (
		<Box
			alignSelf="center"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			paddingBottom={3}
		>
			<Box paddingBottom={3}>
				<TextInput value={val} onChange={setVal} />
			</Box>
			<Box paddingBottom={3} justifyContent="center" flexDirection="column">
				<FuzzySearch data={data} val={val} />
			</Box>
		</Box>
	)
}

type FuseRes = {item: string; refIndex: number; score: number}
//@ts-ignore
function FuzzySearch({data, val}: {data: DTdata; val: string}) {
	const listOfNames = data.rows.map((a: string[]) => a[0])
	const someData: Array<FuseRes> = data.rows.map((a: string[], i: number) => ({
		item: a[0] || '',
		refIndex: i,
		score: 1,
	}))
	//@ts-ignore
	const x = new Fuse(listOfNames, {includeScore: true})
	const v = x.search(val) as Array<FuseRes>
	const res = v.length === 0 ? someData : v
	return (
		<>
			{res
				.sort((a: FuseRes, b: FuseRes) => a.score - b.score)
				.map((a: FuseRes, i: number) =>
					i !== 0 ? (
						<Text key={i} color={'blue'}>
							{a.item}
						</Text>
					) : (
						<Text key={i} bold>
							{a.item}
						</Text>
					),
				)}
		</>
	)
}
