import {useApp} from 'ink'
import {RouterProps} from '../../app.js'

class CME {
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
		c: new CME('list active containers', () => setMode('conts')),
		a: new CME('list all containers', () => setMode('conts-all')),
		b: new CME('build from dir', () => setMode('build')),
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
		r: new CME('remove image', () => remove()),
		R: new CME('Run image', () => run()),
	}
}
