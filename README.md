# jQuery Later HTML

Defer HTML elements after DOMContentLoaded is run or when they are viewable inside the viewport.

# Usage

To defer HTML elements just insert the code inside a `script` tag with the `src` attribute set to `text/x-later-html`:

```html
<script type="text/deferred-javascript">
	<div>
		<h1>This will load after the DOM is loaded</h1>
	</div>
</script>
```

# Options

You can delay the insertion of the HTML elements (after some milliseconds), set for the elements to load when they are inside the viewport and set the width and height of the placeholder wrapper:

_\* Every property is optional_

```html
<script type="text/deferred-javascript" data-delay="1000" data-inview="1" data-placeholder-height="50" data-placeholder-width="100">
	<div>
		<h1>This will load after this element is visible in the browser and after a delay of 1000s</h1>
	</div>
	<l:script src="text-javascript" src="some-javascript-file.js"></l:script>
</script>
```

# Known Issues

You can't embed a `script` object inside another `script` element, the workaround is replacing the `script` tags with `l:script` and it will be replaced before insertion:

```html
<script type="text/deferred-javascript" data-delay="1000" data-inview="1" data-placeholder-height="50" data-placeholder-width="100">
	<l:script src="text-javascript">
		console.log('Hello, I work!');
	</l:script>
</script>
```