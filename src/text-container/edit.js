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
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import {
	PanelBody,
	TextControl,
	TextareaControl,
	Button,
	RadioControl,
} from "@wordpress/components";

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
	const {
		subtitle,
		title,
		display,
		body,
		buttonUrl,
		buttonTarget,
		buttonText,
	} = attributes;

	const addTextarea = () => {
		const newBody = [...(body || []), ""];
		setAttributes({ body: newBody });
	};

	const updateTextarea = (index, value) => {
		const newBody = [...body];
		newBody[index] = value;
		setAttributes({ body: newBody });
	};

	const removeTextarea = (index) => {
		const newBody = [...body];
		newBody.splice(index, 1);
		setAttributes({ body: newBody });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Text Content", "text-container")}>
					<TextControl
						label="Subtitle"
						value={subtitle || ""}
						onChange={(value) => setAttributes({ subtitle: value })}
					/>
					<TextControl
						label="Main Title"
						value={title || ""}
						onChange={(value) => setAttributes({ title: value })}
					/>
					<TextControl
						label="Display Title"
						value={display || ""}
						onChange={(value) => setAttributes({ display: value })}
					/>
					{body &&
						body.map((text, index) => (
							<div key={index} style={{ marginBottom: "20px" }}>
								<TextareaControl
									label="Body Text"
									value={text}
									onChange={(value) => updateTextarea(index, value)}
								/>
								<Button
									variant="secondary"
									onClick={() => removeTextarea(index)}
								>
									{__("Remove Paragraph", "text-container")}
								</Button>
							</div>
						))}
					<Button variant="primary" onClick={addTextarea}>
						{__("Add Paragraph", "text-container")}
					</Button>
				</PanelBody>
				<PanelBody title={__("Button", "text-container")}>
					<TextControl
						label="Url"
						value={buttonUrl || ""}
						onChange={(value) => setAttributes({ buttonUrl: value })}
					/>
					<TextControl
						label="Text"
						value={buttonText || ""}
						onChange={(value) => setAttributes({ buttonText: value })}
					/>
					<RadioControl
						label="Open Link in:"
						selected={buttonTarget}
						options={[
							{ label: "New Tab", value: "_blank" },
							{ label: "Same Tab ", value: "_self" },
						]}
						onChange={(value) => setAttributes({ buttonTarget: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<div class="text-container">
					{subtitle && (
						<p class="text-subtitle">
							<em>{subtitle}</em>
						</p>
					)}
					{title && <h3 class="text-title">{title}</h3>}
					{display && <h2 class="text-display">{display}</h2>}
					{body && body.map((p) => <p>{p}</p>)}
					{buttonText && buttonUrl && (
						<a
							class="cta-btn"
							href={buttonUrl}
							target={buttonTarget ? buttonTarget : "_self"}
						>
							{buttonText}
						</a>
					)}
				</div>
			</div>
		</>
	);
}
