/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	InspectorControls,
	useBlockProps,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import { PanelBody, RadioControl, Button } from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { images, backgroundFrom, backgroundTo } = attributes;

	const blockProps = useBlockProps({
		className: `${backgroundTo ? `${backgroundTo}` : ""} conclusion-container`,
	});

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
				srcset: `
				${image.sizes.medium.url} ${image.sizes.medium.width}w, 
				${image.sizes.large.url} ${image.sizes.large.width}w, 
				${image.sizes.full.url} ${image.sizes.full.width}w,
				`,
			})),
		];
		setAttributes({ images: updatedImages });
	};

	const removeImage = (imageId) => {
		const newImages = images.filter((image) => image.id !== imageId);
		setAttributes({ images: newImages });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "text-container")}>
					<RadioControl
						label="Colour of above section:"
						selected={backgroundFrom}
						options={[
							{ label: "Clear", value: "background-clear" },
							{ label: "Blue", value: "background-blue-600" },
							{ label: "Peach", value: "background-peach-800" },
							{ label: "Cream", value: "background-peach-100" },
						]}
						onChange={(value) => setAttributes({ backgroundFrom: value })}
					/>
					<RadioControl
						label="Colour of main background"
						selected={backgroundTo}
						options={[
							{ label: "Clear", value: "background-clear" },
							{ label: "Blue", value: "background-blue-600" },
							{ label: "Peach", value: "background-peach-800" },
							{ label: "Cream", value: "background-peach-100" },
						]}
						onChange={(value) => setAttributes({ backgroundTo: value })}
					/>
				</PanelBody>
				<PanelBody title={__("Image Upload", "text-image")}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImages}
							allowedTypes={["image"]}
							multiple
							render={({ open }) => (
								<Button variant="primary" onClick={open}>
									{__("Select Images", "text-image")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>
				<PanelBody title={__("Image Settings", "text-image")}>
					{images.length > 0 && (
						<ul className="gallery-order">
							{images.map((image) => (
								<li key={image.id}>
									<img src={image.url} alt={image.alt} />
									<div className="meta-info">
										<p>Image ID: {image.id}</p>
										<Button
											variant="secondary"
											onClick={() => removeImage(image.id)}
										>
											{__("Remove", "text-image")}
										</Button>
									</div>
								</li>
							))}
						</ul>
					)}
				</PanelBody>
			</InspectorControls>
			<section {...blockProps}>
				<div class="page-extra wp-block-cjp-blocks-page-width wp-block">
					{images.length > 0 && (
						<div className={`image-container`}>
							{images.map((image) => (
								<img key={image.id} src={image.url} alt={image.alt} />
							))}
						</div>
					)}
				</div>
				<div class="page-width wp-block-cjp-blocks-page-width wp-block">
					<InnerBlocks />
				</div>
			</section>
		</>
	);
}
