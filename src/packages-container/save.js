import { useBlockProps } from "@wordpress/block-editor";

const Save = ({ attributes }) => {
	const { packages } = attributes;

	const spanOnePackages = packages.filter((item) => !item.columns);
	const spanTwoPackages = packages.filter((item) => item.columns);

	return (
		<div {...useBlockProps.save({ className: `packages-container` })}>
			{spanOnePackages &&
				spanOnePackages.map((packSingle, index) => (
					<div key={index} className="package-card">
						<div className="text-container">
							{packSingle.title && packSingle.price && (
								<>
									<h3 className="text-title">{packSingle.title}</h3>
									<p className="package-price">{packSingle.price}</p>
								</>
							)}
							{packSingle.content && <p>{packSingle.content}</p>}
							{packSingle.list && (
								<ul>
									{packSingle.list.map((item, listIndex) => (
										<li key={listIndex}>{item}</li>
									))}
								</ul>
							)}
						</div>
					</div>
				))}

			{spanTwoPackages && (
				<div className="col">
					{spanTwoPackages.map((packSingle, index) => (
						<div key={index} className="package-card">
							<div className="text-container">
								{packSingle.title && packSingle.price && (
									<>
										<h3 className="text-title">{packSingle.title}</h3>
										<p className="package-price">{packSingle.price}</p>
									</>
								)}
								{packSingle.content && <p>{packSingle.content}</p>}
								{packSingle.list && (
									<ul>
										{packSingle.list.map((item, listIndex) => (
											<li key={listIndex}>{item}</li>
										))}
									</ul>
								)}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Save;
