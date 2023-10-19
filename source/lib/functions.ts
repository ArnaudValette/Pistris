import {ExecException, exec, spawn} from 'child_process'

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

export type SpawnArgs = {c: string[]; fail: Function; success: Function}
export function runDockerAndExit({c, fail, success}: SpawnArgs) {
	const dkProc = spawn('docker', c, {
		stdio: 'inherit',
	})
	dkProc.on('exit', () => success())
	dkProc.on('error', err => fail(err))
}

export function handleError({error}: {error: ExecException}) {
	console.log(error)
	return error
}
