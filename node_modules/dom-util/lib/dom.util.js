/* jshint node: true, strict: true */

/** @module dom-utils */

"use strict";



/** 
  * Walk down a DOM tree and call a callback on each node. 
  * Shamelessly copied from https://gist.github.com/958000
  *
  * @param {DOMnode} node A DOM node
  * @param {function} callback The callback executed on each node
  */

module.exports.walkDown = function(node, callback) {
    var depth = 0,
        skip, 
        tmp;

    do {
        if (!skip) {
            skip = callback.call(node, depth) === false;
        }

        if (!skip && (tmp = node.firstChild)) {
            depth++;

        } else if ((tmp = node.nextSibling)) {
            skip = false;

        } else {
            tmp = node.parentNode;
            depth--;
            skip = true;
        }

        node = tmp;

    } while (depth > 0);
};



/** 
  * Walk up a DOM tree and call a callback on each node. 
  *
  * @param {DOMnode} node A DOM node
  * @param {function} callback The callback executed on each node
  */

module.exports.walkUp = function(node, callback) {
    var proceed = true;
    while (node.parentNode && proceed) {
        proceed = callback.call(node);
        node = node.parentNode;
    }
};



/** 
  * Parses the values of a attribute on a DOM element to a array 
  *
  * @param {HTMLElement} element A DOM element
  * @param {String} attribute The attribute on the element which should be parsed
  * @returns {Array}
  */

module.exports.attributeToArray = function(element, attribute) {
    return element.getAttribute(attribute) ? element.getAttribute(attribute).split(' ') : [];
};



/** 
  * Removes all child elements of a DOM node
  *
  * @param {HTMLElement} element A DOM element
  * @returns {this}
  */

module.exports.removeChildElements = function(element) {
    if (element.hasChildNodes()) {
        while (element.childNodes.length >= 1) {
            element.removeChild(element.firstChild);
        }
    }
    return this;
};



/** 
  * Appends a collection of elements as children to a root element
  *
  * @param {HTMLElement} root A DOM element acting as the top root node
  * @param {Array} elements Array with DOM elements to be added as children to the root element
  * @returns {this}
  */

module.exports.appendMultipleChildElements = function(root, elements) {
    var i = 0,
        l = elements.length;

    for (i = 0; i < l; i += 1) {
        root.appendChild(elements[i]);
    }

    return this;
};



/** 
  * Appends an element as the first child to a root element
  *
  * @param {HTMLElement} root A DOM element acting as the top root node
  * @param {HTMLElement} element DOM element to be added as child to the root element
  * @returns {this}
  */

module.exports.addFirstChildElement = function(root, element) {
    root.insertBefore(element, root.firstChild);
    return this;
};



/** 
  * Removes the last child element from a root element
  *
  * @param {HTMLElement} root A DOM element acting as the top root node
  * @returns {this}
  */

module.exports.removeLastChildElement = function(root) {
    if (root.hasChildNodes()) {
        root.lastChild.parentNode.removeChild(root.lastChild);
    }
    return this;
};



/** 
  * Appends an element as a sibling above an element
  *
  * @param {HTMLElement} root A DOM element acting as the top root node
  * @param {HTMLElement} element DOM element to be added as sibling above the root element
  * @returns {this}
  */

module.exports.addSiblingAboveElement = function(root, element) {
    root.parentNode.insertBefore(element, root);
    return this;
};



/** 
  * Appends an element as a sibling below an element
  *
  * @param {HTMLElement} root A DOM element acting as the top root node
  * @param {HTMLElement} element DOM element to be added as sibling below the root element
  * @returns {this}
  */

module.exports.addSiblingBelowElement = function(root, element) {
    root.parentNode.insertBefore(element, root.nextSibling);
    return this;
};



/** 
  * Replace an element (and all its children) with a new element
  *
  * @param {HTMLElement} existingElement An existing DOM intended to be replaced
  * @param {HTMLElement} newElement The DOM element which chall replace the existing DOM element
  * @returns {this}
  */

module.exports.replaceElement = function(existingElement, newElement) {
    existingElement.parentNode.replaceChild(newElement, existingElement);
    return newElement;
};



/** 
  * Remove a given element (and all its children)
  *
  * @param {HTMLElement} element The DOM element to remove
  * @returns {this}
  */

module.exports.removeElement = function(element) {
    element.parentNode.removeChild(element);
    return this;
};
