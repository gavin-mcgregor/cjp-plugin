<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<form action="/contact-form-submission/" method="post">
		<div class="form-row">
			<label for="name-main">Full Name:</label>
			<input type="text" id="name-main" name="name-main" required />
		</div>
		<div class="form-row">
			<label for="name-alt">Partners Name:</label>
			<input type="text" id="name-alt" name="name-alt" required />
		</div>
		<div class="form-row">
			<label for="email">Email Address:</label>
			<input type="email" id="email" name="email" required />
		</div>
		<div class="form-row">
			<label for="phone">Phone Number:</label>
			<input type="text" id="phone" name="phone" required />
		</div>
		<div class="form-row">
			<label for="venue">Event Venue:</label>
			<input type="text" id="venue" name="venue" required />
		</div>
		<div class="form-row">
			<label for="date">Event Date:</label>
			<input type="text" id="date" name="date" required />
		</div>
		<div class="form-row">
			<label for="checkbox-container">I'm Interested in:</label>
			<div id="checkbox-container" name="checkbox-container">
				<div class="group-row">
					<input type="checkbox" id="full-day" name="full-day" />
					<label for="full-day">Full Day Wedding</label>
				</div>
				<div class="group-row">
					<input type="checkbox" id="half-day" name="half-day" />
					<label for="half-day">Half Day Wedding</label>
				</div>
				<div class="group-row">
					<input type="checkbox" id="micro-day" name="micro-day" />
					<label for="micro-day">Micro Wedding</label>
				</div>
				<div class="group-row">
					<input type="checkbox" id="short-film" name="short-film" />
					<label for="short-film">Cinematic Short Film</label>
				</div>
				<div class="group-row">
					<input type="checkbox" id="engagement-session" name="engagement-session" />
					<label for="engagement-session">Engagement Session</label>
				</div>
			</div>
		</div>
		<div class="form-row">
			<label for="message">Message:</label>
			<textarea id="message" name="message" required></textarea>
		</div>
		<div class="form-row">
			<label for="referal">How did you find me?</label>
			<input type="text" id="referal" name="referal" required />
		</div>
		<input class="cta-btn" type="submit" name="submit" value="Submit">
	</form>
</div>