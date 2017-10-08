# BADGE

## About

HTML, CSS and JS badge UI-component for scalable projects. [Go to demo page](https://davidetriso.github.io/badge/) or [check on npm](https://www.npmjs.com/package/t-aria-badge).

* Developed following BEM methodology
* User-friendly and accessible
* Less than 2KB JS (minified)
* JS plugin runs in strict mode
* Compatible with UMD


## Dependencies

**jQuery**

Developed and tested with jQuery 3.2.1


## Settings / Options

Name | Default | Type | Description
-----|---------|------|-------------
updatedClass | badge_updated | string | The class added to the badge when a value update occurs.
updatedClassRemoveAfter | 3000 | int > 0 | Remove the updatedClass after the time passed.
hiddenClass | badge_hidden | string | The class added to the badge when `hideWhenZero` is set to true and the badge's value is 0, null, undefined or false.
aLabel | You have {X} notifications | string | The accessible label for the badge (`{X}` will be replaced with the value passed with `initialValue` or to the method `update`).
useTitle | true | bool | Use the accessible label also as title attribute.
initialValue | 0 | string or int | Initial value of the badge.
hideWhenZero | false | bool | When true the badge will be hidden by adding the `hiddenClass` and setting `aria-hidden="true"` when the badge's value is 0, null, undefined or false.

## Usage

1. Include the JS script **badge.js** - or the minified production script **badge.min.js**-  in the head or the body of your HTML file.
2. Include the CSS file  **badge.css** in the head of your HTML file or include the SCSS files in your project.
3. Initialise the widget within an inline script tag, or in an external JS file.

### HTML

Use following HTML markup to implement a badge:

```html
<span class="badge"></span>
```

**IMPORTANT**:  If a region of the page is responsible for the update of the badge, it is necessary to expose the relation between the badge and the page region with the `aria-controls` attribute for accessibility.

### JS: Initialise

Initialise the plugin as follows:

```javascript
$('.badge').badge({
  option1: value1,
  option2: value2
});
```

## Methods

The plugin supports following methods: update.

### Update:

To update a badge call `badge` and pass **'update'** as first parameter and the new value as second parameter:

```javascript
$('#my-badge').badge('update', 10);
```

## Custom events

This plugin triggers following events:

* **badge.initialised** after the badge is initialised.
* **badge.updated** when the badge is updated.
*

The custom events are triggered on window and return the badge data object as argument.

```javascript
//add event listener  
$(window).on('badge.initialised', function(event, badge){
  //perform an action
  badge.element.addClass('my-custom-class');
});
```

## LICENSE

This project is licensed under the terms of the **MIT license**.

See [LICENSE.md](LICENSE.md) for detailed informations.
