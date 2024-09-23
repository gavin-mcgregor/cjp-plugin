import { useBlockProps } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
	const { images, rounded } = attributes;

	return (
		<div
			{...useBlockProps.save({
				className: "offset-image-container",
			})}
		>
			{images.length > 0 &&
				images.map((image) => (
					<img
						className={rounded ? "corner-rounded" : ""}
						key={image.id}
						src={image.url}
						alt={image.alt}
						srcset={image.srcset}
						sizes={`(max-width: 980px) 50vw, 50vw`}
					/>
				))}
		</div>
	);
};

export default Save;
