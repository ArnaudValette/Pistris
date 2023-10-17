import {useApp} from 'ink'
import {RouterProps} from '../../app.js'

export function helpModeMap({setMode}: RouterProps) {
	const {exit} = useApp()
	return {
		q: () => exit(),
		i: () => setMode('image'),
		c: () => setMode('conts'),
		a: () => setMode('conts-all'),
		b: () => setMode('build'),
	}
}
export function imageModeMap({
	setMode,
	remove,
	run,
}: RouterProps & {remove: Function; run: Function}) {
	const {exit} = useApp()
	return {
		q: () => exit(),
		b: () => setMode('init'),
		r: () => remove(),
		R: () => run(),
	}
}
