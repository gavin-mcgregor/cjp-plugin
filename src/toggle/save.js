import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
	const { title } = attributes;

	return (
		<div {...useBlockProps.save({ className: "toggle-single" })}>
			<button className="toggle-title text-title">
				{title && <span>{title}</span>}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 100 125"
					x="0px"
					y="0px"
				>
					<polygon points="30.83 100 80.83 50 30.83 0 19.17 11.67 57.5 50 19.17 88.33 30.83 100"></polygon>
				</svg>
			</button>
			<div className="toggle-content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Save;
