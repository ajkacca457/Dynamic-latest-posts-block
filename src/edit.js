import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import { useSelect } from '@wordpress/data';
import moment from 'moment';

export default function Edit({ attributes, setAttributes }) {

	const { numberOfPosts } = attributes;

	const posts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'post', { per_page: numberOfPosts, _embed: true, order: 'asc' });
	}, [numberOfPosts]
	);

	console.log(posts);

	return (
		<>
			<div {...useBlockProps()}>
				<div>
					<h2>{__('Latest Posts', 'dynamic-latest-posts-block')}</h2>
					{posts && posts.map((post) => {
						return (
							<>
								{post.title && <h3><a href={post.link}>{post.title.raw}</a></h3>}
								{post.excerpt && <p>{post.excerpt.raw}</p>}
								{post.date && <p>{moment(post.date).format('MMMM Do YYYY, h:mm:ss a')}</p>}
							</>
						);
					})}
				</div>
			</div>
		</>
	);
}
