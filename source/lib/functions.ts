import {ExecException, exec} from 'child_process'
import {app} from '../cli.js'

export function runCommand({
	c,
	fail,
	success,
}: {
	c: string
	fail: Function
	success: Function
}) {
	exec(c, (error, stdout, stderr) => {
		if (stderr) {
			return fail({s: stderr, error})
		}
		if (stdout) {
			success()
		}
		return success()
	})
}

export type SpawnArgs = {
	c: string[]
	fail: Function
	detached?: boolean
}
export function runDockerAndExit({c, fail, detached}: SpawnArgs) {
	app.spawn('docker', c, {detached: detached, stdio: 'inherit'}, fail)
}

export function handleError({error}: {error: ExecException}) {
	console.log(error)
	return error
}
