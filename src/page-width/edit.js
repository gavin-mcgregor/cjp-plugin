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
import { PanelBody, RadioControl } from "@wordpress/components";

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
	const { width } = attributes;

	const getLabel = () => {
		if (width === "page-extra") {
			return "Extra Width";
		} else if (width === "page-full") {
			return "Full Width";
		} else {
			return "Normal Width";
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "text-container")}>
					<RadioControl
						label="Choose container width:"
						selected={width}
						options={[
							{ label: "Normal Width", value: "page-width" },
							{ label: "Extra Width", value: "page-extra" },
							{ label: "Full Width", value: "page-full" },
						]}
						onChange={(value) => setAttributes({ width: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div
				{...useBlockProps({
					className: `${width ? `${width}` : ""}`,
				})}
			>
				<div className={`${width || "page-width"} page-container`}>
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}
