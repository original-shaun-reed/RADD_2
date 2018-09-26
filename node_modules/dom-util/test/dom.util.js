/* jshint node: true, strict: true */
/* global describe: true, it: true, before: true */

"use strict";

var mocha           = require('mocha'),
    assert          = require('chai').assert,
    jsdom           = require('jsdom'),
    utils           = require('../');



describe('dom-util.attributeToArray()', function(){

    describe('class="foo bar xyz"', function(){
        
        before(function(){
            var fragment    = jsdom.jsdom('<div id="root" class="foo bar xyz">text</div>', jsdom.level(3, 'core'));
            this.result     = utils.attributeToArray(fragment.getElementById('root'), 'class');
        });

        it('should return an array', function(){
            assert.isArray(this.result);
        });

        it('should return an array with the length of 3', function(){
            assert.equal(3, this.result.length);
        });

        it('should return an array with "foo" at index 0', function(){
            assert.equal("foo", this.result[0]);
        });

        it('should return an array with "bar" at index 1', function(){
            assert.equal("bar", this.result[1]);
        });

        it('should return an array with "xyz" at index 2', function(){
            assert.equal("xyz", this.result[2]);
        });

    });

});



describe('dom-util.removeChildElements()', function(){

    describe('element has child elements', function(){

        it('should remove all child elements', function(done){
            var result = '<section id="root"></section>';

            jsdom.env('<section id="root"><div><p>text</p></div><div></div><div></div></section>', function(error, window){
                var root = window.document.getElementById('root');
                utils.removeChildElements(window.document.getElementById('root'));
                assert.equal(result, root.outerHTML);
                done();
            });

        });

    });

    describe('element has no child elements', function(){

        it('should keep the root untouched', function(done){
            var result = '<section id="root"></section>';

            jsdom.env('<section id="root"></section>', function(error, window){
                var root = window.document.getElementById('root');
                utils.removeChildElements(window.document.getElementById('root'));
                assert.equal(result, root.outerHTML);
                done();
            });

        });

    });

    describe('function is chainable', function(){

        it('should return "this"', function(done){

            jsdom.env('<section id="root"><div><p>text</p></div><div></div><div></div></section>', function(error, window){
                var root = window.document.getElementById('root');
                var result = utils.removeChildElements(window.document.getElementById('root'));
                assert.equal(result, utils);
                done();
            });

        });

    });

});



describe('dom-util.appendMultipleChildElements()', function(){

    describe('append an empty Array', function(){

        it('should preserve "root" as before appended', function(done){
            var result = '<section id="root"></section>';

            jsdom.env('<section id="root"></section>', function(error, window){
                var doc         = window.document,
                    root        = doc.getElementById('root'),
                    elements    = [];

                utils.appendMultipleChildElements(root, elements);

                assert.equal(result, root.outerHTML);
                done();
            });

        });

    });

    describe('append an Array with 3 individaul elements', function(){

        it('should append 3 elements to the "root" element', function(done){
            var result = '<section id="root"><p></p><p></p><p></p></section>';

            jsdom.env('<section id="root"></section>', function(error, window){
                var doc         = window.document,
                    root        = doc.getElementById('root'),
                    elements    = [
                        doc.createElement('p'), 
                        doc.createElement('p'), 
                        doc.createElement('p')
                    ];

                utils.appendMultipleChildElements(root, elements);

                assert.equal(result, root.outerHTML);
                done();
            });

        });

    });

    describe('append an NodeList with 3 elements', function(){

        it('should append 3 elements to the "root" element', function(done){
            var result = '<section id="root"><p></p><p></p><p></p></section>';

            jsdom.env('<section id="root"></section>', function(error, window){
                var doc         = window.document,
                    root        = doc.getElementById('root');

                doc.body.appendChild(doc.createElement('p'));
                doc.body.appendChild(doc.createElement('p'));
                doc.body.appendChild(doc.createElement('p'));

                utils.appendMultipleChildElements(root, doc.getElementsByTagName('p'));

                assert.equal(result, root.outerHTML);
                done();
            });

        });

    });

    describe('function is chainable', function(){

        it('should return "this"', function(done){

            jsdom.env('<section id="root"></section>', function(error, window){
                var doc         = window.document,
                    root        = doc.getElementById('root'),
                    elements    = [];

                var result = utils.appendMultipleChildElements(root, elements);

                assert.equal(result, utils);
                done();
            });

        });

    });

});



describe('dom-util.addFirstChildElement()', function(){
    
    describe('append a element as first child', function(){

        it('should be the first child', function(done){
            var result = '<section id="root"><p></p><div></div><div></div></section>';

            jsdom.env('<section id="root"><div></div><div></div></section>', function(error, window){
                var doc         = window.document,
                    root        = doc.getElementById('root'),
                    elP         = doc.createElement('p');

                utils.addFirstChildElement(root, elP);

                assert.equal(result, root.outerHTML);
                done();
            });

        });

    });

    describe('function is chainable', function(){

        it('should return "this"', function(done){

            jsdom.env('<section id="root"></section>', function(error, window){
                var doc         = window.document,
                    root        = doc.getElementById('root'),
                    elP         = doc.createElement('p');

                var result = utils.addFirstChildElement(root, elP);

                assert.equal(result, utils);
                done();
            });

        });

    });

});



