import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
} from "@wordpress/block-editor";
import { Button, PanelBody } from "@wordpress/components";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { images } = attributes;

	const onSelectImages = (newImages) => {
		const existingImageIds = images.map((image) => image.id);
		const newUniqueImages = newImages.filter(
			(newImage) => !existingImageIds.includes(newImage.id),
		);
		const updatedImages = [
			...images,
			...newUniqueImages.map((image) => ({
				id: image.id,
				url: image.url,
				alt: image.alt,
				data: image,
			})),
		];
		setAttributes({ images: updatedImages });
	};

	const onDeleteAllImages = () => {
		setAttributes({ images: [] });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Image Upload", "masonry")}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImages}
							allowedTypes={["image"]}
							multiple
							gallery
							render={({ open }) => (
								<Button variant="primary" onClick={open}>
									{__("Select Images", "masonry")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>
				<PanelBody>
					<Button variant="secondary" onClick={onDeleteAllImages}>
						{__("Delete All Images", "masonry")}
					</Button>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps({ className: "debug-container" })}>
				{images.map((image) => (
					<div key={image.id} className="debug-item">
						<img
							src={image.url}
							alt={image.alt}
							style={{ maxWidth: "100%", height: "auto" }}
						/>
						<pre>{JSON.stringify(image.data, null, 2)}</pre>
					</div>
				))}
			</div>
		</>
	);
}
