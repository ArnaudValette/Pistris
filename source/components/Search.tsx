import {Box, Text} from 'ink'
import React, {useState} from 'react'
import {ImgSubProps} from './routes/Image.js'
import TextInput from 'ink-text-input'
import Fuse from 'fuse.js'
import {customModeMap} from './keybindings/keybindings.js'

export function useSearch() {
	const [val, setVal] = useState<string>('')
	return {val, setVal}
}

export function PreSearch({data, setMode}: ImgSubProps) {
	const searchable: Array<string> = data.rows.map(
		(a: string[]) => a[0] as string,
	)
	const dummy: Array<FuseRes> = data.rows.map((a: string[], i: number) => ({
		item: a[0] || '',
		refIndex: i,
		score: 1,
	}))
	const setFocused = (n: number) => {
		console.log(n)
	}
	customModeMap({
		escape: () => {
			setFocused(0)
			setMode('Image')
		},
		return: () => {
			setMode('Image')
		},
	})
	return (
		<Search searchable={searchable} dummy={dummy} setFocused={setFocused} />
	)
}
export type PreSearchData = {searchable: string[]; dummy: Array<FuseRes>}
export function Search({
	searchable,
	dummy,
	setFocused,
}: PreSearchData & {setFocused: Function}) {
	const {val, setVal} = useSearch()
	return (
		<Box
			alignSelf="center"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			paddingBottom={3}
			height={25}
		>
			<Box paddingBottom={3}>
				<TextInput value={val} onChange={setVal} />
			</Box>
			<Box
				overflowY="hidden"
				paddingBottom={3}
				justifyContent="center"
				flexDirection="column"
			>
				<FuzzySearch
					searchable={searchable}
					dummy={dummy}
					val={val}
					setFocused={setFocused}
				/>
			</Box>
		</Box>
	)
}

type FuseRes = {item: string; refIndex: number; score: number}
function FuzzySearch({
	dummy,
	searchable,
	val,
	//@ts-ignore
	setFocused,
}: PreSearchData & {val: string; setFocused: Function}) {
	//@ts-ignore
	const x = new Fuse(searchable, {includeScore: true})
	const v = x.search(val) as Array<FuseRes>
	const res = (v.length === 0 ? dummy : v).sort(
		(a: FuseRes, b: FuseRes) => a.score - b.score,
	)
	setFocused(res[0]?.refIndex)
	console.log(res[0]?.refIndex)
	return (
		<>
			{res.map((a: FuseRes, i: number) =>
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
