import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
	const { background, isTrans, position, transFrom } = attributes;

	return (
		<section
			{...useBlockProps.save({
				className: `${background ? `${background}` : ""}`,
			})}
		>
			{isTrans && position === "position-top" && (
				<div
					class={`trans-container${position ? ` ${position}` : ""}${
						transFrom ? ` from-${transFrom}` : ""
					}`}
				>
					<svg viewBox="0 0 1000 50">
						<polygon points="1000,0 1000,50 0,50" />
					</svg>
				</div>
			)}

			<InnerBlocks.Content />

			{isTrans && position === "position-bottom" && (
				<div
					class={`trans-container${position ? ` ${position}` : ""}${
						transFrom ? ` from-${transFrom}` : ""
					}`}
				>
					<svg viewBox="0 0 1000 50">
						<polygon points="0,0 1000,0 0,50" />
					</svg>
				</div>
			)}
		</section>
	);
};

export default Save;
