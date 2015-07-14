# karma-js2js-preprocessor

> Preprocessor for converting js files into js variables

## Installation

Using npm:

`npm install karma-js2js-preprocessor --save-dev`

## Configuration

Following code shows the default configuration:

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.js': ['js2js']
    },

    files: [
      '**/*.js'
    ]
  });
};
```

## How does it work ?

This preprocessor converts JS files into js source functions and publishes them in the global `window.__fixtures__`.

```js
window.__fixtures__['es6/arrow_functions/example_1'] = "(a ...b) => 0";
window.__fixtures__['es6/arrow_functions/example_rest_1'] = "(a,b,...c) => 0;";
```



----

For more information on Karma see the [homepage].
[homepage]: http://karma-runner.github.com
