import React from 'react'
import {ImgSubProps} from './Image.js'
import {Box, Text} from 'ink'

export function RunImg({sel}: ImgSubProps) {
	return (
		<Box>
			<Text>{sel}</Text>
		</Box>
	)
}
