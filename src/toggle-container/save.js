import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

const Save = () => {
	return (
		<div {...useBlockProps.save({ className: `toggle-container` })}>
			<InnerBlocks.Content />
		</div>
	);
};

export default Save;
