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
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";

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
export default function Edit() {
	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Information")}>
					<p>
						The form indicated here is for illustration purposes, the form on
						the live site will be different.
					</p>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<div className="label-row">
					<label for="name">Name:</label>
					<input type="text" id="name" name="name" required />
				</div>
				<div className="label-row">
					<label for="email">Email:</label>
					<input type="email" id="email" name="email" required />
				</div>
				<div className="label-row">
					<label for="message">Message:</label>
					<textarea id="message" name="message" required></textarea>
				</div>
				<div className="label-row">
					<input type="hidden" name="action" value="submit_contact_form" />
				</div>
				<div>
					<input type="submit" value="Submit" />
				</div>
			</div>
		</>
	);
}
