import { ReactSortable } from "react-sortablejs";
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
} from "@wordpress/block-editor";
import { Button, PanelBody, RadioControl } from "@wordpress/components";
import React, { useState, useEffect } from "react";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { images, columns } = attributes;
	const [imageList, setImageList] = useState(images);

	useEffect(() => {
		setImageList(images);
	}, [images]);

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

	const onSortEnd = (newOrder) => {
		const newImages = newOrder.map((item) =>
			images.find((img) => img.id === item.id),
		);
		setAttributes({ images: newImages });
	};

	function distributeIntoColumns(items, cols) {
		const numColumns = parseInt(cols, 10);
		const columnArrays = Array.from({ length: numColumns }, () => []);
		items.forEach((item, index) => {
			const columnIndex = index % numColumns;
			columnArrays[columnIndex].push(item);
		});
		return columnArrays;
	}

	const finalColumns = distributeIntoColumns(images, columns);

	return (
		<>
			<InspectorControls>
				{columns && (
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
				)}
				<PanelBody title={__("Grid Settings", "masonry")}>
					<RadioControl
						label="How many columns?"
						selected={columns}
						options={[
							{ label: "Two", value: "2" },
							{ label: "Four", value: "4" },
						]}
						onChange={(value) => setAttributes({ columns: value })}
					/>
				</PanelBody>
				<PanelBody title={__("Gallery Order", "masonry")}>
					{imageList.length > 0 && (
						<ReactSortable
							list={imageList}
							setList={(newOrder) => {
								setImageList(newOrder);
								onSortEnd(newOrder);
							}}
							animation={200}
							easing="ease-out"
							className="masonry-order-list"
						>
							{imageList.map((image) => (
								<li key={image.id}>
									<img src={image.url} alt={image.alt} />
									<div className="meta-info">
										<p>Image ID: {image.id}</p>
										<Button
											variant="secondary"
											onClick={() => removeImage(image.id)}
										>
											{__("Remove", "my-image-array-block")}
										</Button>
									</div>
								</li>
							))}
						</ReactSortable>
					)}
				</PanelBody>
			</InspectorControls>
			<div
				{...useBlockProps({
					className: ["masonry-container", `col-${columns}`],
				})}
			>
				{images.length > 0 &&
					finalColumns.map((cols, index) => (
						<div className="col" key={`col-${index}`}>
							{cols.map((image) => (
								<img key={image.id} src={image.url} alt={image.alt} />
							))}
						</div>
					))}
			</div>
		</>
	);
}
