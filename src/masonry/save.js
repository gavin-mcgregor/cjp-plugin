import { useBlockProps } from "@wordpress/block-editor";

export default function Save({ attributes }) {
	const { images, columns } = attributes;

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
	const columnClass = columns ? `col-${columns}` : "";

	return (
		<div
			{...useBlockProps.save({
				className: `masonry-container ${columnClass}`,
			})}
		>
			{images.length > 0 &&
				finalColumns.map((cols, index) => (
					<div className="col" key={`col-${index}`}>
						{cols.map((image) => (
							<img
								key={image.id}
								src={image.url}
								alt={image.alt}
								srcset={image.srcset}
								sizes={`(max-width: 980px) 50vw, ${
									columns === "2" ? "50vw" : "25vw"
								}`}
							/>
						))}
					</div>
				))}
		</div>
	);
}
