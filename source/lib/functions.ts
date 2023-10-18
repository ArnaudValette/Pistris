import {exec} from 'child_process'

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
	})
}
