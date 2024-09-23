<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// echo get_block_wrapper_attributes();
?>

<div class="text-container">
	<?php if (!empty($attributes['subtitle'])) : ?>
		<p class="text-subtitle"><?php echo $attributes['subtitle'];  ?></p>
	<?php endif; ?>
	<?php if (!empty($attributes['title'])) : ?>
		<p class="text-title"><?php echo $attributes['title'];  ?></p>
	<?php endif; ?>
	<?php if (!empty($attributes['display'])) : ?>
		<p class="text-display"><?php echo $attributes['display'];  ?></p>
	<?php endif; ?>
	<?php if (!empty($attributes['body'])) : ?>
		<?php foreach ($attributes['body'] as $p) : ?>
			<p class="text-body"><?php echo $p  ?></p>
		<?php endforeach; ?>
	<?php endif; ?>
	<?php if (!empty($attributes['buttonUrl']) || !empty($attributes['buttonText'])) : ?>
		<a class="cta-btn" href="<?php echo $attributes['buttonUrl'] ?>" target="<?php echo  !empty($attributes['buttonTarget']) ? $attributes['buttonTarget'] :  '_self'; ?>">
			<?php echo $attributes['buttonText'] ?>
		</a>
	<?php endif; ?>
</div>