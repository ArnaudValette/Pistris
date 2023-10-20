import {Box, Text, useFocus, useInput} from 'ink'
import React, {useEffect, useState} from 'react'
import TextInput from 'ink-text-input'
import Fuse from 'fuse.js'
import {customModeMap, upDownNav} from './keybindings/keybindings.js'
import {SubProps} from './Routes.js'

export function useSearch() {
	const [val, setVal] = useState<string>('')
	return {val, setVal}
}

export function PreSearch({
	data,
	setMode,
	focused,
	indexOfSearchColumn,
	initialState,
}: SubProps) {
	const searchable: Array<string> = data.rows.map(
		(a: string[]) => a[indexOfSearchColumn] as string,
	)
	const dummy: Array<FuseRes> = data.rows.map((a: string[], i: number) => ({
		item: a[indexOfSearchColumn] || '',
		refIndex: i,
		score: 1,
	}))
	const setFocused = (n: number) => {
		focused.current = n
	}
	customModeMap({
		escape: () => {
			setFocused(0)
			setMode(initialState)
		},
		return: () => {
			setMode(initialState)
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
	setFocused,
}: PreSearchData & {
	val: string
	setFocused: Function
}) {
	//@ts-ignore
	const x = new Fuse(searchable, {includeScore: true})
	const v = x.search(val) as Array<FuseRes>
	const res = (v.length === 0 ? dummy : v).sort(
		(a: FuseRes, b: FuseRes) => a.score - b.score,
	)

	setFocused(res[0]?.refIndex || 0)
	const nav = upDownNav()
	useInput((input, k) => {
		nav(k, input)
	})
	return (
		<>
			{res.map((a: FuseRes, i: number) => (
				<FuzzyElement
					item={a.item}
					key={i}
					index={i}
					data={a}
					setFocused={setFocused}
				/>
			))}
		</>
	)
}
type FuzzyElementProps = {
	isFocused?: boolean
	setFocused: Function
	index: number
	item: string
	data: FuseRes
}
function FuzzyElement({item, data, setFocused, index}: FuzzyElementProps) {
	const f = useFocus({autoFocus: index === 0})
	useEffect(() => {
		if (f.isFocused) {
			setFocused(data.refIndex)
		}
	}, [f.isFocused])
	return (
		<Text color={f.isFocused ? 'white' : 'blue'} bold={f.isFocused}>
			{item}
		</Text>
	)
}
