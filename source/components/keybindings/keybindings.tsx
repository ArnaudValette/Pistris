import {useInput, Key, useApp, useFocusManager} from 'ink'
import {RouterProps} from '../../app.js'
import {SetterData} from '../OptionToggler.js'

export class CME {
	d: string
	exec: Function
	constructor(d: string, exec: Function) {
		this.d = d
		this.exec = exec
	}
}
export class Q extends CME {
	constructor(exit: Function) {
		super('quit', () => exit())
	}
}
export function helpModeMap({setMode}: RouterProps) {
	const {exit} = useApp()
	return {
		q: new Q(exit),
		i: new CME('list images', () => setMode('Images')),
		c: new CME('list containers', () => setMode('Containers')),
		b: new CME('build from dir', () => setMode('build')),
	}
}

export function imageModeMap({
	setMode,
	remove,
	run,
	find,
}: RouterProps & {remove: Function; run: Function; find: Function}) {
	const {exit} = useApp()
	return {
		q: new Q(exit),
		b: new CME('home', () => setMode('Home')),
		c: new CME('list containers', () => setMode('Containers')),
		d: new CME('remove image', () => remove()),
		o: new CME('Run image', () => run()),
		'/': new CME('Search', () => find()),
	}
}

export function containerModeMap({
	setMode,
	remove,
	start,
	find,
	kill,
}: RouterProps & {
	remove: Function
	start: Function
	find: Function
	kill: Function
}) {
	const {exit} = useApp()
	return {
		q: new Q(exit),
		b: new CME('home', () => setMode('Home')),
		i: new CME('list images', () => setMode('Images')),
		d: new CME('remove', () => remove()),
		o: new CME('start', () => start()),
		x: new CME('kill', () => kill()),
		'/': new CME('Search', () => find()),
	}
}

export function rmImgModeMap({
	accept,
	abort,
}: {
	accept: Function
	abort: Function
}) {
	const {exit} = useApp()
	return {
		q: new Q(exit),
		Y: new CME('Confirm', () => accept()),
		n: new CME('Abort', () => abort()),
	}
}

export function runImgModeMap({
	abort,
	port,
	tty,
	interactive,
}: {
	abort: Function
	port: Function
	tty: Function
	interactive: Function
}) {
	const {exit} = useApp()
	return {
		q: new Q(exit),
		b: new CME('Abort', () => abort()),
		p: new CME('Port', () => port()),
		t: new CME('Emulate tty', () => tty()),
		i: new CME('Interactive', () => interactive()),
	}
}

export function customModeMap(obj: {[key: string]: Function}) {
	const entries = Object.entries(obj)
	useInput((input, key) => {
		entries.forEach(([k, f]: [string, Function]) => {
			if (key[k as keyof typeof key]) {
				f()
			}
		})
		if (input) {
		}
	})
}
export function escapeModeMap({escape}: {escape: Function}) {
	useInput((input, key) => {
		if (key.escape) {
			escape()
		} else if (input) {
		}
	})
}
export function inputFieldModeMap({accept}: {accept: Function}) {
	useInput((input, key) => {
		if (key.return) {
			accept()
		} else if (input) {
		}
	})
}

export type KeyMap = {[key: string]: CME}
export function guessMapFromSetters(setters: Array<SetterData>): KeyMap {
	const map: KeyMap = {}
	setters.forEach((s: SetterData) => {
		map[s.short] = new CME(s.description, () => s.toggle())
	})
	return map
}

export function upDownNav(up?: Function, down?: Function) {
	const {focusNext, focusPrevious} = useFocusManager()
	function processKey(k: Key, i: string) {
		if (k.upArrow || i === 'k') {
			focusPrevious()
			if (up) {
				up()
			}
		}
		if (k.downArrow || i === 'j') {
			focusNext()
			if (down) {
				down()
			}
		}
	}
	return processKey
}

export function useBackModeMap(back: Function) {
	return {
		b: new CME('Back', () => back()),
	}
}
export function useAbortMap(abort: Function) {
	return {
		b: new CME('Back', () => abort()),
	}
}
export function useCustomInput(map: {[key: string]: CME}, noNav?: boolean) {
	const nav = noNav || false ? () => {} : upDownNav()
	return useInput((input, k) => {
		nav(k, input)
		const i: keyof typeof map = input
		if (map[i]) {
			//@ts-ignore
			map[i].exec()
		}
	})
}
