import React, {useState} from 'react';
import { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Box } from '@material-ui/core';

export default function CreateComment ({
	onSubmit
}) {
	const [text, setText] = useState("");

	const handleCommentText = (text) => {
		setText(text);
	};
	
	const addComment = () => {
		onSubmit(text);
		setText('');
	}
	
	return <Fragment>
		<Box display={"flex"}>
			<TextField
				onChange={e => handleCommentText(e.target.value)}
				value={text}
				id="outlined-basic usermsg"
				placeholder="Leave a comment..."
				variant="outlined"
				className="textFld"
				multiline
			/>
			<Button id={'post-btn'} variant="contained" color="primary" onClick={addComment}>
				Post
			</Button>
		</Box>
	</Fragment>
}
