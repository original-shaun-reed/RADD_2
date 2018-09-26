# dom-util

Collection of misc DOM manipulation functions. These are helper
functions which are not nativly provided by the DOM api's.



## Installation

```bash
$ npm install dom-util
````



## Tests

```bash
$ npm test
````

Tests are written in [mocha](http://visionmedia.github.io/mocha/) and run
in node.js with the help of [jsdom](https://github.com/tmpvar/jsdom).



## Basic usage

Example on converting all values on an attribute to an `Array`.

HTML:
```html
<div id="foo" class="foo bar"></div>
```

JS:
```js
var dom = require('dom-util');

var element = document.getElementById('foo');
var attributes = dom.attributeToArray(element, 'class');

console.log(attributes);  // returns ['foo', 'bar']
```



## Chaining

Some functions can be chained. Iow; this is possible:

```js
dom.addFirstChildElement(root, newEl)
   .removeLastChildElement(root);
```



## API

The following methods are available:


### .walkDown(node, callback)

Walk the DOM downwards from a given 'node' and executes a
callback on each `node`.

The callback must return `true` for the walking to continue
through the DOM. The walk is terminated by letting the
callback return `false`.

The current `node` which the callback is operating on is 
available as `this` in the callback. The first variable to
the callback is the `depth` of the node in the DOM tree.

HTML:
```html
<section>
    <div id="bar">
        <p></p>
        <p>
            <span></span>
        </p>
    </div>
</section>
```

JS:
```js
var dom = require('dom-util');

var element = document.getElementById('bar');
dom.walkDown(element, function(depth){
    if (this.nodeName === 'SPAN') {
        console.log('Found a <span> at level: ' + depth);
        return false;
    } else {
        return true;
    }
});
```


### .walkUp(node, callback)

Walk the DOM upwards from a given 'node' and executes a
callback on each `node`.

The callback must return `true` for the walking to continue
through the DOM. The walk is terminated by letting the
callback return `false`.

The current `node` which the callback is operating on is 
available as `this` in the callback.

HTML:
```html
<section>
    <div>
        <p></p>
        <p>
            <span id="bar"></span>
        </p>
    </div>
</section>
```

JS:
```js
var dom = require('dom-util');

var element = document.getElementById('bar');
dom.walkUp(element, function(){
    if (this.nodeName === 'DIV') {
        console.log('Found a <div>');
        return false;
    } else {
        return true;
    }
});
```


### .attributeToArray(element, attribute)

Parses the values of a attribute on a DOM element to a `Array`.

HTML:
```html
<div id="foo" class="foo bar"></div>
```

JS:
```js
var dom = require('dom-util');

var element = document.getElementById('foo');
var attributes = dom.attributeToArray(element, 'class');

console.log(attributes);  // returns ['foo', 'bar']
```


### .removeChildElements(element)

Removes all child elements of a DOM node.

HTML before:
```html
<div id="foo">
    <p>foo</p>
    <p>bar</p>
</div>
```

JS:
```js
var dom = require('dom-util');

var element = document.getElementById('foo');
dom.removeChildElements(element);
```

HTML after:
```html
<div id="foo"></div>
```

Function is chainable.


### .appendMultipleChildElements(root, elements)

Appends a Array of elements as children to a root element.

HTML before:
```html
<ul id="foo"></ul>
```

JS:
```js
var dom = require('dom-util');

var root = document.getElementById('foo');
var children = [];

children.push(document.createElement('li'));
children.push(document.createElement('li'));

dom.appendMultipleChildElements(root, children);
```

HTML after:
```html
<ul id="foo">
    <li></li>
    <li></li>
</ul>
```

Function is chainable.


### .addFirstChildElement(root, element)

Appends an element as the first child to a root element.

HTML before:
```html
<ul id="foo">
    <li>a</li>
    <li>b</li>
</ul>
```

JS:
```js
var dom = require('dom-util');

var root = document.getElementById('foo');
var element = document.createElement('li');
element.innerText = 'x';

dom.addFirstChildElement(root, element);
```

HTML after:
```html
<ul id="foo">
    <li>x</li>
    <li>a</li>
    <li>b</li>
</ul>
```

Function is chainable.


### .removeLastChildElement(root)

Removes the last child element from a root element.

HTML before:
```html
<ul id="foo">
    <li>a</li>
    <li>b</li>
    <li>c</li>
</ul>
```

JS:
```js
var dom = require('dom-util');

var root = document.getElementById('foo');
dom.removeLastChildElement(root);
```

HTML after:
```html
<ul id="foo">
    <li>a</li>
    <li>b</li>
</ul>
```

Function is chainable.


### .addSiblingAboveElement(root, element)

Appends an element as a sibling above an element.

HTML before:
```html
<div id="foo"></div>
```

JS:
```js
var dom = require('dom-util');

var root = document.getElementById('foo');
var element = document.createElement('p');

dom.addSiblingAboveElement(root, element);
```

HTML after:
```html
<p></p>
<div id="foo"></div>
```

Function is chainable.


### .addSiblingBelowElement(root, element)

Appends an element as a sibling below an element.

HTML before:
```html
<div id="foo"></div>
```

JS:
```js
var dom = require('dom-util');

var root = document.getElementById('foo');
var element = document.createElement('p');

dom.addSiblingBelowElement(root, element);
```

HTML after:
```html
<div id="foo"></div>
<p></p>
```

Function is chainable.


### .replaceElement(existingElement, newElement)

Replace an element (and all its children) with a new element
and returns the new element.

HTML before:
```html
<div id="foo">
    <p></p>
</div>
```

JS:
```js
var dom = require('dom-util');

var existing = document.getElementById('foo');
var element = document.createElement('section');

dom.replaceElement(existing, element);
```

HTML after:
```html
<section></section>
```


### .removeElement(element)

Remove a given element (and all its children).

HTML before:
```html
<div>
    <p id="foo"></p>
</div>
```

JS:
```js
var dom = require('dom-util');

var element = document.getElementById('foo');
dom.removeElement(element);
```

HTML after:
```html
<div></div>
```

Function is chainable.



## Environments

Browser and node.js with [jsdom](https://github.com/tmpvar/jsdom).



## License 

The MIT License (MIT)

Copyright (c) 2014 - Trygve Lie - post@trygve-lie.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.