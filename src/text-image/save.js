import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
	const { images, rounded } = attributes;

	return (
		<div
			{...useBlockProps.save({
				className: "text-image-container",
			})}
		>
			<div className="text-outer-container">
				<InnerBlocks.Content />
			</div>

			{images.length > 0 && (
				<div className={`image-container col-${images.length}`}>
					{images.map((image) => (
						<img
							className={rounded ? "corner-rounded" : ""}
							key={image.id}
							src={image.url}
							alt={image.alt}
							srcset={image.srcset}
							sizes={`(max-width: 980px) 100vw, ${
								images.length > 1 ? "25vw" : "50vw"
							}`}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Save;
