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
import { PanelBody, RadioControl, ToggleControl } from "@wordpress/components";

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
	const { background, isTrans, position, transFrom } = attributes;

	const allowedBlocks = ["cjp-blocks/page-width", {}];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "text-container")}>
					<RadioControl
						label="Choose section colour:"
						selected={background}
						options={[
							{ label: "Clear", value: "background-clear" },
							{ label: "Blue", value: "background-blue-600" },
							{ label: "Peach", value: "background-peach-800" },
							{ label: "Cream", value: "background-peach-100" },
						]}
						onChange={(value) => setAttributes({ background: value })}
					/>
				</PanelBody>
				<PanelBody title={__("Transition", "text-container")}>
					<ToggleControl
						checked={!!isTrans}
						label="Show Transition"
						onChange={() =>
							setAttributes({
								isTrans: !isTrans,
							})
						}
					/>
					{isTrans && (
						<>
							<RadioControl
								label="Position:"
								selected={position}
								options={[
									{ label: "Top", value: "position-top" },
									{ label: "Bottom", value: "position-bottom" },
								]}
								onChange={(value) => setAttributes({ position: value })}
							/>
							<RadioControl
								label="Transitioning from:"
								selected={transFrom}
								options={[
									{ label: "Clear", value: "background-clear" },
									{ label: "Blue", value: "background-blue-600" },
									{ label: "Peach", value: "background-peach-800" },
									{ label: "Cream", value: "background-peach-100" },
								]}
								onChange={(value) => setAttributes({ transFrom: value })}
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>
			<section
				{...useBlockProps({
					className: `${background ? `${background}` : ""}`,
				})}
			>
				{isTrans && position === "position-top" && (
					<div class="svg-container">
						<svg viewBox="0 0 100 50">
							<polygon points="0,50 50,0 100,50" />
						</svg>
					</div>
				)}

				<InnerBlocks allowedBlocks={allowedBlocks} />

				{isTrans && position === "position-bottom" && (
					<div class="svg-container">
						<svg viewBox="0 0 100 50">
							<polygon points="0,0 100,0 50,50" />
						</svg>
					</div>
				)}
			</section>
		</>
	);
}
