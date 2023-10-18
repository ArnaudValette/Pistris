import {useInput, Key, useApp, useFocusManager} from 'ink'
import {RouterProps} from '../../app.js'

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

export function contsModeMap({
	setMode,
	remove,
	start,
	kill,
	filter,
}: RouterProps & {
	remove: Function
	start: Function
	kill: Function
	filter: Function
}) {
	const {exit} = useApp()
	return {
		q: new Q(exit),
		b: new CME('home', () => setMode('Home')),
		i: new CME('list images', () => setMode('Images')),
		d: new CME('remove', () => remove()),
		o: new CME('start', () => start()),
		x: new CME('kill', () => kill()),
		f: new CME('show/hide active', () => filter()),
	}
}

export function imageModeMap({
	setMode,
	remove,
	run,
}: RouterProps & {remove: Function; run: Function}) {
	const {exit} = useApp()
	return {
		q: new Q(exit),
		b: new CME('home', () => setMode('Home')),
		c: new CME('list containers', () => setMode('Containers')),
		d: new CME('remove image', () => remove()),
		o: new CME('Run image', () => run()),
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

export function upDownNav() {
	const {focusNext, focusPrevious} = useFocusManager()
	function processKey(k: Key, i: string) {
		if (k.upArrow || i === 'k') {
			focusPrevious()
		}
		if (k.downArrow || i === 'j') {
			focusNext()
		}
	}
	return processKey
}

export function useCustomInput(map: {[key: string]: CME}) {
	const nav = upDownNav()
	return useInput((input, k) => {
		nav(k, input)
		const i: keyof typeof map = input
		if (map[i]) {
			//@ts-ignore
			map[i].exec()
		}
	})
}
