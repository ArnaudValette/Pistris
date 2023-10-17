import {Key, useApp, useFocusManager} from 'ink'
import {RouterProps} from '../../app.js'

export class CME {
	d: string
	exec: Function
	constructor(d: string, exec: Function) {
		this.d = d
		this.exec = exec
	}
}
export function helpModeMap({setMode}: RouterProps) {
	const {exit} = useApp()
	return {
		q: new CME('quit', () => exit()),
		i: new CME('list images', () => setMode('image')),
		c: new CME('list containers', () => setMode('conts')),
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
		q: new CME('quit', () => exit()),
		b: new CME('home', () => setMode('init')),
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
		q: new CME('quit', () => exit()),
		b: new CME('home', () => setMode('init')),
		d: new CME('remove image', () => remove()),
		o: new CME('Run image', () => run()),
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
