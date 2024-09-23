const Save = ({ attributes }) => {
	return (
		<div>
			<p style="margin-bottom: 4rem;">WORKING?</p>
			<pre>{JSON.stringify(attributes, null, 2)}</pre>
		</div>
	);
};

export default Save;
