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
} from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";

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
	const { title } = attributes;

	const allowedBlocks = ["core/paragraph", {}];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Toggle", "toggle")}>
					<TextControl
						label="Title"
						value={title || ""}
						onChange={(value) => setAttributes({ title: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps({ className: "toggle-single" })}>
				<h3 className="title">{title ? title : "Please add title"}</h3>
				<InnerBlocks allowedBlocks={allowedBlocks} />
			</div>
		</>
	);
}
