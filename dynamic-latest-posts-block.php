<?php

/**
 * Plugin Name:       Dynamic Latest Posts Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dynamic-latest-posts-block
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

function dynamic_latest_posts_block_render_callback($attributes) {
	echo '<pre>';
	var_dump($attributes);
	echo '</pre>';
	return "Hello World";
}

function create_block_dynamic_latest_posts_block_block_init() {
	register_block_type(__DIR__ . '/build', array(
		'render_callback' => 'dynamic_latest_posts_block_render_callback',
	));
}
add_action('init', 'create_block_dynamic_latest_posts_block_block_init');
