/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import {
	PanelBody,
	TextControl,
	TextareaControl,
	Button,
	ToggleControl,
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
	const { packages } = attributes;

	const addListText = (index) => {
		const newPackages = [...packages];
		newPackages[index].list = [...(newPackages[index].list || []), ""];
		setAttributes({ packages: newPackages });
	};

	const removeListText = (packageIndex, listIndex) => {
		const newPackages = [...packages];
		newPackages[packageIndex].list.splice(listIndex, 1);
		setAttributes({ packages: newPackages });
	};

	const updatePackageTitle = (index, value) => {
		const newPackages = [...packages];
		newPackages[index] = { ...newPackages[index], title: value };
		setAttributes({ packages: newPackages });
	};

	const updatePackagePrice = (index, value) => {
		const newPackages = [...packages];
		newPackages[index] = { ...newPackages[index], price: value };
		setAttributes({ packages: newPackages });
	};

	const updatePackageCol = (index, value) => {
		const newPackages = [...packages];
		newPackages[index] = { ...newPackages[index], columns: value };
		setAttributes({ packages: newPackages });
	};

	const updatePackageContent = (index, value) => {
		const newPackages = [...packages];
		newPackages[index] = { ...newPackages[index], content: value };
		setAttributes({ packages: newPackages });
	};

	const removePackage = (index) => {
		const newPackages = [...packages];
		newPackages.splice(index, 1);
		setAttributes({ packages: newPackages });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "packages-container")}>
					<Button
						variant="primary"
						onClick={() => {
							const newPackage = {
								title: "",
								price: "",
								content: "",
								list: [],
							};
							setAttributes({ packages: [...packages, newPackage] });
						}}
					>
						{__("Add Package", "packages-container")}
					</Button>
				</PanelBody>
				{packages &&
					packages.map((packageItem, index) => (
						<PanelBody
							key={index}
							title={__(`Package (${index + 1})`, "packages-container")}
						>
							<div style={{ marginBottom: "20px" }}>
								<TextControl
									label="Title"
									value={packageItem.title}
									onChange={(value) => updatePackageTitle(index, value)}
								/>
								<TextControl
									label="Price"
									value={packageItem.price}
									onChange={(value) => updatePackagePrice(index, value)}
								/>
								<ToggleControl
									checked={!!packageItem.columns}
									label={"Span 2 Columns"}
									onChange={(value) => updatePackageCol(index, value)}
								/>
								<TextareaControl
									label="Description"
									value={packageItem.content}
									onChange={(value) => updatePackageContent(index, value)}
								/>
								<div style={{ marginBottom: "1rem" }}>
									<p>LIST:</p>
									{packageItem.list &&
										packageItem.list.map((item, listIndex) => (
											<div key={listIndex} className="list-order">
												<TextControl
													value={item}
													className="list-input"
													onChange={(value) => {
														const newPackages = [...packages];
														newPackages[index].list[listIndex] = value;
														setAttributes({ packages: newPackages });
													}}
												/>
												<Button
													variant="secondary"
													onClick={() => removeListText(index, listIndex)}
												>
													{__("Remove", "packages-container")}
												</Button>
											</div>
										))}
									<Button
										variant="primary"
										onClick={() => addListText(index)}
										style={{ marginTop: "1rem" }}
									>
										{__("Add List Item", "packages-container")}
									</Button>
								</div>

								<Button
									variant="secondary"
									onClick={() => removePackage(index)}
								>
									{__("Remove Package", "packages-container")}
								</Button>
							</div>
						</PanelBody>
					))}
			</InspectorControls>
			<div {...useBlockProps({ className: "package-container" })}>
				{packages &&
					packages.map((packSingle, index) => (
						<div key={index} className="package-single">
							<h3>{packSingle.title}</h3>
							<p>{packSingle.price}</p>
							<p>{packSingle.content}</p>
							{packSingle.list && (
								<ul>
									{packSingle.list.map((item, listIndex) => (
										<li key={listIndex}>{item}</li>
									))}
								</ul>
							)}
						</div>
					))}
			</div>
		</>
	);
}