describe('dom-util.removeLastChildElement()', function(){
    
    describe('remove the last child element', function(){

        it('should remove the last child', function(done){
            var result = '<section id="root"><div></div><div></div></section>';

            jsdom.env('<section id="root"><div></div><div></div><p></p></section>', function(error, window){
                var root = window.document.getElementById('root');
                utils.removeLastChildElement(root);

                assert.equal(result, root.outerHTML);
                done();
            });

        });

    });

    describe('root has no child elements', function(){

        it('should keep the root untouched', function(done){
            var result = '<section id="root"></section>';

            jsdom.env('<section id="root"></section>', function(error, window){
                var root = window.document.getElementById('root');
                utils.removeLastChildElement(root);

                assert.equal(result, root.outerHTML);
                done();
            });

        });

    });

    describe('function is chainable', function(){

        it('should return "this"', function(done){

            jsdom.env('<section id="root"><div></div><div></div><p></p></section>', function(error, window){
                var root = window.document.getElementById('root');
                var result = utils.removeLastChildElement(root);

                assert.equal(result, utils);
                done();
            });

        });

    });

});



describe('dom-util.addSiblingAboveElement()', function(){
    
    describe('append a element above existing element', function(){

        it('should append above', function(done){
            var result = '<section id="root"><div></div><p></p><div id="foo"></div></section>';

            jsdom.env('<section id="root"><div></div><div id="foo"></div></section>', function(error, window){
                var doc         = window.document,
                    root        = doc.getElementById('root'),
                    element     = doc.getElementById('foo'),
                    elP         = doc.createElement('p');

                utils.addSiblingAboveElement(element, elP);

                assert.equal(result, root.outerHTML);
                done();
            });
            
        });

    });

    describe('function is chainable', function(){

        it('should return "this"', function(done){

            jsdom.env('<section id="root"><div></div><div id="foo"></div></section>', function(error, window){
                var doc         = window.document,
                    root        = doc.getElementById('root'),
                    element     = doc.getElementById('foo'),
                    elP         = doc.createElement('p');

                var result = utils.addSiblingAboveElement(element, elP);

                assert.equal(result, utils);
                done();
            });

        });

    });

});



describe('dom-util.addSiblingBelowElement()', function(){
    
    describe('append a element below existing element', function(){

        it('should append below', function(done){
            var result = '<section id="root"><div id="foo"></div><p></p><div></div></section>';

            jsdom.env('<section id="root"><div id="foo"></div><div></div></section>', function(error, window){
                var doc         = window.document,
                    root        = doc.getElementById('root'),
                    element     = doc.getElementById('foo'),
                    elP         = doc.createElement('p');

                utils.addSiblingBelowElement(element, elP);

                assert.equal(result, root.outerHTML);
                done();
            });
            
        });

    });

    describe('function is chainable', function(){

        it('should return "this"', function(done){

            jsdom.env('<section id="root"><div id="foo"></div><div></div></section>', function(error, window){
                var doc         = window.document,
                    root        = doc.getElementById('root'),
                    element     = doc.getElementById('foo'),
                    elP         = doc.createElement('p');

                var result = utils.addSiblingBelowElement(element, elP);

                assert.equal(result, utils);
                done();
            });

        });

    });

});



describe('dom-util.replaceElement()', function(){
    
    describe('replace an element with a new element', function(){

        it('should replace the whole element and child elements', function(done){
            var result = '<section id="root"><p></p></section>';

            jsdom.env('<section id="root"><div></div><div></div></section>', function(error, window){
                var doc         = window.document,
                    root        = doc.getElementById('root'),
                    element     = doc.createElement('section');

                element.setAttribute('id', 'root');
                element.appendChild(doc.createElement('p'));

                utils.replaceElement(root, element);

                assert.equal(result, doc.getElementById('root').outerHTML);
                done();
            });
            
        });

    });

    describe('returns an element', function(){

        it('should return the new element', function(done){

            jsdom.env('<section id="root"><div></div><div></div></section>', function(error, window){
                var doc         = window.document,
                    root        = doc.getElementById('root'),
                    element     = doc.createElement('section');

                element.setAttribute('id', 'root');
                element.appendChild(doc.createElement('p'));

                var result = utils.replaceElement(root, element);

                assert.equal(result.outerHTML, element.outerHTML);
                done();
            });
        });

    });

});



describe('dom-util.removeElement()', function(){
    
    describe('remove a given element', function(){

        it('should leave the structure without the removed element', function(done){
            var result = '<section id="root"><div></div><div></div></section>';

            jsdom.env('<section id="root"><div></div><p id="foo"></p><div></div></section>', function(error, window){
                var doc         = window.document,
                    root        = doc.getElementById('root'),
                    element     = doc.getElementById('foo');

                utils.removeElement(element);

                assert.equal(result, root.outerHTML);
                done();
            });
            
        });

    });

    describe('function is chainable', function(){

        it('should return "this"', function(done){

            jsdom.env('<section id="root"><p id="foo"></p></section>', function(error, window){
                var doc         = window.document,
                    root        = doc.getElementById('root'),
                    element     = doc.getElementById('foo');

                var result = utils.removeElement(element);

                assert.equal(result, utils);
                done();
            });

        });

    });

});
