import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
	const { width } = attributes;

	return (
		<div {...useBlockProps.save({ className: `${width ? `${width}` : ""}` })}>
			<InnerBlocks.Content />
		</div>
	);
};

export default Save;
