/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Jason Laster
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var util = require('util');



var TEMPLATE = '' +
  'window.__fixtures__ = window.__fixtures__ || {};\n' +
  'window.__fixtures__[\'%s\'] = %s';

var escapeContent = function(content) {
  var newContent = content.replace(/\*\//g, '<end>');
  return "function(){/*"+ newContent + "*/};";
};


var createJs2JsPreprocessor = function(logger, basePath, config) {
  var log = logger.create('preprocessor.js2jsPreprocessor');

  return function(content, file, done) {
    log.debug('Processing "%s".', file.originalPath);

    var htmlPath = file.originalPath.replace(basePath + '/', '');
    done(util.format(TEMPLATE, htmlPath, escapeContent(content)));
  }
};

createJs2JsPreprocessor.$inject = ['logger', 'config.basePath', 'config.js2jsPreprocessor'];

module.exports = {
  'preprocessor:js2js': ['factory', createJs2JsPreprocessor]
};
