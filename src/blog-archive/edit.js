/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * WordPress dependencies
 */
import { useState, useEffect } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Editor styles
 */
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const [posts, setPosts] = useState([]);
	const blockProps = useBlockProps();

	useEffect(() => {
		apiFetch({ path: "/wp/v2/posts?per_page=5&_embed" }).then((posts) => {
			setAttributes({ posts });
			setPosts(posts);
		});
	}, []);

	function generateExcerpt(text, length = 150) {
		if (!text) return "";
		const cleanText = text.replace(/<[^>]*>/g, "");

		if (cleanText.length <= length) {
			return cleanText;
		} else {
			const excerpt = cleanText.substr(0, length - 3).trim() + "...";
			return excerpt;
		}
	}

	return (
		<div {...blockProps}>
			{posts.length === 0 ? (
				<p>{__("Loading...", "blog-archive")}</p>
			) : (
				<div className="blog-container">
					{posts.map((post) => (
						<article key={post.id} className="blogpost">
							{post._embedded["wp:featuredmedia"] &&
								post._embedded["wp:featuredmedia"][0].media_details.sizes
									.blogthumb && (
									<img
										src={
											post._embedded["wp:featuredmedia"][0].media_details.sizes
												.blogthumb.source_url
										}
										alt={post._embedded["wp:featuredmedia"][0].alt_text}
										width="400"
										height="auto"
									/>
								)}
							<div className="text-container">
								<h3>{post.title.rendered}</h3>
								<p>{generateExcerpt(post.excerpt.rendered)}</p>
							</div>
						</article>
					))}
				</div>
			)}
		</div>
	);
}
