import {ExecException, exec} from 'child_process'

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

export function handleError({error}: {error: ExecException}) {
	console.log(error)
	return error
}
