/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * The save function defines the way in which your block is saved in the database.
 * This represents what is rendered on the frontend.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */

import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { images, backgroundTo, backgroundFrom } = attributes;

	const blockProps = useBlockProps.save({
		className: `from-${backgroundFrom} to-${backgroundTo} ${backgroundTo} conclusion-container`,
	});

	return (
		<section {...blockProps}>
			<div className="page-extra">
				{images.length > 0 && (
					<div className={`image-container`}>
						{images.map((image) => (
							<img
								key={image.id}
								src={image.url}
								alt={image.alt}
								srcset={image.srcset}
								sizes={`(max-width: 980px) 100vw, 100vw`}
							/>
						))}
					</div>
				)}
			</div>
			<div className="page-width-lines">
				<InnerBlocks.Content />
				<p class="text-script text-right">Let’s Chat</p>
				<div className="spacer">
					<hr />
				</div>
			</div>
		</section>
	);
}
