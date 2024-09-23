<?php

/**
 * Plugin Name:       WCRH Custom Blocks
 * Description:       Blocks to integrate with the custom theme.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Gavin McGregor
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cjp-blocks
 *
 * @package CjpBlocks
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

//  Register Blocks
function cjp_blocks_cjp_blocks_block_init()
{
	// register_block_type(__DIR__ . '/build/copyright');
	register_block_type(__DIR__ . '/build/debug-image');
	register_block_type(__DIR__ . '/build/text-container');
	register_block_type(__DIR__ . '/build/page-width');
	register_block_type(__DIR__ . '/build/spacer');
	register_block_type(__DIR__ . '/build/section');
	register_block_type(__DIR__ . '/build/masonry');
	register_block_type(__DIR__ . '/build/text-image');
	register_block_type(__DIR__ . '/build/testimonial');
	register_block_type(__DIR__ . '/build/conclusion');
	register_block_type(__DIR__ . '/build/offset-image');
	register_block_type(__DIR__ . '/build/toggle');
	register_block_type(__DIR__ . '/build/toggle-container');
	register_block_type(__DIR__ . '/build/packages-container');
	register_block_type(__DIR__ . '/build/blog-archive');
	register_block_type(__DIR__ . '/build/post-container');
	register_block_type(__DIR__ . '/build/contact-form');
}
add_action('init', 'cjp_blocks_cjp_blocks_block_init');


// Register Category
function register_custom_block_category($categories, $post)
{
	return array_merge(
		array(
			array(
				'slug'  => 'custom-block',
				'title' => __('Custom Blocks', 'cjp-blocks '),
			),
			array(
				'slug'  => 'custom-layout',
				'title' => __('Custom Layouts', 'cjp-blocks '),
			),
		),
		$categories
	);
}
add_filter('block_categories_all', 'register_custom_block_category', 10, 2);

// Enqueue the block editor stylesheet
function enqueue_block_editor_styles()
{

	wp_enqueue_style(
		'block-editor-styles',
		plugins_url('basic-editor-styles.css', __FILE__),
		array('wp-edit-blocks'),
		wp_get_theme()->get('Version')
	);
}
add_action('enqueue_block_editor_assets', 'enqueue_block_editor_styles');

// Trim Characters
function wp_trim_characters($text, $limit, $append = '...')
{
	if (strlen($text) > $limit) {
		$text = substr($text, 0, $limit);
		$text = substr($text, 0, strrpos($text, ' ')); // Trim at last word boundary
		$text = $text . $append;
	}
	return $text;
}

// Email Form
add_action('init', 'handle_contact_form_submission');
function handle_contact_form_submission()
{
	if (isset($_POST['submit'])) {

		$form = array(); // Get data

		$form['name-main'] = sanitize_text_field($_POST['name-main']);
		$form['name-alt'] = sanitize_text_field($_POST['name-alt']);

		$form['email'] = sanitize_email($_POST['email']);
		$form['phone'] = sanitize_text_field($_POST['phone']);

		$form['venue'] = sanitize_text_field($_POST['venue']);
		$form['date'] = sanitize_text_field($_POST['date']);

		$form['full-day'] = ($_POST['full-day']);
		$form['half-day'] = ($_POST['half-day']);
		$form['micro-day'] = ($_POST['micro-day']);
		$form['short-film'] = ($_POST['short-film']);
		$form['engagement-session'] = ($_POST['engagement-session']);

		$form['message'] = sanitize_textarea_field($_POST['message']);
		$form['referal'] = sanitize_text_field($_POST['referal']);

		// Add data to email

		$message = "";
		$message  .= "<p>" . "Full Name: " . $form['name-main'] . "</p>";
		$message  .= "<p>" . "Partners Name: " . $form['name-alt'] . "</p>";

		$message .= "<p>" . "Email Address: " . $form['email'] . "</p>";
		$message .= "<p>" . "Phone Number: " . $form['phone'] . "</p>";

		$message .= "<p>" . "Event Venue: " . $form['venue'] . "</p>";
		$message .= "<p>" . "Event Date: " . $form['date'] . "</p>";

		if (
			isset($form['half-day']) ||
			isset($form['half-day']) ||
			isset($form['micro-day']) ||
			isset($form['short-film']) ||
			isset($form['engagement-session'])
		) {
			$message .= "<p>" . "I'm Interested in: ";
			if (isset($form['full-day'])) {
				$message .= "<span>Full Day Wedding, </span>";
			}
			if (isset($form['half-day'])) {
				$message .= "<span>Half Day Wedding, </span>";
			}
			if (isset($form['micro-day'])) {
				$message .= "<span>Micro Wedding, </span>";
			}
			if (isset($form['short-film'])) {
				$message .= "<span>Cinematic Short Film, </span>";
			}
			if (isset($form['engagement-session'])) {
				$message .= "<span>Engagement Session, </span>";
			}
			$message .= "</p>";
		}

		$message .= "<p>" . "Message: " . $form['message'] . "</p>";

		$headers = 'From: <hello@wecanrebuildhim.com>';

		$subject = 'Contact Form Submission | ' . home_url();
		$send_to = 'hello@wecanrebuildhim.com';

		if (wp_mail($send_to, $subject, $message, $headers)) {
			wp_redirect('/form-success/');
			exit;
		}
	}
}

// Function to create the form success page
function create_form_success_page()
{

	$page_slug = 'form-success';
	$page_exists = get_page_by_path($page_slug);

	if (!$page_exists) {
		$page_data = array(
			'post_title'    => 'Form Success',
			'post_content'  => '<main style="min-height: 80vh;"><section><div class="page-width"><div class="spacer"><hr /></div><div class="text-container"><h1 class="text-display">Your Email has been sent.</h1><p>Emails sent over the weekend will be answered on Monday. Please keep an eye your spam folder for my reply! <a class="text-underline" href="/">Back to the homepage?</a></p></div><div class="spacer"><hr /></div></div></section></main>',
			'post_status'   => 'publish',
			'post_type'     => 'page',
			'post_name'     => $page_slug,
		);

		$page_id = wp_insert_post($page_data);
		if ($page_id && !is_wp_error($page_id)) {
			update_post_meta($page_id, '_wp_page_template', 'success-template.php');
		}
	}
}

register_activation_hook(__FILE__, 'create_form_success_page');
