<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
// get_block_wrapper_attributes();

?>
<div class="testimonial-container text-center">

	<?php if (!empty($attributes['quote'])) : ?>
		<p class="text-display">“<?php echo $attributes['quote']; ?>”</p>
	<?php endif; ?>

	<?php if (!empty($attributes['quote'])) : ?>
		<p class="author">— <?php echo $attributes['author']; ?></p>
	<?php endif; ?>

</div>