# emails-input

A JavaScript module to turn your inputs into tag-based e-mail input fields.

### Features

- Lets you create an input of tags
- Tags are created by either pressing enter, typing a comma, pasting content into the field or clicking outside of the field (given there's something there to create a tag from!)
- Allows pasting multiple e-mails at once (separated by commas)
- Deletion of e-mails
- Simple e-mail validation, yielding two types of tags
- Can be added to any form using an input field
- Multiple independent instances on the same page

### Installation

Download and move the `emails-input.js` file into your project's directory, then add a scrip tag containing a path to it in your HTML file. For example:

```
<script src="path/to/emails-input.js"></script>
```

### Demo

[https://parazsl.github.io/emails-input/](https://parazsl.github.io/emails-input/)

### Usage

Add an input element to any form:

```
<input type="text" name="emails" class="input" />
```

Then the script:

```
var el = document.querySelector('.input');
var emails = new emailsInput({ element: el });
```

### Options

emailsInput takes an `object` where you can modify the default behavior of the module.

##### element

An input element the module uses to mount itself.
Default value: `undefined`
Required: `true`

##### classPrefix

The prefix of the classes of the rendered elements.
Default value: `emails-input`
Required: `false`

##### placeholderText

The text that's being shown on the tag input field.
Default value: `emails-input`
Required: `false`

##### removeContent

The content that acts as the remove button on the tags.
Default value: `&Cross;`
Required: `false`

### Exposed methods

##### .addEmail(email)

Adds one or more (comma separated) e-mails to the list.

##### .getSourceValue()

Returns the current value of the source element supplied to the module.

##### .getEmailCount()

Returns the current amount of e-mails in added.

##### Example

```
var inputField = document.querySelector('.input');
var addButton = document.querySelector('.add');
var countButton = document.querySelector('.count');
var emails = new emailsInput({ element: inputField });

button.addEventListener('click', function() {
  emails.addEmail('hello@hello.net');
})

count.addEventListener('click', function() {
  alert(emails.getEmailCount());
})
```

### Styling

`emails-input` is almost completely free of any pre-applied styles, so that you can add your own visuals to the module. For styling, the following CSS classes can be used (where `{class-prefix}` is equivalent to the value of the classPrefix):

- `{class-prefix}-wrapper`: the container of the whole module
- `{class-prefix}-input`: input field for the e-mails
- `{class-prefix}-tag`: a tag which shows an e-mail
- `{class-prefix}-tag-invalid`: a tag which shows an invalid e-mail
- `{class-prefix}-close`: the close button container on a tag

##### Styling notes:

- Only the wrapper has pre-applied styles, so that it always fits its outer container, or even shows a scrollbar when the tags don't fit the container anymore.
- `{class-prefix}-tag-invalid` always appears in pair (and comes after) with `{class-prefix}-tag`, so it works similarly to [BEM](http://getbem.com/introduction/) (think of `{class-prefix}-tag-invalid` as a modifier of `{class-prefix}-tag`)

### Further developing

If you'd like to tinker with the source code, follow these steps:

- Checkout the repo in your desired location, then navigate there
- run `npm install`

From there, you have 3 options:

- `npm run prettier`: formats the code in the `src/` folder, following the rules declared in `.prettierc`
- `npm run build`: builds a distributable module from the source into the `dist/` folder
- `npm run watch`: runs Webpack in watch mode, which means that upon every saved change in the source will yield a new build in the `dist/` folder

### Notes

The module was built with [IE11 compatibility](https://kangax.github.io/compat-table/es6/) in mind, meaning no ES6+ features were used. There are a few ways to modernize the module, like using TypeScript or transpiling the source using a loader in Webpack (while Webpack is being used here, its only aim was to create a minified bundle).
