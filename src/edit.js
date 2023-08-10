import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import './editor.scss';
import { useSelect } from '@wordpress/data';
import moment from 'moment';
import { PanelBody, __experimentalNumberControl as NumberControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {

	const { numberOfPosts } = attributes;

	const posts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'post', { per_page: numberOfPosts, _embed: true, order: 'asc' });
	}, [numberOfPosts]
	);

	console.log(posts);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Latest Posts Settings', 'dynamic-latest-posts-block')}>
					<NumberControl
						label={__('Number of Posts', 'dynamic-latest-posts-block')}
						value={numberOfPosts}
						onChange={(numberOfPosts) => setAttributes({ numberOfPosts })}
						min={1}
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
								{featuredImage && <img src={featuredImage} alt={post.title.raw} />}
								{post.date && <p>{moment(post.date).format('MMMM Do YYYY, h:mm:ss a')}</p>}
							</>
						);
					})}
				</div>
			</div>
		</>
	);
}
