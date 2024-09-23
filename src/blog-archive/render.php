<?php

// Pagination
$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

// Arguments
$args = array(
    'post_type' => 'post',
    'posts_per_page' => 6,
    'paged' => $paged
);

// Query
$query = new WP_Query($args);

?>

<?php // Loop Query
if ($query->have_posts()) : ?>

    <div class="blog-container">
        <?php while ($query->have_posts()) :
            $query->the_post();
            $new_excerpt = wp_trim_characters(get_the_excerpt(), 135) ?>
            <a href="<?php echo the_permalink(); ?>" target="_self">
                <article class="blogpost">
                    <?php the_post_thumbnail("large") ?>
                    <div class="text-container">
                        <h3><?php the_title(); ?></h3>
                        <p> <?php echo $new_excerpt; ?></p>
                    </div>
                </article>
            </a>
        <?php endwhile; ?>
    </div>

    <div class="pagination">
        <?php $total_pages = $query->max_num_pages;
        if ($total_pages > 1) {
            $current_page = max(1, get_query_var('paged'));
            echo paginate_links(array(
                'base'    => get_pagenum_link(1) . '%_%',
                'format'  => 'page/%#%',
                'current' => $current_page,
                'total'   => $total_pages,
            ));
        } ?>
    </div>

<?php else : echo 'No posts found';
endif; ?>

<?php wp_reset_postdata(); ?>