/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Mickael Jeanroy
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

describe('js2js-preprocessor', function() {

  var js2jsPreprocessor = require('../src/karma-js2js-preprocessor');
  var mod, newFile;

  beforeEach(function() {
    mod = js2jsPreprocessor['preprocessor:js2js'];
    newFile = function(path) {
      return {
        path: path,
        originalPath: path,
        contentPath: path,
        isUrl: false
      };
    };
  });

  it('shoud pass', function() {
    expect(true).toBe(true);
  });

  it('should export module', function() {
    expect(mod).toBeDefined();
    expect(mod).toEqual(['factory', jasmine.any(Function)]);
    expect(mod[1].$inject).toEqual(['logger', 'config.basePath', 'config.js2jsPreprocessor']);
  });

  describe('once initialized', function() {
    var file, source;
    var log, logger;
    var basePath, process;

    beforeEach(function() {
      log = jasmine.createSpyObj('log', ['debug', 'error']);

      logger = jasmine.createSpyObj('logger', ['create']);
      logger.create.and.returnValue(log);

      basePath = '/base';
      process = mod[1](logger, basePath);
    });

    it('should process file', function(done) {
      file = newFile('/base/path/file.js');
      source = "2 + 2;";

      process(source, file, function(processedContent) {
        expect(file.path).toBe('/base/path/file.js');
        done();
      });
    });

    it('should log processing', function(done) {
      file = newFile('/base/path/file.js');
      source = "2 + 2";

      process(source, file, function(processedContent) {
        expect(logger.create).toHaveBeenCalled();
        expect(log.debug).toHaveBeenCalledWith('Processing "%s".', '/base/path/file.js');
        done();
      });
    });
  });
});
