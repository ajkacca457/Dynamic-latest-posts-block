import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import './editor.scss';
import { useSelect } from '@wordpress/data';
import moment from 'moment';
import { PanelBody, QueryControls, ToggleControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {

	const { numberOfPosts, displayThumbnail } = attributes;

	const posts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'post', { per_page: numberOfPosts, _embed: true, order: 'asc' });
	}, [numberOfPosts]
	);

	console.log(posts);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Latest Posts Settings', 'dynamic-latest-posts-block')}>
					<QueryControls
						numberOfItems={numberOfPosts}
						onNumberOfItemsChange={(newNumber) => setAttributes({ numberOfPosts: newNumber })}
						minItems={1}
						maxItems={100}
					/>

					<ToggleControl
						label={__("Display Image", "dynamic-latest-posts-block")}
						checked={displayThumbnail}
						onChange={(newDisplayThumbnail) => setAttributes({ displayThumbnail: newDisplayThumbnail })}
					/>

				</PanelBody>

			</InspectorControls>

			<div {...useBlockProps()}>
				<div>
					<h2>{__('Latest Posts', 'dynamic-latest-posts-block')}</h2>
					{posts && posts.map((post) => {

						const featuredImage = post?._embedded['wp:featuredmedia']?.[0]?.media_details?.sizes?.large?.source_url;

						return (
							<>
								{post.title && <h3><a href={post.link}>{post.title.raw}</a></h3>}
								{post.excerpt && <p>{post.excerpt.raw}</p>}
								{displayThumbnail && featuredImage && <img src={featuredImage} alt={post.title.raw} />}
								{post.date && <p>{moment(post.date).format('MMMM Do YYYY, h:mm:ss a')}</p>}
							</>
						);
					})}
				</div>
			</div>
		</>
	);
}
