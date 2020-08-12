/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 89);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * should.js - assertion library
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */

var type = __webpack_require__(2);
var config = __webpack_require__(63);

/**
 * Check if given obj just a primitive type wrapper
 * @param {Object} obj
 * @returns {boolean}
 * @private
 */
exports.isWrapperType = function(obj) {
  return obj instanceof Number || obj instanceof String || obj instanceof Boolean;
};

exports.merge = function(a, b) {
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};

var hasOwnProperty = Object.prototype.hasOwnProperty;

exports.forEach = function forEach(obj, f, context) {
  if (exports.isGeneratorFunction(obj)) {
    return forEach(obj(), f, context);
  } else if (exports.isGeneratorObject(obj)) {
    var value = obj.next();
    while (!value.done) {
      if (f.call(context, value.value, 'value', obj) === false)
        return;
      value = obj.next();
    }
  } else {
    for (var prop in obj) {
      if (hasOwnProperty.call(obj, prop)) {
        if (f.call(context, obj[prop], prop, obj) === false)
          return;
      }
    }
  }
};

exports.some = function(obj, f, context) {
  var res = false;
  exports.forEach(obj, function(value, key) {
    if (f.call(context, value, key, obj)) {
      res = true;
      return false;
    }
  }, context);
  return res;
};

exports.isEmptyObject = function(obj) {
  for (var prop in obj) {
    if (hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
};

exports.isIndexable = function(obj) {
  var t = type(obj);
  return (t.type === type.OBJECT && t.cls === type.ARRAY) ||
   (t.type === type.OBJECT && t.cls === type.BUFFER) ||
   (t.type === type.OBJECT && t.cls === type.ARGUMENTS) ||
   (t.type === type.OBJECT && t.cls === type.ARRAY_BUFFER) ||
   (t.type === type.OBJECT && t.cls === type.TYPED_ARRAY) ||
   (t.type === type.OBJECT && t.cls === type.DATA_VIEW) ||
   (t.type === type.OBJECT && t.cls === type.STRING) ||
   (t.type === type.STRING);
};

exports.length = function(obj) {
  var t = type(obj);
  switch (t.type) {
    case type.STRING:
      return obj.length;
    case type.OBJECT:
      switch (t.cls) {
        case type.ARRAY_BUFFER:
        case type.TYPED_ARRAY:
        case type.DATA_VIEW:
          return obj.byteLength;

        case type.ARRAY:
        case type.BUFFER:
        case type.ARGUMENTS:
        case type.FUNCTION:
          return obj.length;
      }
  }
};

exports.convertPropertyName = function(name) {
  if (typeof name == 'symbol') {
    return name;
  } else {
    return String(name);
  }
};

exports.isGeneratorObject = function(obj) {
  if (!obj) return false;

  return typeof obj.next == 'function' &&
          typeof obj[Symbol.iterator] == 'function' &&
          obj[Symbol.iterator]() === obj;
};

//TODO find better way
exports.isGeneratorFunction = function(f) {
  if (typeof f != 'function') return false;

  return /^function\s*\*\s*/.test(f.toString());
};

exports.format = function(value, opts) {
  return config.getFormatter(opts).format(value);
};

exports.functionName = __webpack_require__(62).Formatter.functionName;

exports.formatProp = function(value) {
  return config.getFormatter().formatPropertyName(String(value));
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var getType = __webpack_require__(2);
var format = __webpack_require__(72);
var hasOwnProperty = Object.prototype.hasOwnProperty;

function makeResult(r, path, reason, a, b) {
  var o = {result: r};
  if(!r) {
    o.path = path;
    o.reason = reason;
    o.a = a;
    o.b = b;
  }
  return o;
}

var EQUALS = makeResult(true);

function typeToString(t) {
  return t.type + (t.cls ? '(' + t.cls + (t.sub ? ' ' + t.sub : '') + ')' : '');
}



var REASON = {
  PLUS_0_AND_MINUS_0: '+0 is not equal to -0',
  DIFFERENT_TYPES: 'A has type %s and B has type %s',
  NAN_NUMBER: 'NaN is not equal to any number',
  EQUALITY: 'A is not equal to B',
  EQUALITY_PROTOTYPE: 'A and B have different prototypes',
  WRAPPED_VALUE: 'A wrapped value is not equal to B wrapped value',
  FUNCTION_SOURCES: 'function A is not equal to B by source code value (via .toString call)',
  MISSING_KEY: '%s has no key %s',
  CIRCULAR_VALUES: 'A has circular reference that was visited not in the same time as B',
  SET_MAP_MISSING_KEY: 'Set/Map missing key',
  MAP_VALUE_EQUALITY: 'Values of the same key in A and B is not equal'
};


function eqInternal(a, b, opts, stackA, stackB, path, fails) {
  var r = EQUALS;

  function result(comparison, reason) {
    if(arguments.length > 2) {
      var args = Array.prototype.slice.call(arguments, 2);
      reason = format.apply(null, [reason].concat(args));
    }
    var res = makeResult(comparison, path, reason, a, b);
    if(!comparison && opts.collectAllFails) {
      fails.push(res);
    }
    return res;
  }

  function checkPropertyEquality(property) {
    return eqInternal(a[property], b[property], opts, stackA, stackB, path.concat([property]), fails);
  }

  function checkAlso(a1, b1) {
    return eqInternal(a1, b1, opts, stackA, stackB, path, fails);
  }

  // equal a and b exit early
  if(a === b) {
    // check for +0 !== -0;
    return result(a !== 0 || (1 / a == 1 / b) || opts.plusZeroAndMinusZeroEqual, REASON.PLUS_0_AND_MINUS_0);
  }

  var l, p;

  var typeA = getType(a),
    typeB = getType(b);

  var key;

  // if objects has different types they are not equal
  var typeDifferent = typeA.type !== typeB.type || typeA.cls !== typeB.cls;

  if(typeDifferent || ((opts.checkSubType && typeA.sub !== typeB.sub) || !opts.checkSubType)) {
    return result(false, REASON.DIFFERENT_TYPES, typeToString(typeA), typeToString(typeB));
  }

  //early checks for types
  switch(typeA.type) {
    case 'number':
      // NaN !== NaN
      return (a !== a) ? result(b !== b, REASON.NAN_NUMBER)
        : result(a === b, REASON.EQUALITY);

    case 'symbol':
    case 'boolean':
    case 'string':
      return result(a === b, REASON.EQUALITY);

    case 'function':
      // functions are compared by their source code
      r = checkAlso(a.toString(), b.toString());
      if(!r.result) {
        r.reason = REASON.FUNCTION_SOURCES;
        if(!opts.collectAllFails) return r;
      }

      break;//check user properties

    case 'object':
      // additional checks for object instances
      switch(typeA.cls) {
        // check regexp flags
        // TODO add es6 flags
        case 'regexp':
          p = ['source', 'global', 'multiline', 'lastIndex', 'ignoreCase'];
          while(p.length) {
            r = checkPropertyEquality(p.shift());
            if(!r.result && !opts.collectAllFails) return r;
          }
          break;//check user properties

        //check by timestamp only (using .valueOf)
        case 'date':
          if(+a !== +b) {
            r = result(false, REASON.EQUALITY);
            if(!r.result && !opts.collectAllFails) return r;
          }
          break;//check user properties

        //primitive type wrappers
        case 'number':
        case 'boolean':
        case 'string':
          //check their internal value
          r = checkAlso(a.valueOf(), b.valueOf());
          if(!r.result) {
            r.reason = REASON.WRAPPED_VALUE;
            if(!opts.collectAllFails) return r;
          }
          break;//check user properties

        //node buffer
        case 'buffer':
          //if length different it is obviously different
          r = checkPropertyEquality('length');
          if(!r.result && !opts.collectAllFails) return r;

          l = a.length;
          while(l--) {
            r = checkPropertyEquality(l);
            if(!r.result && !opts.collectAllFails) return r;
          }

          //we do not check for user properties because
          //node Buffer have some strange hidden properties
          return EQUALS;

        case 'error':
          //check defined properties
          p = ['name', 'message'];
          while(p.length) {
            r = checkPropertyEquality(p.shift());
            if(!r.result && !opts.collectAllFails) return r;
          }

          break;//check user properties

        case 'array':
        case 'arguments':
        case 'typed-array':
          r = checkPropertyEquality('length');
          if(!r.result && !opts.collectAllFails) return r;

          break;//check user properties

        case 'array-buffer':
          r = checkPropertyEquality('byteLength');
          if(!r.result && !opts.collectAllFails) return r;

          break;//check user properties

        case 'map':
        case 'set':
          r = checkPropertyEquality('size');
          if(!r.result && !opts.collectAllFails) return r;

          stackA.push(a);
          stackB.push(b);

          var itA = a.entries();
          var nextA = itA.next();

          while(!nextA.done) {
            key = nextA.value[0];
            //first check for primitive key if we can do light check
            //using .has and .get
            if(getType(key).type != 'object') {
              if(b.has(key)) {
                if(typeA.cls == 'map') {
                  //for map we also check its value to be equal
                  var value = b.get(key);
                  r = checkAlso(nextA.value[1], value);
                  if(!r.result) {
                    r.a = nextA.value;
                    r.b = value;
                    r.reason = REASON.MAP_VALUE_EQUALITY;

                    if(!opts.collectAllFails) break;
                  }
                }

              } else {
                r = result(false, REASON.SET_MAP_MISSING_KEY);
                r.a = key;
                r.b = key;

                if(!opts.collectAllFails) break;
              }
            } else {
              //heavy check
              //we search by iterator for key equality using equal
              var itB = b.entries();
              var nextB = itB.next();

              while(!nextB.done) {
                //first check for keys
                r = checkAlso(nextA.value[0], nextB.value[0]);

                if(!r.result) {
                  r.reason = REASON.SET_MAP_MISSING_KEY;
                  r.a = key;
                  r.b = key;
                } else {
                  if(typeA.cls == 'map') {
                    r = checkAlso(nextA.value[1], nextB.value[1]);

                    if(!r.result) {
                      r.a = nextA.value;
                      r.b = nextB.value;
                      r.reason = REASON.MAP_VALUE_EQUALITY;
                    }
                  }

                  if(!opts.collectAllFails) break;
                }

                nextB = itB.next();
              }
            }

            if(!r.result && !opts.collectAllFails) break;

            nextA = itA.next();
          }

          stackA.pop();
          stackB.pop();

          if(!r.result) {
            r.reason = REASON.SET_MAP_MISSING_ENTRY;
            if(!opts.collectAllFails) return r;
          }

          break; //check user properties
      }
  }

  // compare deep objects and arrays
  // stacks contain references only
  //

  l = stackA.length;
  while(l--) {
    if(stackA[l] === a) {
      return result(stackB[l] === b, REASON.CIRCULAR_VALUES);
    }
  }

  // add `a` and `b` to the stack of traversed objects
  stackA.push(a);
  stackB.push(b);

  for(key in b) {
    if(hasOwnProperty.call(b, key)) {
      r = result(hasOwnProperty.call(a, key), REASON.MISSING_KEY, 'A', key);
      if(!r.result && !opts.collectAllFails) break;

      if(r.result) {
        r = checkPropertyEquality(key);
        if(!r.result && !opts.collectAllFails) break;
      }
    }
  }

  if(r.result || opts.collectAllFails) {
    // ensure both objects have the same number of properties
    for(key in a) {
      if(hasOwnProperty.call(a, key)) {
        r = result(hasOwnProperty.call(b, key), REASON.MISSING_KEY, 'B', key);
        if(!r.result && !opts.collectAllFails) return r;
      }
    }
  }

  stackA.pop();
  stackB.pop();

  if(!r.result && !opts.collectAllFails) return r;

  var prototypesEquals = false, canComparePrototypes = false;

  if(opts.checkProtoEql) {
    if(Object.getPrototypeOf) {//TODO should i check prototypes for === or use eq?
      prototypesEquals = Object.getPrototypeOf(a) === Object.getPrototypeOf(b);
      canComparePrototypes = true;
    }

    if(canComparePrototypes && !prototypesEquals) {
      r = result(prototypesEquals, REASON.EQUALITY_PROTOTYPE);
      r.showReason = true;
      if(!r.result && !opts.collectAllFails) {
        return r;
      }
    }
  }

  return EQUALS;
}

var defaultOptions = {
  checkProtoEql: true,
  checkSubType: true,
  plusZeroAndMinusZeroEqual: false
};

function eq(a, b, opts) {
  opts = opts || {};

  var newOpts = {
    checkProtoEql: typeof opts.checkProtoEql !== 'boolean' ? defaultOptions.checkProtoEql : opts.checkProtoEql,
    checkSubType: typeof opts.checkSubType !== 'boolean' ? defaultOptions.checkSubType : opts.checkSubType,
    plusZeroAndMinusZeroEqual: typeof opts.plusZeroAndMinusZeroEqual !== 'boolean' ? defaultOptions.plusZeroAndMinusZeroEqual : opts.plusZeroAndMinusZeroEqual,
  };

  var fails = [];
  var r = eqInternal(a, b, newOpts, [], [], [], fails);
  return opts.collectAllFails ? fails : r;
}

module.exports = eq;

eq.r = REASON;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var toString = Object.prototype.toString;

var types = __webpack_require__(74);

/**
 * Simple data function to store type information
 * @param {string} type Usually what is returned from typeof
 * @param {string} cls  Sanitized @Class via Object.prototype.toString
 * @param {string} sub  If type and cls the same, and need to specify somehow
 * @private
 * @example
 *
 * //for null
 * new Type('null');
 *
 * //for Date
 * new Type('object', 'date');
 *
 * //for Uint8Array
 *
 * new Type('object', 'typed-array', 'uint8');
 */
function Type(type, cls, sub) {
  this.type = type;
  this.cls = cls;
  this.sub = sub;
}

/**
 * Function to store type checks
 * @private
 */
function TypeChecker() {
  this.checks = [];
}

TypeChecker.prototype = {
  add: function(func) {
    this.checks.push(func);
    return this;
  },

  addTypeOf: function(type, res) {
    return this.add(function(obj, tpeOf) {
      if(tpeOf === type) {
        return new Type(res);
      }
    });
  },

  addClass: function(cls, res, sub) {
    return this.add(function(obj, tpeOf, objCls) {
      if(objCls === cls) {
        return new Type(types.OBJECT, res, sub);
      }
    });
  },

  getType: function(obj) {
    var typeOf = typeof obj;
    var cls = toString.call(obj);

    for(var i = 0, l = this.checks.length; i < l; i++) {
      var res = this.checks[i].call(this, obj, typeOf, cls);
      if(typeof res !== 'undefined') return res;
    }

  }
};

var main = new TypeChecker();

//TODO add iterators

main
  .addTypeOf(types.NUMBER, types.NUMBER)
  .addTypeOf(types.UNDEFINED, types.UNDEFINED)
  .addTypeOf(types.STRING, types.STRING)
  .addTypeOf(types.BOOLEAN, types.BOOLEAN)
  .addTypeOf(types.FUNCTION, types.FUNCTION)
  .addTypeOf(types.SYMBOL, types.SYMBOL)
  .add(function(obj, tpeOf) {
    if(obj === null) return new Type(types.NULL);
  })
  .addClass('[object String]', types.STRING)
  .addClass('[object Boolean]', types.BOOLEAN)
  .addClass('[object Number]', types.NUMBER)
  .addClass('[object Array]', types.ARRAY)
  .addClass('[object RegExp]', types.REGEXP)
  .addClass('[object Error]', types.ERROR)
  .addClass('[object Date]', types.DATE)
  .addClass('[object Arguments]', types.ARGUMENTS)
  .addClass('[object Math]')
  .addClass('[object JSON]')
  .addClass('[object ArrayBuffer]', types.ARRAY_BUFFER)
  .addClass('[object Int8Array]', types.TYPED_ARRAY, 'int8')
  .addClass('[object Uint8Array]', types.TYPED_ARRAY, 'uint8')
  .addClass('[object Uint8ClampedArray]', types.TYPED_ARRAY, 'uint8clamped')
  .addClass('[object Int16Array]', types.TYPED_ARRAY, 'int16')
  .addClass('[object Uint16Array]', types.TYPED_ARRAY, 'uint16')
  .addClass('[object Int32Array]', types.TYPED_ARRAY, 'int32')
  .addClass('[object Uint32Array]', types.TYPED_ARRAY, 'uint32')
  .addClass('[object Float32Array]', types.TYPED_ARRAY, 'float32')
  .addClass('[object Float64Array]', types.TYPED_ARRAY, 'float64')
  .addClass('[object DataView]', types.DATA_VIEW)
  .addClass('[object Map]', types.MAP)
  .addClass('[object WeakMap]', types.WEAK_MAP)
  .addClass('[object Set]', types.SET)
  .addClass('[object WeakSet]', types.WEAK_SET)
  .addClass('[object Promise]', types.PROMISE)
  .addClass('[object Blob]', types.BLOB)
  .addClass('[object File]', types.FILE)
  .addClass('[object FileList]', types.FILE_LIST)
  .addClass('[object XMLHttpRequest]', types.XHR)
  .add(function(obj) {
    if((typeof Promise === types.FUNCTION && obj instanceof Promise) ||
        (typeof obj.then === types.FUNCTION)) {
          return new Type(types.OBJECT, types.PROMISE);
        }
  })
  .add(function(obj) {
    if(typeof Buffer !== 'undefined' && obj instanceof Buffer) {
      return new Type(types.OBJECT, types.BUFFER);
    }
  })
  .add(function(obj) {
    if(typeof Node !== 'undefined' && obj instanceof Node) {
      return new Type(types.OBJECT, types.HTML_ELEMENT, obj.nodeName);
    }
  })
  .add(function(obj) {
    // probably at the begginging should be enough these checks
    if(obj.Boolean === Boolean && obj.Number === Number && obj.String === String && obj.Date === Date) {
      return new Type(types.OBJECT, types.HOST);
    }
  })
  .add(function() {
    return new Type(types.OBJECT);
  });

/**
 * Get type information of anything
 *
 * @param  {any} obj Anything that could require type information
 * @return {Type}    type info
 */
function getGlobalType(obj) {
  return main.getType(obj);
}

getGlobalType.checker = main;
getGlobalType.TypeChecker = TypeChecker;
getGlobalType.Type = Type;

Object.keys(types).forEach(function(typeName) {
  getGlobalType[typeName] = types[typeName];
});

module.exports = getGlobalType;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(90).Buffer))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * should.js - assertion library
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */

var AssertionError = __webpack_require__(60);

/**
 * should Assertion
 * @param {*} obj Given object for assertion
 * @constructor
 * @memberOf should
 * @static
 */
function Assertion(obj) {
  this.obj = obj;

  this.anyOne = false;
  this.negate = false;

  this.params = {actual: obj};
}

Assertion.prototype = {
  constructor: Assertion,

  /**
   * Base method for assertions.
   *
   * Before calling this method need to fill Assertion#params object. This method usually called from other assertion methods.
   * `Assertion#params` can contain such properties:
   * * `operator` - required string containing description of this assertion
   * * `obj` - optional replacement for this.obj, it usefull if you prepare more clear object then given
   * * `message` - if this property filled with string any others will be ignored and this one used as assertion message
   * * `expected` - any object used when you need to assert relation between given object and expected. Like given == expected (== is a relation)
   * * `details` - additional string with details to generated message
   *
   * @memberOf Assertion
   * @category assertion
   * @param {*} expr Any expression that will be used as a condition for asserting.
   * @example
   *
   * var a = new should.Assertion(42);
   *
   * a.params = {
   *  operator: 'to be magic number',
   * }
   *
   * a.assert(false);
   * //throws AssertionError: expected 42 to be magic number
   */
  assert: function(expr) {
    if (expr) {
      return this;
    }

    var params = this.params;

    if ('obj' in params && !('actual' in params)) {
      params.actual = params.obj;
    } else if (!('obj' in params) && !('actual' in params)) {
      params.actual = this.obj;
    }

    params.stackStartFunction = params.stackStartFunction || this.assert;
    params.negate = this.negate;

    params.assertion = this;

    throw new AssertionError(params);
  },

  /**
   * Shortcut for `Assertion#assert(false)`.
   *
   * @memberOf Assertion
   * @category assertion
   * @example
   *
   * var a = new should.Assertion(42);
   *
   * a.params = {
   *  operator: 'to be magic number',
   * }
   *
   * a.fail();
   * //throws AssertionError: expected 42 to be magic number
   */
  fail: function() {
    return this.assert(false);
  }
};



/**
 * Assertion used to delegate calls of Assertion methods inside of Promise.
 * It has almost all methods of Assertion.prototype
 *
 * @param {Promise} obj
 */
function PromisedAssertion(/* obj */) {
  Assertion.apply(this, arguments);
}

/**
 * Make PromisedAssertion to look like promise. Delegate resolve and reject to given promise.
 *
 * @private
 * @returns {Promise}
 */
PromisedAssertion.prototype.then = function(resolve, reject) {
  return this.obj.then(resolve, reject);
};

/**
 * Way to extend Assertion function. It uses some logic
 * to define only positive assertions and itself rule with negative assertion.
 *
 * All actions happen in subcontext and this method take care about negation.
 * Potentially we can add some more modifiers that does not depends from state of assertion.
 *
 * @memberOf Assertion
 * @static
 * @param {String} name Name of assertion. It will be used for defining method or getter on Assertion.prototype
 * @param {Function} func Function that will be called on executing assertion
 * @example
 *
 * Assertion.add('asset', function() {
 *      this.params = { operator: 'to be asset' }
 *
 *      this.obj.should.have.property('id').which.is.a.Number()
 *      this.obj.should.have.property('path')
 * })
 */
Assertion.add = function(name, func) {
  Object.defineProperty(Assertion.prototype, name, {
    enumerable: true,
    configurable: true,
    value: function() {
      var context = new Assertion(this.obj, this, name);
      context.anyOne = this.anyOne;

      try {
        func.apply(context, arguments);
      } catch (e) {
        // check for fail
        if (e instanceof AssertionError) {
          // negative fail
          if (this.negate) {
            this.obj = context.obj;
            this.negate = false;
            return this;
          }

          if (context !== e.assertion) {
            context.params.previous = e;
          }

          // positive fail
          context.negate = false;
          context.fail();
        }
        // throw if it is another exception
        throw e;
      }

      // negative pass
      if (this.negate) {
        context.negate = true; // because .fail will set negate
        context.params.details = 'false negative fail';
        context.fail();
      }

      // positive pass
      if (!this.params.operator) {
        this.params = context.params; // shortcut
      }
      this.obj = context.obj;
      this.negate = false;
      return this;
    }
  });

  Object.defineProperty(PromisedAssertion.prototype, name, {
    enumerable: true,
    configurable: true,
    value: function() {
      var args = arguments;
      this.obj = this.obj.then(function(a) {
        return a[name].apply(a, args);
      });

      return this;
    }
  });
};

/**
 * Add chaining getter to Assertion like .a, .which etc
 *
 * @memberOf Assertion
 * @static
 * @param  {string} name   name of getter
 * @param  {function} [onCall] optional function to call
 */
Assertion.addChain = function(name, onCall) {
  onCall = onCall || function() {};
  Object.defineProperty(Assertion.prototype, name, {
    get: function() {
      onCall.call(this);
      return this;
    },
    enumerable: true
  });

  Object.defineProperty(PromisedAssertion.prototype, name, {
    enumerable: true,
    configurable: true,
    get: function() {
      this.obj = this.obj.then(function(a) {
        return a[name];
      });

      return this;
    }
  });
};

/**
 * Create alias for some `Assertion` property
 *
 * @memberOf Assertion
 * @static
 * @param {String} from Name of to map
 * @param {String} to Name of alias
 * @example
 *
 * Assertion.alias('true', 'True')
 */
Assertion.alias = function(from, to) {
  var desc = Object.getOwnPropertyDescriptor(Assertion.prototype, from);
  if (!desc) throw new Error('Alias ' + from + ' -> ' + to + ' could not be created as ' + from + ' not defined');
  Object.defineProperty(Assertion.prototype, to, desc);

  var desc2 = Object.getOwnPropertyDescriptor(PromisedAssertion.prototype, from);
  if (desc2) {
    Object.defineProperty(PromisedAssertion.prototype, to, desc2);
  }
};
/**
 * Negation modifier. Current assertion chain become negated. Each call invert negation on current assertion.
 *
 * @name not
 * @property
 * @memberOf Assertion
 * @category assertion
 */
Assertion.addChain('not', function() {
  this.negate = !this.negate;
});

/**
 * Any modifier - it affect on execution of sequenced assertion to do not `check all`, but `check any of`.
 *
 * @name any
 * @property
 * @memberOf Assertion
 * @category assertion
 */
Assertion.addChain('any', function() {
  this.anyOne = true;
});

module.exports = Assertion;
module.exports.PromisedAssertion = PromisedAssertion;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "10-Digits - NNNNNNNNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[0-9]{10}$",
	"TestData": {
		"Valid": [
			"1234567890",
			"5678567833"
		],
		"Invalid": [
			"12334545698",
			"123s33s12",
			"123456789"
		]
	}
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "2-Digits - NN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[0-9]{2}$",
	"TestData": {
		"Valid": [
			"12",
			"56"
		],
		"Invalid": [
			"012",
			"1s",
			"1",
			"x3"
		]
	}
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "3-Digits - NNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[0-9]{3}$",
	"TestData": {
		"Valid": [
			"123",
			"567"
		],
		"Invalid": [
			"1234",
			"13s",
			"1x3"
		]
	}
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "4-Digits - NNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[0-9]{4}$",
	"TestData": {
		"Valid": [
			"1234",
			"5678"
		],
		"Invalid": [
			"12345",
			"123s",
			"12x3"
		]
	}
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "5-Digits - NNNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[0-9]{5}$",
	"TestData": {
		"Valid": [
			"12345",
			"56785"
		],
		"Invalid": [
			"123456",
			"1233s",
			"123x3"
		]
	}
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "6-Digits - NNNNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[0-9]{6}$",
	"TestData": {
		"Valid": [
			"123456",
			"567856"
		],
		"Invalid": [
			"1233456",
			"123s3s",
			"1s23x3"
		]
	}
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "7-Digits - NNNNNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[0-9]{7}$",
	"TestData": {
		"Valid": [
			"1234567",
			"5678567"
		],
		"Invalid": [
			"123345456",
			"123s33s",
			"1s23x3"
		]
	}
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "8-Digits - NNNNNNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[0-9]{8}$",
	"TestData": {
		"Valid": [
			"12345678",
			"56785678"
		],
		"Invalid": [
			"123345456",
			"123s33s",
			"1s23x3"
		]
	}
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "AD : CCNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^AD[0-9]{3}$",
	"TestData": {
		"Valid": [
			"AD123",
			"AD001"
		],
		"Invalid": [
			"A1234",
			"AD12",
			"AD1234"
		]
	}
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "AI : CC2640",
	"RedundantCharacters": " -",
	"ValidationRegex": "^AI2640$",
	"TestData": {
		"Valid": [
			"AI2640",
			"AI-2640"
		],
		"Invalid": [
			"A2640",
			"AI02640",
			"AI-02640"
		]
	}
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "AQ : BIQQ 1ZZ",
	"RedundantCharacters": " -",
	"ValidationRegex": "^BIQQ1ZZ$",
	"TestData": {
		"Valid": [
			"BIQQ 1ZZ",
			"BIQQ1ZZ"
		],
		"Invalid": [
			"BIQQ1Z",
			"BIQQ01ZZ"
		]
	}
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "AX : NNNNN, CC-NNNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^(AX)?[0-9]{4}$",
	"TestData": {
		"Valid": [
			"1234",
			"AX-1234",
			"AX1234"
		],
		"Invalid": [
			"AX123",
			"A1234",
			"AX-12345"
		]
	}
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "AZ : CCNNNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^AZ[0-9]{4}$",
	"TestData": {
		"Valid": [
			"AZ1234",
			"AZ-1234"
		],
		"Invalid": [
			"AZ123",
			"A1234",
			"AZ-12345"
		]
	}
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "BB : CCNNNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^(BB)?[0-9]{5}$",
	"TestData": {
		"Valid": [
			"BB12345",
			"12345"
		],
		"Invalid": [
			"x1231s",
			"1231sd"
		]
	}
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "BH : NNN, NNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[0-9]{3,4}$",
	"TestData": {
		"Valid": [
			"123",
			"1234"
		],
		"Invalid": [
			"12",
			"12345"
		]
	}
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "BL : 97133",
	"RedundantCharacters": " -",
	"ValidationRegex": "^97133$",
	"TestData": {
		"Valid": [
			"97133"
		],
		"Invalid": [
			"971330",
			"9713"
		]
	}
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "BN : LLNNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[a-zA-Z]{2}[0-9]{4}$",
	"TestData": {
		"Valid": [
			"AB1234",
			"tK0987"
		],
		"Invalid": [
			"abc123",
			"a12345",
			"at123",
			"BH12345"
		]
	}
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "CA : A0A 0A0",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[A-Z][0-9][A-Z][0-9][A-Z][0-9]$",
	"TestData": {
		"Valid": [
			"A4B5X5",
			"A4B5A5"
		],
		"Invalid": [
			"123AAA",
			"12A5AA"
		]
	}
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "FK : FIQQ 1ZZ",
	"RedundantCharacters": " -",
	"ValidationRegex": "^FIQQ1ZZ$",
	"TestData": {
		"Valid": [
			"FIQQ 1ZZ",
			"FIQQ1ZZ"
		],
		"Invalid": [
			"FIQQ01ZZ",
			"FIQQ1ZZZ"
		]
	}
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "GB",
	"RedundantCharacters": " -",
	"ValidationRegex": "[A-PR-UWYZ0-9][A-HK-Y0-9][AEHMNPRTVXY0-9]?[ABEHMNPRVWXY0-9]?[0-9][ABD-HJLN-UW-Z]{2}|GIR0AA",
	"ValidationRegex.DOC": "http://regexlib.com/REDetails.aspx?regexp_id=260&AspxAutoDetectCookieSupport=1",
	"TestData": {
		"Valid": [
			"CW3 9SS",
			"SE5 0EG",
			"SE50EG",
			"WC2H 7LT",
			"se5 0eg",
			"Z29ZZ",
			"Z699ZZ",
			"ZX99ZZ",
			"ZC999ZZ",
			"EC1A 1BB",
			"W1A 0AX",
			"M1 1AE",
			"B33 8TH",
			"CR2 6XH",
			"DN55 1PT",
			"GIR 0AA"
		],
		"Invalid": [
			"WC2H 7LTa",
			"WC2H"
		]
	}
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "GF : 973NN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^973[0-9]{2}$",
	"TestData": {
		"Valid": [
			"97300",
			"97390"
		],
		"Invalid": [
			"9732",
			"973999",
			"97290",
			"097390"
		]
	}
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "GI : GX11 1AA",
	"RedundantCharacters": " -",
	"ValidationRegex": "^GX111AA$",
	"TestData": {
		"Valid": [
			"GX111AA",
			"GX11 1AA"
		],
		"Invalid": [
			"GX1101AA",
			"GX111AAA"
		]
	}
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "GP : 971NN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^971[0-9]{2}$",
	"TestData": {
		"Valid": [
			"97100",
			"97190"
		],
		"Invalid": [
			"9712",
			"971999",
			"97290",
			"097190"
		]
	}
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "GS : SIQQ 1ZZ",
	"RedundantCharacters": " -",
	"ValidationRegex": "^SIQQ1ZZ$",
	"TestData": {
		"Valid": [
			"SIQQ 1ZZ",
			"SIqq 1zz",
			"SIQQ1ZZ"
		],
		"Invalid": [
			"SIQQ01ZZ",
			"SIQQ1ZZZ"
		]
	}
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "HN : CCNNNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^(HN)?[0-9]{5}$",
	"TestData": {
		"Valid": [
			"HN12345",
			"12345"
		],
		"Invalid": [
			"123456",
			"HN123456",
			"HN1234"
		]
	}
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "IO : BBND 1ZZ",
	"RedundantCharacters": " -",
	"ValidationRegex": "^BBND1ZZ$",
	"TestData": {
		"Valid": [
			"BBND 1ZZ",
			"BBND1ZZ"
		],
		"Invalid": [
			"BBND01ZZ",
			"BBND1ZZZ"
		]
	}
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "KY : CCN-NNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^KY[0-9]{5}$",
	"TestData": {
		"Valid": [
			"KY1-1234",
			"KY12345"
		],
		"Invalid": [
			"KY1234",
			"KY123456",
			"K1-1234"
		]
	}
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "LB : NNNNN, NNNN NNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[0-9]{4}(?:[0-9]{4})?$",
	"TestData": {
		"Valid": [
			"1234",
			"1234 1234",
			"12341234"
		],
		"Invalid": [
			"123",
			"1234567",
			"123456789"
		]
	}
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "LC : CCNN NNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^LC[0-9]{5}$",
	"TestData": {
		"Valid": [
			"LC12 345",
			"LC12345"
		],
		"Invalid": [
			"12345",
			"x1231s",
			"1231sd"
		]
	}
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "LT : LT-NNNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^(LT)?[0-9]{5}$",
	"TestData": {
		"Valid": [
			"12345",
			"LT12345",
			"LT-12345"
		],
		"Invalid": [
			"1234",
			"123456",
			"LT-1234"
		]
	}
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "LV : NNNNN, CC-NNNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^(LV)?[0-9]{4}$",
	"TestData": {
		"Valid": [
			"1234",
			"LV-1234",
			"LV1234"
		],
		"Invalid": [
			"LV123",
			"L1234",
			"LV-12345"
		]
	}
};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "MD : CCNNNN, CC-NNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^(MD)?[0-9]{4}$",
	"TestData": {
		"Valid": [
			"1234",
			"MD1234",
			"MD-1234"
		],
		"Invalid": [
			"MD123",
			"M1234",
			"MD-12345"
		]
	}
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "MF : 97150",
	"RedundantCharacters": " -",
	"ValidationRegex": "^97150$",
	"TestData": {
		"Valid": [
			"97150"
		],
		"Invalid": [
			"971500",
			"9715"
		]
	}
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "MS : MSR NNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^(MSR)?[0-9]{4}$",
	"TestData": {
		"Valid": [
			"MSR 1110",
			"MSR 1350",
			"1350"
		],
		"Invalid": [
			"MS1110",
			"MSR01350",
			"12345"
		]
	}
};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "MA : LLL NNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[A-Z]{3}[0-9]{4}$",
	"TestData": {
		"Valid": [
			"abc1234",
			"ABC1234",
			"SHD4783"
		],
		"Invalid": [
			"ABCABC",
			"123ABCD"
		]
	}
};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "NC : 988NN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^988[0-9]{2}$",
	"TestData": {
		"Valid": [
			"98800",
			"98890"
		],
		"Invalid": [
			"9882",
			"988999",
			"98990",
			"098890"
		]
	}
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "NL : CC-NNNN LL",
	"RedundantCharacters": " -",
	"ValidationRegex": "^(NL)?[0-9]{4}([A-Z]{2})?$",
	"TestData": {
		"Valid": [
			"1235DF",
			"5983DH",
			"NL-1000 AP"
		],
		"Invalid": [
			"1235D",
			"12j4h",
			"k3j51l"
		]
	}
};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "PF : 987NN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^987[0-9]{2}$",
	"TestData": {
		"Valid": [
			"98700",
			"98790"
		],
		"Invalid": [
			"9872",
			"987999",
			"98690",
			"098790"
		]
	}
};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "PL : 99-999",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[0-9]{5}$",
	"TestData": {
		"Valid": [
			"44100",
			"44-100"
		],
		"Invalid": [
			"44f00",
			"e4410",
			"44-100d",
			"c44-100",
			"b44100",
			"44100a"
		]
	}
};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "PM : 97500",
	"RedundantCharacters": " -",
	"ValidationRegex": "^97500$",
	"TestData": {
		"Valid": [
			"97500"
		],
		"Invalid": [
			"975000",
			"9750"
		]
	}
};

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "PN : PCRN 1ZZ",
	"RedundantCharacters": " -",
	"ValidationRegex": "^PCRN1ZZ$",
	"TestData": {
		"Valid": [
			"PCRN 1ZZ",
			"PCRN1ZZ"
		],
		"Invalid": [
			"PCRN01ZZ",
			"PCRN1ZZZ"
		]
	}
};

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = {
  "Description": "PT : NNNN[ NNN]",
  "RedundantCharacters": " -",
  "ValidationRegex": "^([0-9]{4}-[0-9]{3})$",
  "TestData": {
    "Valid": [
      "1234-123"
    ],
    "Invalid": [
      "1255",
      "1234567",
      "1234 123",
      "x1231s",
      "1231sd",
      "1010101010",
      "1234 12"
    ]
  }
};

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "RE : 974NN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^974[0-9]{2}$",
	"TestData": {
		"Valid": [
			"97400",
			"97490"
		],
		"Invalid": [
			"9742",
			"974999",
			"97390",
			"097490"
		]
	}
};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "RU : NNN[-NNN]",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[0-9]{3}([0-9]{3})?$",
	"TestData": {
		"Valid": [
			"125",
			"123456"
		],
		"Invalid": [
			"x1231s",
			"1231sd",
			"1010101010"
		]
	}
};

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "SH : STHL 1ZZ",
	"RedundantCharacters": " -",
	"ValidationRegex": "^STHL1ZZ$",
	"TestData": {
		"Valid": [
			"STHL 1ZZ",
			"STHL1ZZ"
		],
		"Invalid": [
			"STHL01ZZ",
			"STHL1ZZZ"
		]
	}
};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "SM : 4789N",
	"RedundantCharacters": " -",
	"ValidationRegex": "^4789[0-9]{1}$",
	"TestData": {
		"Valid": [
			"47890",
			"47899"
		],
		"Invalid": [
			"4789",
			"478900",
			"47889"
		]
	}
};

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "SO : AA NNNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[a-zA-Z]{2}[0-9]{5}$",
	"TestData": {
		"Valid": [
			"AW12345",
			"BN47899"
		],
		"Invalid": [
			"12345",
			"A12345",
			"SL123456"
		]
	}
};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "SZ : ANNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[a-zA-Z]{1}[0-9]{3}$",
	"TestData": {
		"Valid": [
			"S123",
			"a789"
		],
		"Invalid": [
			"F1234",
			"D12"
		]
	}
};

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "TC : TKCA 1ZZ",
	"RedundantCharacters": " -",
	"ValidationRegex": "^TKCA1ZZ$",
	"TestData": {
		"Valid": [
			"TKCA1ZZ",
			"TKCA 1ZZ"
		],
		"Invalid": [
			"TKCA01ZZ",
			"TKCA1ZZZ"
		]
	}
};

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "US : NNNNN[-NNNN]",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[0-9]{5}([0-9]{4})?$",
	"TestData": {
		"Valid": [
			"12345",
			"12345-7689"
		],
		"Invalid": [
			"x1231s",
			"1231sd",
			"1010101010"
		]
	}
};

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "VA : 00120",
	"RedundantCharacters": " -",
	"ValidationRegex": "^00120$",
	"TestData": {
		"Valid": [
			"00120"
		],
		"Invalid": [
			"0012",
			"001200"
		]
	}
};

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "VC : CCNNNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^(VC)?[0-9]{4}$",
	"TestData": {
		"Valid": [
			"1234",
			"VC1234",
			"VC-1234"
		],
		"Invalid": [
			"VC123",
			"V1234",
			"VC-12345"
		]
	}
};

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "VE : NNNN, NNNN-A",
	"RedundantCharacters": " -",
	"ValidationRegex": "^[0-9]{4}[a-zA-Z]?$",
	"TestData": {
		"Valid": [
			"1234",
			"1234-A"
		],
		"Invalid": [
			"123",
			"1234AA"
		]
	}
};

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "VG : CCNNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^(VG)?[0-9]{4}$",
	"TestData": {
		"Valid": [
			"1234",
			"VG1234",
			"VG-1234"
		],
		"Invalid": [
			"VG123",
			"V1234",
			"VG-12345"
		]
	}
};

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "WF : 986NN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^986[0-9]{2}$",
	"TestData": {
		"Valid": [
			"98600",
			"98690"
		],
		"Invalid": [
			"9862",
			"986999",
			"98990",
			"098690"
		]
	}
};

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = {
	"Description": "WS : CCNNNNN",
	"RedundantCharacters": " -",
	"ValidationRegex": "^(WS)?[0-9]{4}$",
	"TestData": {
		"Valid": [
			"1234",
			"WS1234",
			"WS-1234"
		],
		"Invalid": [
			"WS123",
			"V1234",
			"WS-12345"
		]
	}
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * should.js - assertion library
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */

var util = __webpack_require__(0);

/**
 * should AssertionError
 * @param {Object} options
 * @constructor
 * @memberOf should
 * @static
 */
var AssertionError = function AssertionError(options) {
  util.merge(this, options);

  if (!options.message) {
    Object.defineProperty(this, 'message', {
        get: function() {
          if (!this._message) {
            this._message = this.generateMessage();
            this.generatedMessage = true;
          }
          return this._message;
        },
        configurable: true,
        enumerable: false
      }
    );
  }

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      if (this.stackStartFunction) {
        // try to strip useless frames
        var fn_name = util.functionName(this.stackStartFunction);
        var idx = out.indexOf('\n' + fn_name);
        if (idx >= 0) {
          // once we have located the function frame
          // we need to strip out everything before it (and its line)
          var next_line = out.indexOf('\n', idx + 1);
          out = out.substring(next_line + 1);
        }
      }

      this.stack = out;
    }
  }
};


var indent = '    ';
function prependIndent(line) {
  return indent + line;
}

function indentLines(text) {
  return text.split('\n').map(prependIndent).join('\n');
}


// assert.AssertionError instanceof Error
AssertionError.prototype = Object.create(Error.prototype, {
  name: {
    value: 'AssertionError'
  },

  generateMessage: {
    value: function() {
      if (!this.operator && this.previous) {
        return this.previous.message;
      }
      var actual = util.format(this.actual);
      var expected = 'expected' in this ? ' ' + util.format(this.expected) : '';
      var details = 'details' in this && this.details ? ' (' + this.details + ')' : '';

      var previous = this.previous ? '\n' + indentLines(this.previous.message) : '';

      return 'expected ' + actual + (this.negate ? ' not ' : ' ') + this.operator + expected + details + previous;
    }
  }
});

module.exports = AssertionError;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = {
	"AF": {
		"countryName": "Afghanistan",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "AF",
		"alpha3": "AFG",
		"numeric3": "4"
	},
	"AX": {
		"countryName": "Aland Islands",
		"postalCodeFormat": "AX.json",
		"alpha2": "AX",
		"alpha3": "ALA",
		"numeric3": "248"
	},
	"AL": {
		"countryName": "Albania",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "AL",
		"alpha3": "ALB",
		"numeric3": "8"
	},
	"DZ": {
		"countryName": "Algeria",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "DZ",
		"alpha3": "DZA",
		"numeric3": "12"
	},
	"AS": {
		"countryName": "American Samoa",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "AS",
		"alpha3": "ASM",
		"numeric3": "16"
	},
	"AD": {
		"countryName": "Andorra",
		"postalCodeFormat": "AD.json",
		"alpha2": "AD",
		"alpha3": "AND",
		"numeric3": "20"
	},
	"AO": {
		"countryName": "Angola",
		"alpha2": "AO",
		"alpha3": "AGO",
		"numeric3": "24"
	},
	"AI": {
		"countryName": "Anguilla",
		"postalCodeFormat": "AI.json",
		"alpha2": "AI",
		"alpha3": "AIA",
		"numeric3": "660"
	},
	"AQ": {
		"countryName": "Antarctica",
		"postalCodeFormat": "AQ.json",
		"alpha2": "AQ",
		"alpha3": "ATA",
		"numeric3": "10"
	},
	"AG": {
		"countryName": "Antigua and Barbuda",
		"alpha2": "AG",
		"alpha3": "ATG",
		"numeric3": "28"
	},
	"AR": {
		"countryName": "Argentina",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "AR",
		"alpha3": "ARG",
		"numeric3": "32"
	},
	"AM": {
		"countryName": "Armenia",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "AM",
		"alpha3": "ARM",
		"numeric3": "51"
	},
	"AW": {
		"countryName": "Aruba",
		"alpha2": "AW",
		"alpha3": "ABW",
		"numeric3": "533"
	},
	"AU": {
		"countryName": "Australia",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "AU",
		"alpha3": "AUS",
		"numeric3": "36"
	},
	"AT": {
		"countryName": "Austria",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "AT",
		"alpha3": "AUT",
		"numeric3": "40"
	},
	"AZ": {
		"countryName": "Azerbaijan",
		"postalCodeFormat": "AZ.json",
		"alpha2": "AZ",
		"alpha3": "AZE",
		"numeric3": "31"
	},
	"BS": {
		"countryName": "Bahamas",
		"alpha2": "BS",
		"alpha3": "BHS",
		"numeric3": "44"
	},
	"BH": {
		"countryName": "Bahrain",
		"postalCodeFormat": "BH.json",
		"alpha2": "BH",
		"alpha3": "BHR",
		"numeric3": "48"
	},
	"BD": {
		"countryName": "Bangladesh",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "BD",
		"alpha3": "BGD",
		"numeric3": "50"
	},
	"BB": {
		"countryName": "Barbados",
		"postalCodeFormat": "BB.json",
		"alpha2": "BB",
		"alpha3": "BRB",
		"numeric3": "52"
	},
	"BY": {
		"countryName": "Belarus",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "BY",
		"alpha3": "BLR",
		"numeric3": "112"
	},
	"BE": {
		"countryName": "Belgium",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "BE",
		"alpha3": "BEL",
		"numeric3": "56"
	},
	"BZ": {
		"countryName": "Belize",
		"alpha2": "BZ",
		"alpha3": "BLZ",
		"numeric3": "84"
	},
	"BJ": {
		"countryName": "Benin",
		"alpha2": "BJ",
		"alpha3": "BEN",
		"numeric3": "204"
	},
	"BM": {
		"countryName": "Bermuda",
		"alpha2": "BM",
		"alpha3": "BMU",
		"numeric3": "60"
	},
	"BT": {
		"countryName": "Bhutan",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "BT",
		"alpha3": "BTN",
		"numeric3": "64"
	},
	"BO": {
		"countryName": "Bolivia",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "BO",
		"alpha3": "BOL",
		"numeric3": "68"
	},
	"BA": {
		"countryName": "Bosnia and Herzegovina",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "BA",
		"alpha3": "BIH",
		"numeric3": "70"
	},
	"BW": {
		"countryName": "Botswana",
		"alpha2": "BW",
		"alpha3": "BWA",
		"numeric3": "72"
	},
	"BV": {
		"countryName": "Bouvet Island",
		"alpha2": "BV",
		"alpha3": "BVT",
		"numeric3": "74"
	},
	"BR": {
		"countryName": "Brazil",
		"postalCodeFormat": "8Digits.json",
		"alpha2": "BR",
		"alpha3": "BRA",
		"numeric3": "76"
	},
	"VG": {
		"countryName": "British Virgin Islands",
		"postalCodeFormat": "VG.json",
		"alpha2": "VG",
		"alpha3": "VGB",
		"numeric3": "92"
	},
	"IO": {
		"countryName": "British Indian Ocean Territory",
		"postalCodeFormat": "IO.json",
		"alpha2": "IO",
		"alpha3": "IOT",
		"numeric3": "86"
	},
	"BN": {
		"countryName": "Brunei Darussalam",
		"postalCodeFormat": "BN.json",
		"alpha2": "BN",
		"alpha3": "BRN",
		"numeric3": "96"
	},
	"BG": {
		"countryName": "Bulgaria",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "BG",
		"alpha3": "BGR",
		"numeric3": "100"
	},
	"BF": {
		"countryName": "Burkina Faso",
		"alpha2": "BF",
		"alpha3": "BFA",
		"numeric3": "854"
	},
	"BI": {
		"countryName": "Burundi",
		"alpha2": "BI",
		"alpha3": "BDI",
		"numeric3": "108"
	},
	"KH": {
		"countryName": "Cambodia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "KH",
		"alpha3": "KHM",
		"numeric3": "116"
	},
	"CM": {
		"countryName": "Cameroon",
		"alpha2": "CM",
		"alpha3": "CMR",
		"numeric3": "120"
	},
	"CA": {
		"countryName": "Canada",
		"postalCodeFormat": "CA.json",
		"alpha2": "CA",
		"alpha3": "CAN",
		"numeric3": "124"
	},
	"CV": {
		"countryName": "Cape Verde",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "CV",
		"alpha3": "CPV",
		"numeric3": "132"
	},
	"KY": {
		"countryName": "Cayman Islands",
		"postalCodeFormat": "KY.json",
		"alpha2": "KY",
		"alpha3": "CYM",
		"numeric3": "136"
	},
	"CF": {
		"countryName": "Central African Republic",
		"alpha2": "CF",
		"alpha3": "CAF",
		"numeric3": "140"
	},
	"TD": {
		"countryName": "Chad",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "TD",
		"alpha3": "TCD",
		"numeric3": "148"
	},
	"CL": {
		"countryName": "Chile",
		"postalCodeFormat": "7Digits.json",
		"alpha2": "CL",
		"alpha3": "CHL",
		"numeric3": "152"
	},
	"CN": {
		"countryName": "China",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "CN",
		"alpha3": "CHN",
		"numeric3": "156"
	},
	"HK": {
		"countryName": "Hong Kong, Special Administrative Region of China",
		"alpha2": "HK",
		"alpha3": "HKG",
		"numeric3": "344"
	},
	"MO": {
		"countryName": "Macao, Special Administrative Region of China",
		"alpha2": "MO",
		"alpha3": "MAC",
		"numeric3": "446"
	},
	"CX": {
		"countryName": "Christmas Island",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "CX",
		"alpha3": "CXR",
		"numeric3": "162"
	},
	"CC": {
		"countryName": "Cocos (Keeling) Islands",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "CC",
		"alpha3": "CCK",
		"numeric3": "166"
	},
	"CO": {
		"countryName": "Colombia",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "CO",
		"alpha3": "COL",
		"numeric3": "170"
	},
	"KM": {
		"countryName": "Comoros",
		"alpha2": "KM",
		"alpha3": "COM",
		"numeric3": "174"
	},
	"CG": {
		"countryName": "Congo (Brazzaville)",
		"alpha2": "CG",
		"alpha3": "COG",
		"numeric3": "178"
	},
	"CD": {
		"countryName": "Congo, Democratic Republic of the",
		"alpha2": "CD",
		"alpha3": "COD",
		"numeric3": "180"
	},
	"CK": {
		"countryName": "Cook Islands",
		"alpha2": "CK",
		"alpha3": "COK",
		"numeric3": "184"
	},
	"CR": {
		"countryName": "Costa Rica",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "CR",
		"alpha3": "CRI",
		"numeric3": "188"
	},
	"CI": {
		"countryName": "Côte d'Ivoire",
		"alpha2": "CI",
		"alpha3": "CIV",
		"numeric3": "384"
	},
	"HR": {
		"countryName": "Croatia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "HR",
		"alpha3": "HRV",
		"numeric3": "191"
	},
	"CU": {
		"countryName": "Cuba",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "CU",
		"alpha3": "CUB",
		"numeric3": "192"
	},
	"CY": {
		"countryName": "Cyprus",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "CY",
		"alpha3": "CYP",
		"numeric3": "196"
	},
	"CZ": {
		"countryName": "Czech Republic",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "CZ",
		"alpha3": "CZE",
		"numeric3": "203"
	},
	"DK": {
		"countryName": "Denmark",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "DK",
		"alpha3": "DNK",
		"numeric3": "208"
	},
	"DJ": {
		"countryName": "Djibouti",
		"alpha2": "DJ",
		"alpha3": "DJI",
		"numeric3": "262"
	},
	"DM": {
		"countryName": "Dominica",
		"alpha2": "DM",
		"alpha3": "DMA",
		"numeric3": "212"
	},
	"DO": {
		"countryName": "Dominican Republic",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "DO",
		"alpha3": "DOM",
		"numeric3": "214"
	},
	"EC": {
		"countryName": "Ecuador",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "EC",
		"alpha3": "ECU",
		"numeric3": "218"
	},
	"EG": {
		"countryName": "Egypt",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "EG",
		"alpha3": "EGY",
		"numeric3": "818"
	},
	"SV": {
		"countryName": "El Salvador",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "SV",
		"alpha3": "SLV",
		"numeric3": "222"
	},
	"GQ": {
		"countryName": "Equatorial Guinea",
		"alpha2": "GQ",
		"alpha3": "GNQ",
		"numeric3": "226"
	},
	"ER": {
		"countryName": "Eritrea",
		"alpha2": "ER",
		"alpha3": "ERI",
		"numeric3": "232"
	},
	"EE": {
		"countryName": "Estonia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "EE",
		"alpha3": "EST",
		"numeric3": "233"
	},
	"ET": {
		"countryName": "Ethiopia",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "ET",
		"alpha3": "ETH",
		"numeric3": "231"
	},
	"FK": {
		"countryName": "Falkland Islands (Malvinas)",
		"postalCodeFormat": "FK.json",
		"alpha2": "FK",
		"alpha3": "FLK",
		"numeric3": "238"
	},
	"FO": {
		"countryName": "Faroe Islands",
		"postalCodeFormat": "3Digits.json",
		"alpha2": "FO",
		"alpha3": "FRO",
		"numeric3": "234"
	},
	"FJ": {
		"countryName": "Fiji",
		"alpha2": "FJ",
		"alpha3": "FJI",
		"numeric3": "242"
	},
	"FI": {
		"countryName": "Finland",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "FI",
		"alpha3": "FIN",
		"numeric3": "246"
	},
	"FR": {
		"countryName": "France",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "FR",
		"alpha3": "FRA",
		"numeric3": "250"
	},
	"GF": {
		"countryName": "French Guiana",
		"postalCodeFormat": "GF.json",
		"alpha2": "GF",
		"alpha3": "GUF",
		"numeric3": "254"
	},
	"PF": {
		"countryName": "French Polynesia",
		"postalCodeFormat": "PF.json",
		"alpha2": "PF",
		"alpha3": "PYF",
		"numeric3": "258"
	},
	"TF": {
		"countryName": "French Southern Territories",
		"alpha2": "TF",
		"alpha3": "ATF",
		"numeric3": "260"
	},
	"GA": {
		"countryName": "Gabon",
		"alpha2": "GA",
		"alpha3": "GAB",
		"numeric3": "266"
	},
	"GM": {
		"countryName": "Gambia",
		"alpha2": "GM",
		"alpha3": "GMB",
		"numeric3": "270"
	},
	"GE": {
		"countryName": "Georgia",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "GE",
		"alpha3": "GEO",
		"numeric3": "268"
	},
	"DE": {
		"countryName": "Germany",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "DE",
		"alpha3": "DEU",
		"numeric3": "276"
	},
	"GH": {
		"countryName": "Ghana",
		"alpha2": "GH",
		"alpha3": "GHA",
		"numeric3": "288"
	},
	"GI": {
		"countryName": "Gibraltar",
		"postalCodeFormat": "GI.json",
		"alpha2": "GI",
		"alpha3": "GIB",
		"numeric3": "292"
	},
	"GR": {
		"countryName": "Greece",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "GR",
		"alpha3": "GRC",
		"numeric3": "300"
	},
	"GL": {
		"countryName": "Greenland",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "GL",
		"alpha3": "GRL",
		"numeric3": "304"
	},
	"GD": {
		"countryName": "Grenada",
		"alpha2": "GD",
		"alpha3": "GRD",
		"numeric3": "308"
	},
	"GP": {
		"countryName": "Guadeloupe",
		"postalCodeFormat": "GP.json",
		"alpha2": "GP",
		"alpha3": "GLP",
		"numeric3": "312"
	},
	"GU": {
		"countryName": "Guam",
		"postalCodeFormat": "US.json",
		"alpha2": "GU",
		"alpha3": "GUM",
		"numeric3": "316"
	},
	"GT": {
		"countryName": "Guatemala",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "GT",
		"alpha3": "GTM",
		"numeric3": "320"
	},
	"GG": {
		"countryName": "Guernsey",
		"postalCodeFormat": "GB.json",
		"alpha2": "GG",
		"alpha3": "GGY",
		"numeric3": "831"
	},
	"GN": {
		"countryName": "Guinea",
		"postalCodeFormat": "3Digits.json",
		"alpha2": "GN",
		"alpha3": "GIN",
		"numeric3": "324"
	},
	"GW": {
		"countryName": "Guinea-Bissau",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "GW",
		"alpha3": "GNB",
		"numeric3": "624"
	},
	"GY": {
		"countryName": "Guyana",
		"alpha2": "GY",
		"alpha3": "GUY",
		"numeric3": "328"
	},
	"HT": {
		"countryName": "Haiti",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "HT",
		"alpha3": "HTI",
		"numeric3": "332"
	},
	"HM": {
		"countryName": "Heard Island and Mcdonald Islands",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "HM",
		"alpha3": "HMD",
		"numeric3": "334"
	},
	"VA": {
		"countryName": "Holy See (Vatican City State)",
		"postalCodeFormat": "VA.json",
		"alpha2": "VA",
		"alpha3": "VAT",
		"numeric3": "336"
	},
	"HN": {
		"countryName": "Honduras",
		"postalCodeFormat": "HN.json",
		"alpha2": "HN",
		"alpha3": "HND",
		"numeric3": "340"
	},
	"HU": {
		"countryName": "Hungary",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "HU",
		"alpha3": "HUN",
		"numeric3": "348"
	},
	"IS": {
		"countryName": "Iceland",
		"postalCodeFormat": "3Digits.json",
		"alpha2": "IS",
		"alpha3": "ISL",
		"numeric3": "352"
	},
	"IN": {
		"countryName": "India",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "IN",
		"alpha3": "IND",
		"numeric3": "356"
	},
	"ID": {
		"countryName": "Indonesia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "ID",
		"alpha3": "IDN",
		"numeric3": "360"
	},
	"IR": {
		"countryName": "Iran, Islamic Republic of",
		"postalCodeFormat": "10Digits.json",
		"alpha2": "IR",
		"alpha3": "IRN",
		"numeric3": "364"
	},
	"IQ": {
		"countryName": "Iraq",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "IQ",
		"alpha3": "IRQ",
		"numeric3": "368"
	},
	"IE": {
		"countryName": "Ireland",
		"alpha2": "IE",
		"alpha3": "IRL",
		"numeric3": "372"
	},
	"IM": {
		"countryName": "Isle of Man",
		"postalCodeFormat": "GB.json",
		"alpha2": "IM",
		"alpha3": "IMN",
		"numeric3": "833"
	},
	"IL": {
		"countryName": "Israel",
		"postalCodeFormat": "7Digits.json",
		"alpha2": "IL",
		"alpha3": "ISR",
		"numeric3": "376"
	},
	"IT": {
		"countryName": "Italy",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "IT",
		"alpha3": "ITA",
		"numeric3": "380"
	},
	"JM": {
		"countryName": "Jamaica",
		"postalCodeFormat": "2Digits.json",
		"alpha2": "JM",
		"alpha3": "JAM",
		"numeric3": "388"
	},
	"JP": {
		"countryName": "Japan",
		"postalCodeFormat": "7Digits.json",
		"alpha2": "JP",
		"alpha3": "JPN",
		"numeric3": "392"
	},
	"JE": {
		"countryName": "Jersey",
		"postalCodeFormat": "GB.json",
		"alpha2": "JE",
		"alpha3": "JEY",
		"numeric3": "832"
	},
	"JO": {
		"countryName": "Jordan",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "JO",
		"alpha3": "JOR",
		"numeric3": "400"
	},
	"KZ": {
		"countryName": "Kazakhstan",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "KZ",
		"alpha3": "KAZ",
		"numeric3": "398"
	},
	"KE": {
		"countryName": "Kenya",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "KE",
		"alpha3": "KEN",
		"numeric3": "404"
	},
	"KI": {
		"countryName": "Kiribati",
		"alpha2": "KI",
		"alpha3": "KIR",
		"numeric3": "296"
	},
	"KP": {
		"countryName": "Korea, Democratic People's Republic of",
		"alpha2": "KP",
		"alpha3": "PRK",
		"numeric3": "408"
	},
	"KR": {
		"countryName": "Korea, Republic of",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "KR",
		"alpha3": "KOR",
		"numeric3": "410"
	},
	"KW": {
		"countryName": "Kuwait",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "KW",
		"alpha3": "KWT",
		"numeric3": "414"
	},
	"KG": {
		"countryName": "Kyrgyzstan",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "KG",
		"alpha3": "KGZ",
		"numeric3": "417"
	},
	"LA": {
		"countryName": "Lao PDR",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "LA",
		"alpha3": "LAO",
		"numeric3": "418"
	},
	"LV": {
		"countryName": "Latvia",
		"postalCodeFormat": "LV.json",
		"alpha2": "LV",
		"alpha3": "LVA",
		"numeric3": "428"
	},
	"LB": {
		"countryName": "Lebanon",
		"postalCodeFormat": "LB.json",
		"alpha2": "LB",
		"alpha3": "LBN",
		"numeric3": "422"
	},
	"LS": {
		"countryName": "Lesotho",
		"postalCodeFormat": "3Digits.json",
		"alpha2": "LS",
		"alpha3": "LSO",
		"numeric3": "426"
	},
	"LR": {
		"countryName": "Liberia",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "LR",
		"alpha3": "LBR",
		"numeric3": "430"
	},
	"LY": {
		"countryName": "Libya",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "LY",
		"alpha3": "LBY",
		"numeric3": "434"
	},
	"LI": {
		"countryName": "Liechtenstein",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "LI",
		"alpha3": "LIE",
		"numeric3": "438"
	},
	"LT": {
		"countryName": "Lithuania",
		"postalCodeFormat": "LT.json",
		"alpha2": "LT",
		"alpha3": "LTU",
		"numeric3": "440"
	},
	"LU": {
		"countryName": "Luxembourg",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "LU",
		"alpha3": "LUX",
		"numeric3": "442"
	},
	"MK": {
		"countryName": "Macedonia, Republic of",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "MK",
		"alpha3": "MKD",
		"numeric3": "807"
	},
	"MG": {
		"countryName": "Madagascar",
		"postalCodeFormat": "3Digits.json",
		"alpha2": "MG",
		"alpha3": "MDG",
		"numeric3": "450"
	},
	"MW": {
		"countryName": "Malawi",
		"alpha2": "MW",
		"alpha3": "MWI",
		"numeric3": "454"
	},
	"MY": {
		"countryName": "Malaysia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MY",
		"alpha3": "MYS",
		"numeric3": "458"
	},
	"MV": {
		"countryName": "Maldives",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MV",
		"alpha3": "MDV",
		"numeric3": "462"
	},
	"ML": {
		"countryName": "Mali",
		"alpha2": "ML",
		"alpha3": "MLI",
		"numeric3": "466"
	},
	"MT": {
		"countryName": "Malta",
		"postalCodeFormat": "MT.json",
		"alpha2": "MT",
		"alpha3": "MLT",
		"numeric3": "470"
	},
	"MH": {
		"countryName": "Marshall Islands",
		"postalCodeFormat": "US.json",
		"alpha2": "MH",
		"alpha3": "MHL",
		"numeric3": "584"
	},
	"MQ": {
		"countryName": "Martinique",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MQ",
		"alpha3": "MTQ",
		"numeric3": "474"
	},
	"MR": {
		"countryName": "Mauritania",
		"alpha2": "MR",
		"alpha3": "MRT",
		"numeric3": "478"
	},
	"MU": {
		"countryName": "Mauritius",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MU",
		"alpha3": "MUS",
		"numeric3": "480"
	},
	"YT": {
		"countryName": "Mayotte",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "YT",
		"alpha3": "MYT",
		"numeric3": "175"
	},
	"MX": {
		"countryName": "Mexico",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MX",
		"alpha3": "MEX",
		"numeric3": "484"
	},
	"FM": {
		"countryName": "Micronesia, Federated States of",
		"postalCodeFormat": "US.json",
		"alpha2": "FM",
		"alpha3": "FSM",
		"numeric3": "583"
	},
	"MD": {
		"countryName": "Moldova",
		"postalCodeFormat": "MD.json",
		"alpha2": "MD",
		"alpha3": "MDA",
		"numeric3": "498"
	},
	"MC": {
		"countryName": "Monaco",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MC",
		"alpha3": "MCO",
		"numeric3": "492"
	},
	"MN": {
		"countryName": "Mongolia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MN",
		"alpha3": "MNG",
		"numeric3": "496"
	},
	"ME": {
		"countryName": "Montenegro",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "ME",
		"alpha3": "MNE",
		"numeric3": "499"
	},
	"MS": {
		"countryName": "Montserrat",
		"postalCodeFormat": "MS.json",
		"alpha2": "MS",
		"alpha3": "MSR",
		"numeric3": "500"
	},
	"MA": {
		"countryName": "Morocco",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MA",
		"alpha3": "MAR",
		"numeric3": "504"
	},
	"MZ": {
		"countryName": "Mozambique",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "MZ",
		"alpha3": "MOZ",
		"numeric3": "508"
	},
	"MM": {
		"countryName": "Myanmar",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MM",
		"alpha3": "MMR",
		"numeric3": "104"
	},
	"NA": {
		"countryName": "Namibia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "NA",
		"alpha3": "NAM",
		"numeric3": "516"
	},
	"NR": {
		"countryName": "Nauru",
		"alpha2": "NR",
		"alpha3": "NRU",
		"numeric3": "520"
	},
	"NP": {
		"countryName": "Nepal",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "NP",
		"alpha3": "NPL",
		"numeric3": "524"
	},
	"NL": {
		"countryName": "Netherlands",
		"postalCodeFormat": "NL.json",
		"alpha2": "NL",
		"alpha3": "NLD",
		"numeric3": "528"
	},
	"AN": {
		"countryName": "Netherlands Antilles",
		"alpha2": "AN",
		"alpha3": "ANT",
		"numeric3": "530"
	},
	"NC": {
		"countryName": "New Caledonia",
		"postalCodeFormat": "NC.json",
		"alpha2": "NC",
		"alpha3": "NCL",
		"numeric3": "540"
	},
	"NZ": {
		"countryName": "New Zealand",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "NZ",
		"alpha3": "NZL",
		"numeric3": "554"
	},
	"NI": {
		"countryName": "Nicaragua",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "NI",
		"alpha3": "NIC",
		"numeric3": "558"
	},
	"NE": {
		"countryName": "Niger",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "NE",
		"alpha3": "NER",
		"numeric3": "562"
	},
	"NG": {
		"countryName": "Nigeria",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "NG",
		"alpha3": "NGA",
		"numeric3": "566"
	},
	"NU": {
		"countryName": "Niue",
		"alpha2": "NU",
		"alpha3": "NIU",
		"numeric3": "570"
	},
	"NF": {
		"countryName": "Norfolk Island",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "NF",
		"alpha3": "NFK",
		"numeric3": "574"
	},
	"MP": {
		"countryName": "Northern Mariana Islands",
		"postalCodeFormat": "US.json",
		"alpha2": "MP",
		"alpha3": "MNP",
		"numeric3": "580"
	},
	"NO": {
		"countryName": "Norway",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "NO",
		"alpha3": "NOR",
		"numeric3": "578"
	},
	"OM": {
		"countryName": "Oman",
		"postalCodeFormat": "3Digits.json",
		"alpha2": "OM",
		"alpha3": "OMN",
		"numeric3": "512"
	},
	"PK": {
		"countryName": "Pakistan",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "PK",
		"alpha3": "PAK",
		"numeric3": "586"
	},
	"PW": {
		"countryName": "Palau",
		"postalCodeFormat": "US.json",
		"alpha2": "PW",
		"alpha3": "PLW",
		"numeric3": "585"
	},
	"PS": {
		"countryName": "Palestinian Territory, Occupied",
		"postalCodeFormat": "3Digits.json",
		"alpha2": "PS",
		"alpha3": "PSE",
		"numeric3": "275"
	},
	"PA": {
		"countryName": "Panama",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "PA",
		"alpha3": "PAN",
		"numeric3": "591"
	},
	"PG": {
		"countryName": "Papua New Guinea",
		"postalCodeFormat": "3Digits.json",
		"alpha2": "PG",
		"alpha3": "PNG",
		"numeric3": "598"
	},
	"PY": {
		"countryName": "Paraguay",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "PY",
		"alpha3": "PRY",
		"numeric3": "600"
	},
	"PE": {
		"countryName": "Peru",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "PE",
		"alpha3": "PER",
		"numeric3": "604"
	},
	"PH": {
		"countryName": "Philippines",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "PH",
		"alpha3": "PHL",
		"numeric3": "608"
	},
	"PN": {
		"countryName": "Pitcairn",
		"postalCodeFormat": "PN.json",
		"alpha2": "PN",
		"alpha3": "PCN",
		"numeric3": "612"
	},
	"PL": {
		"countryName": "Poland",
		"postalCodeFormat": "PL.json",
		"alpha2": "PL",
		"alpha3": "POL",
		"numeric3": "616"
	},
	"PT": {
		"countryName": "Portugal",
		"postalCodeFormat": "PT.json",
		"alpha2": "PT",
		"alpha3": "PRT",
		"numeric3": "620"
	},
	"PR": {
		"countryName": "Puerto Rico",
		"postalCodeFormat": "US.json",
		"alpha2": "PR",
		"alpha3": "PRI",
		"numeric3": "630"
	},
	"QA": {
		"countryName": "Qatar",
		"alpha2": "QA",
		"alpha3": "QAT",
		"numeric3": "634"
	},
	"RE": {
		"countryName": "Réunion",
		"postalCodeFormat": "RE.json",
		"alpha2": "RE",
		"alpha3": "REU",
		"numeric3": "638"
	},
	"RO": {
		"countryName": "Romania",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "RO",
		"alpha3": "ROU",
		"numeric3": "642"
	},
	"RU": {
		"countryName": "Russian Federation",
		"postalCodeFormat": "RU.json",
		"alpha2": "RU",
		"alpha3": "RUS",
		"numeric3": "643"
	},
	"RW": {
		"countryName": "Rwanda",
		"alpha2": "RW",
		"alpha3": "RWA",
		"numeric3": "646"
	},
	"BL": {
		"countryName": "Saint-Barthélemy",
		"postalCodeFormat": "BL.json",
		"alpha2": "BL",
		"alpha3": "BLM",
		"numeric3": "652"
	},
	"SH": {
		"countryName": "Saint Helena",
		"postalCodeFormat": "SH.json",
		"alpha2": "SH",
		"alpha3": "SHN",
		"numeric3": "654"
	},
	"KN": {
		"countryName": "Saint Kitts and Nevis",
		"alpha2": "KN",
		"alpha3": "KNA",
		"numeric3": "659"
	},
	"LC": {
		"countryName": "Saint Lucia",
		"postalCodeFormat": "LC.json",
		"alpha2": "LC",
		"alpha3": "LCA",
		"numeric3": "662"
	},
	"MF": {
		"countryName": "Saint-Martin (French part)",
		"postalCodeFormat": "MF.json",
		"alpha2": "MF",
		"alpha3": "MAF",
		"numeric3": "663"
	},
	"PM": {
		"countryName": "Saint Pierre and Miquelon",
		"postalCodeFormat": "PM.json",
		"alpha2": "PM",
		"alpha3": "SPM",
		"numeric3": "666"
	},
	"VC": {
		"countryName": "Saint Vincent and Grenadines",
		"postalCodeFormat": "VC.json",
		"alpha2": "VC",
		"alpha3": "VCT",
		"numeric3": "670"
	},
	"WS": {
		"countryName": "Samoa",
		"postalCodeFormat": "WS.json",
		"alpha2": "WS",
		"alpha3": "WSM",
		"numeric3": "882"
	},
	"SM": {
		"countryName": "San Marino",
		"postalCodeFormat": "SM.json",
		"alpha2": "SM",
		"alpha3": "SMR",
		"numeric3": "674"
	},
	"ST": {
		"countryName": "Sao Tome and Principe",
		"alpha2": "ST",
		"alpha3": "STP",
		"numeric3": "678"
	},
	"SA": {
		"countryName": "Saudi Arabia",
		"postalCodeFormat": "US.json",
		"alpha2": "SA",
		"alpha3": "SAU",
		"numeric3": "682"
	},
	"SN": {
		"countryName": "Senegal",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "SN",
		"alpha3": "SEN",
		"numeric3": "686"
	},
	"RS": {
		"countryName": "Serbia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "RS",
		"alpha3": "SRB",
		"numeric3": "688"
	},
	"SC": {
		"countryName": "Seychelles",
		"alpha2": "SC",
		"alpha3": "SYC",
		"numeric3": "690"
	},
	"SL": {
		"countryName": "Sierra Leone",
		"alpha2": "SL",
		"alpha3": "SLE",
		"numeric3": "694"
	},
	"SG": {
		"countryName": "Singapore",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "SG",
		"alpha3": "SGP",
		"numeric3": "702"
	},
	"SK": {
		"countryName": "Slovakia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "SK",
		"alpha3": "SVK",
		"numeric3": "703"
	},
	"SI": {
		"countryName": "Slovenia",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "SI",
		"alpha3": "SVN",
		"numeric3": "705"
	},
	"SB": {
		"countryName": "Solomon Islands",
		"alpha2": "SB",
		"alpha3": "SLB",
		"numeric3": "90"
	},
	"SO": {
		"countryName": "Somalia",
		"postalCodeFormat": "SO.json",
		"alpha2": "SO",
		"alpha3": "SOM",
		"numeric3": "706"
	},
	"ZA": {
		"countryName": "South Africa",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "ZA",
		"alpha3": "ZAF",
		"numeric3": "710"
	},
	"GS": {
		"countryName": "South Georgia and the South Sandwich Islands",
		"postalCodeFormat": "GS.json",
		"alpha2": "GS",
		"alpha3": "SGS",
		"numeric3": "239"
	},
	"SS": {
		"countryName": "South Sudan",
		"alpha2": "SS",
		"alpha3": "SSD",
		"numeric3": "728"
	},
	"ES": {
		"countryName": "Spain",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "ES",
		"alpha3": "ESP",
		"numeric3": "724"
	},
	"LK": {
		"countryName": "Sri Lanka",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "LK",
		"alpha3": "LKA",
		"numeric3": "144"
	},
	"SD": {
		"countryName": "Sudan",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "SD",
		"alpha3": "SDN",
		"numeric3": "736"
	},
	"SR": {
		"countryName": "Suriname *",
		"alpha2": "SR",
		"alpha3": "SUR",
		"numeric3": "740"
	},
	"SJ": {
		"countryName": "Svalbard and Jan Mayen Islands",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "SJ",
		"alpha3": "SJM",
		"numeric3": "744"
	},
	"SZ": {
		"countryName": "Swaziland",
		"postalCodeFormat": "SZ.json",
		"alpha2": "SZ",
		"alpha3": "SWZ",
		"numeric3": "748"
	},
	"SE": {
		"countryName": "Sweden",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "SE",
		"alpha3": "SWE",
		"numeric3": "752"
	},
	"CH": {
		"countryName": "Switzerland",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "CH",
		"alpha3": "CHE",
		"numeric3": "756"
	},
	"SY": {
		"countryName": "Syrian Arab Republic (Syria)",
		"alpha2": "SY",
		"alpha3": "SYR",
		"numeric3": "760"
	},
	"TW": {
		"countryName": "Taiwan, Republic of China",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "TW",
		"alpha3": "TWN",
		"numeric3": "158"
	},
	"TJ": {
		"countryName": "Tajikistan",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "TJ",
		"alpha3": "TJK",
		"numeric3": "762"
	},
	"TZ": {
		"countryName": "Tanzania *, United Republic of",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "TZ",
		"alpha3": "TZA",
		"numeric3": "834"
	},
	"TH": {
		"countryName": "Thailand",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "TH",
		"alpha3": "THA",
		"numeric3": "764"
	},
	"TL": {
		"countryName": "Timor-Leste",
		"alpha2": "TL",
		"alpha3": "TLS",
		"numeric3": "626"
	},
	"TG": {
		"countryName": "Togo",
		"alpha2": "TG",
		"alpha3": "TGO",
		"numeric3": "768"
	},
	"TK": {
		"countryName": "Tokelau",
		"alpha2": "TK",
		"alpha3": "TKL",
		"numeric3": "772"
	},
	"TO": {
		"countryName": "Tonga",
		"alpha2": "TO",
		"alpha3": "TON",
		"numeric3": "776"
	},
	"TT": {
		"countryName": "Trinidad and Tobago",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "TT",
		"alpha3": "TTO",
		"numeric3": "780"
	},
	"TN": {
		"countryName": "Tunisia",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "TN",
		"alpha3": "TUN",
		"numeric3": "788"
	},
	"TR": {
		"countryName": "Turkey",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "TR",
		"alpha3": "TUR",
		"numeric3": "792"
	},
	"TM": {
		"countryName": "Turkmenistan",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "TM",
		"alpha3": "TKM",
		"numeric3": "795"
	},
	"TC": {
		"countryName": "Turks and Caicos Islands",
		"postalCodeFormat": "TC.json",
		"alpha2": "TC",
		"alpha3": "TCA",
		"numeric3": "796"
	},
	"TV": {
		"countryName": "Tuvalu",
		"alpha2": "TV",
		"alpha3": "TUV",
		"numeric3": "798"
	},
	"UG": {
		"countryName": "Uganda",
		"alpha2": "UG",
		"alpha3": "UGA",
		"numeric3": "800"
	},
	"UA": {
		"countryName": "Ukraine",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "UA",
		"alpha3": "UKR",
		"numeric3": "804"
	},
	"AE": {
		"countryName": "United Arab Emirates",
		"alpha2": "AE",
		"alpha3": "ARE",
		"numeric3": "784"
	},
	"GB": {
		"countryName": "United Kingdom",
		"postalCodeFormat": "GB.json",
		"alpha2": "GB",
		"alpha3": "GBR",
		"numeric3": "826"
	},
	"US": {
		"countryName": "United States of America",
		"postalCodeFormat": "US.json",
		"alpha2": "US",
		"alpha3": "USA",
		"numeric3": "840"
	},
	"UM": {
		"countryName": "United States Minor Outlying Islands",
		"alpha2": "UM",
		"alpha3": "UMI",
		"numeric3": "581"
	},
	"UY": {
		"countryName": "Uruguay",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "UY",
		"alpha3": "URY",
		"numeric3": "858"
	},
	"UZ": {
		"countryName": "Uzbekistan",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "UZ",
		"alpha3": "UZB",
		"numeric3": "860"
	},
	"VU": {
		"countryName": "Vanuatu",
		"alpha2": "VU",
		"alpha3": "VUT",
		"numeric3": "548"
	},
	"VE": {
		"countryName": "Venezuela (Bolivarian Republic of)",
		"postalCodeFormat": "VE.json",
		"alpha2": "VE",
		"alpha3": "VEN",
		"numeric3": "862"
	},
	"VN": {
		"countryName": "Viet Nam",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "VN",
		"alpha3": "VNM",
		"numeric3": "704"
	},
	"VI": {
		"countryName": "Virgin Islands, US",
		"postalCodeFormat": "US.json",
		"alpha2": "VI",
		"alpha3": "VIR",
		"numeric3": "850"
	},
	"WF": {
		"countryName": "Wallis and Futuna Islands",
		"postalCodeFormat": "WF.json",
		"alpha2": "WF",
		"alpha3": "WLF",
		"numeric3": "876"
	},
	"EH": {
		"countryName": "Western Sahara",
		"alpha2": "EH",
		"alpha3": "ESH",
		"numeric3": "732"
	},
	"YE": {
		"countryName": "Yemen",
		"alpha2": "YE",
		"alpha3": "YEM",
		"numeric3": "887"
	},
	"ZM": {
		"countryName": "Zambia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "ZM",
		"alpha3": "ZMB",
		"numeric3": "894"
	},
	"ZW": {
		"countryName": "Zimbabwe",
		"alpha2": "ZW",
		"alpha3": "ZWE",
		"numeric3": "716"
	}
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var getType = __webpack_require__(2);
var util = __webpack_require__(73);

function genKeysFunc(f) {
  return function(value) {
    var k = f(value);
    k.sort();
    return k;
  };
}


function Formatter(opts) {
  opts = opts || {};

  this.seen = [];
  this.keys = genKeysFunc(opts.keys === false ? Object.getOwnPropertyNames : Object.keys);

  this.maxLineLength = typeof opts.maxLineLength === 'number' ? opts.maxLineLength : 60;
  this.propSep = opts.propSep || ',';

  this.isUTCdate = !!opts.isUTCdate;
}

Formatter.prototype = {
  constructor: Formatter,

  format: function(value) {
    var t = getType(value);
    var name1 = t.type, name2 = t.type;
    if(t.cls) {
      name1 += '_' + t.cls;
      name2 += '_' + t.cls;
    }
    if(t.sub) {
      name2 += '_' + t.sub;
    }
    var f = this['_format_' + name2] || this['_format_' + name1] || this['_format_' + t.type] || this.defaultFormat;
    return f.call(this, value).trim();
  },

  _formatObject: function(value, opts) {
    opts = opts || {};
    var mainKeys = opts.keys || this.keys(value);

    var len = 0;

    var formatPropertyValue = opts.formatPropertyValue || this.formatPropertyValue;
    var formatPropertyName = opts.formatPropertyName || this.formatPropertyName;
    var keyValueSep = opts.keyValueSep || ': ';
    var keyFilter = opts.keyFilter || function() { return true; };

    this.seen.push(value);
    var keys = [];

    mainKeys.forEach(function(key) {
      if(!keyFilter(key)) return;

      var fName = formatPropertyName.call(this, key);

      var f = (fName ? fName + keyValueSep : '') + formatPropertyValue.call(this, value, key);
      len += f.length;
      keys.push(f);
    }, this);
    this.seen.pop();

    (opts.additionalProperties || []).forEach(function(keyValue) {
      var f = keyValue[0] + keyValueSep + this.format(keyValue[1]);
      len += f.length;
      keys.push(f);
    }, this);

    var prefix = opts.prefix || Formatter.constructorName(value) || '';
    if(prefix.length > 0) prefix += ' ';

    var lbracket, rbracket;
    if(Array.isArray(opts.brackets)) {
      lbracket = opts.brackets && opts.brackets[0];
      rbracket = opts.brackets && opts.brackets[1];
    } else {
      lbracket = '{';
      rbracket = '}';
    }

    var rootValue = opts.value || '';

    if(keys.length === 0)
      return rootValue || (prefix + lbracket + rbracket);

    if(len <= this.maxLineLength) {
      return prefix + lbracket + ' ' + (rootValue ? rootValue + ' ' : '') + keys.join(this.propSep + ' ') + ' ' + rbracket;
    } else {
      return prefix + lbracket + '\n' + (rootValue ? '  ' + rootValue + '\n' : '') + keys.map(util.addSpaces).join(this.propSep + '\n') + '\n' + rbracket;
    }
  },

  formatObject: function(value, prefix, props) {
    props = props || this.keys(value);

    var len = 0;

    this.seen.push(value);
    props = props.map(function(prop) {
      var f = this.formatProperty(value, prop);
      len += f.length;
      return f;
    }, this);
    this.seen.pop();

    if(props.length === 0) return '{}';

    if(len <= this.maxLineLength) {
      return '{ ' + (prefix ? prefix + ' ' : '') + props.join(this.propSep + ' ') + ' }';
    } else {
      return '{' + '\n' + (prefix ? '  ' + prefix + '\n' : '') + props.map(util.addSpaces).join(this.propSep + '\n') + '\n' + '}';
    }
  },

  formatPropertyName: function(name) {
    return name.match(/^[a-zA-Z_$][a-zA-Z_$0-9]*$/) ? name : this.format(name);
  },

  formatProperty: function(value, prop) {
    var desc = Formatter.getPropertyDescriptor(value, prop);

    var propName = this.formatPropertyName(prop);

    var propValue = desc.get && desc.set ?
      '[Getter/Setter]' : desc.get ?
      '[Getter]' : desc.set ?
      '[Setter]' : this.seen.indexOf(desc.value) >= 0 ?
      '[Circular]' :
      this.format(desc.value);

    return propName + ': ' + propValue;
  },

  formatPropertyValue: function(value, prop) {
    var desc = Formatter.getPropertyDescriptor(value, prop);

    var propValue = desc.get && desc.set ?
      '[Getter/Setter]' : desc.get ?
      '[Getter]' : desc.set ?
      '[Setter]' : this.seen.indexOf(desc.value) >= 0 ?
      '[Circular]' :
      this.format(desc.value);

    return propValue;
  }
};

Formatter.add = function add(type, cls, sub, f) {
  var args = Array.prototype.slice.call(arguments);
  f = args.pop();
  Formatter.prototype['_format_' + args.join('_')] = f;
};

Formatter.formatObjectWithPrefix = function formatObjectWithPrefix(f) {
  return function(value) {
    var prefix = f.call(this, value);
    var props = this.keys(value);
    if(props.length == 0) return prefix;
    else return this.formatObject(value, prefix, props);
  };
};

var functionNameRE = /^\s*function\s*(\S*)\s*\(/;

Formatter.functionName = function functionName(f) {
  if(f.name) {
    return f.name;
  }
  var matches = f.toString().match(functionNameRE);
  if (matches === null) {
    // `functionNameRE` doesn't match arrow functions.
    return '';
  }
  var name = matches[1];
  return name;
};

Formatter.constructorName = function(obj) {
  while (obj) {
    var descriptor = Object.getOwnPropertyDescriptor(obj, 'constructor');
    if (descriptor !== undefined &&
        typeof descriptor.value === 'function') {

        var name = Formatter.functionName(descriptor.value);
        if(name !== '') {
          return name;
        }
    }

    obj = Object.getPrototypeOf(obj);
  }
};

Formatter.getPropertyDescriptor = function(obj, value) {
  var desc;
  try {
    desc = Object.getOwnPropertyDescriptor(obj, value) || {value: obj[value]};
  } catch(e) {
    desc = {value: e};
  }
  return desc;
};

Formatter.generateFunctionForIndexedArray = function generateFunctionForIndexedArray(lengthProp, name, padding) {
  return function(value) {
    var max = this.byteArrayMaxLength || 50;
    var length = value[lengthProp];
    var formattedValues = [];
    var len = 0;
    for(var i = 0; i < max && i < length; i++) {
      var b = value[i] || 0;
      var v = util.pad0(b.toString(16), padding);
      len += v.length;
      formattedValues.push(v);
    }
    var prefix = value.constructor.name || name || '';
    if(prefix) prefix += ' ';

    if(formattedValues.length === 0)
      return prefix + '[]';

    if(len <= this.maxLineLength) {
      return prefix + '[ ' + formattedValues.join(this.propSep + ' ') + ' ' + ']';
    } else {
      return prefix + '[\n' + formattedValues.map(util.addSpaces).join(this.propSep + '\n') + '\n' + ']';
    }
  };
};

Formatter.add('undefined', function() { return 'undefined' });
Formatter.add('null', function() { return 'null' });
Formatter.add('boolean', function(value) { return value ? 'true': 'false' });
Formatter.add('symbol', function(value) { return value.toString() });

['number', 'boolean'].forEach(function(name) {
  Formatter.add('object', name, function(value) {
    return this._formatObject(value, {
      additionalProperties: [['[[PrimitiveValue]]', value.valueOf()]]
    });
  });
});

Formatter.add('object', 'string', function(value) {
  var realValue = value.valueOf();

  return this._formatObject(value, {
    keyFilter: function(key) {
      //skip useless indexed properties
      return !(key.match(/\d+/) && parseInt(key, 10) < realValue.length);
    },
    additionalProperties: [['[[PrimitiveValue]]', realValue]]
  });
});

Formatter.add('object', 'regexp', function(value) {
  return this._formatObject(value, {
    value: String(value)
  });
});

Formatter.add('number', function(value) {
  if(value === 0 && 1 / value < 0) return '-0';
  return String(value);
});

Formatter.add('string', function(value) {
  return '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
      .replace(/'/g, "\\'")
      .replace(/\\"/g, '"') + '\'';
});

Formatter.add('object', function(value) {
  return this._formatObject(value);
});

Formatter.add('object', 'arguments', function(value) {
  return this._formatObject(value, {
    prefix: 'Arguments',
    formatPropertyName: function(key) {
      if(!key.match(/\d+/)) {
        return this.formatPropertyName(key);
      }
    },
    brackets: ['[', ']']
  });
});

Formatter.add('object', 'array', function(value) {
  return this._formatObject(value, {
    formatPropertyName: function(key) {
      if(!key.match(/\d+/)) {
        return this.formatPropertyName(key);
      }
    },
    brackets: ['[', ']']
  });
});


function formatDate(value, isUTC) {
  var prefix = isUTC ? 'UTC' : '';

  var date = value['get' + prefix + 'FullYear']() +
    '-' +
    util.pad0(value['get' + prefix + 'Month']() + 1, 2) +
    '-' +
    util.pad0(value['get' + prefix + 'Date'](), 2);

  var time = util.pad0(value['get' + prefix + 'Hours'](), 2) +
    ':' +
    util.pad0(value['get' + prefix + 'Minutes'](), 2) +
    ':' +
    util.pad0(value['get' + prefix + 'Seconds'](), 2) +
    '.' +
    util.pad0(value['get' + prefix + 'Milliseconds'](), 3);

  var to = value.getTimezoneOffset();
  var absTo = Math.abs(to);
  var hours = Math.floor(absTo / 60);
  var minutes = absTo - hours * 60;
  var tzFormat = (to < 0 ? '+' : '-') + util.pad0(hours, 2) + util.pad0(minutes, 2);

  return date + ' ' + time + (isUTC ? '' : ' ' + tzFormat);
}

Formatter.add('object', 'date', function(value) {
  return this._formatObject(value, { value: formatDate(value, this.isUTCdate) });
});

Formatter.add('function', function(value) {
  return this._formatObject(value, {
    additionalProperties: [['name', Formatter.functionName(value)]]
  });
});

Formatter.add('object', 'error', function(value) {
  return this._formatObject(value, {
    prefix: value.name,
    additionalProperties: [['message', value.message]]
  });
});

Formatter.add('object', 'buffer', Formatter.generateFunctionForIndexedArray('length', 'Buffer', 2));

Formatter.add('object', 'array-buffer', Formatter.generateFunctionForIndexedArray('byteLength', 'ArrayBuffer', 2));

Formatter.add('object', 'typed-array', 'int8', Formatter.generateFunctionForIndexedArray('length', 'Int8Array', 2));
Formatter.add('object', 'typed-array', 'uint8', Formatter.generateFunctionForIndexedArray('length', 'Uint8Array', 2));
Formatter.add('object', 'typed-array', 'uint8clamped', Formatter.generateFunctionForIndexedArray('length', 'Uint8ClampedArray', 2));

Formatter.add('object', 'typed-array', 'int16', Formatter.generateFunctionForIndexedArray('length', 'Int16Array', 4));
Formatter.add('object', 'typed-array', 'uint16', Formatter.generateFunctionForIndexedArray('length', 'Uint16Array', 4));

Formatter.add('object', 'typed-array', 'int32', Formatter.generateFunctionForIndexedArray('length', 'Int32Array', 8));
Formatter.add('object', 'typed-array', 'uint32', Formatter.generateFunctionForIndexedArray('length', 'Uint32Array', 8));

//TODO add float32 and float64

Formatter.add('object', 'promise', function() {
  return '[Promise]';//TODO it could be nice to inspect its state and value
});

Formatter.add('object', 'xhr', function() {
  return '[XMLHttpRequest]';//TODO it could be nice to inspect its state
});

Formatter.add('object', 'html-element', function(value) {
  return value.outerHTML;
});

Formatter.add('object', 'html-element', '#text', function(value) {
  return value.nodeValue;
});

Formatter.add('object', 'html-element', '#document', function(value) {
  return value.documentElement.outerHTML;
});

Formatter.add('object', 'host', function() {
  return '[Host]';
});

Formatter.add('object', 'set', function(value) {
  var iter = value.values();
  var len = 0;

  this.seen.push(value);

  var props = [];

  var next = iter.next();
  while(!next.done) {
    var val = next.value;
    var f = this.format(val);
    len += f.length;
    props.push(f);

    next = iter.next();
  }

  this.seen.pop();

  if(props.length === 0) return 'Set {}';

  if(len <= this.maxLineLength) {
    return 'Set { ' + props.join(this.propSep + ' ') + ' }';
  } else {
    return 'Set {\n' + props.map(util.addSpaces).join(this.propSep + '\n') + '\n' + '}';
  }
});

Formatter.add('object', 'map', function(value) {
  var iter = value.entries();
  var len = 0;

  this.seen.push(value);

  var props = [];

  var next = iter.next();
  while(!next.done) {
    var val = next.value;
    var fK = this.format(val[0]);
    var fV = this.format(val[1]);

    var f;
    if((fK.length + fV.length + 4) <= this.maxLineLength) {
      f = fK + ' => ' + fV;
    } else {
      f = fK + ' =>\n' + fV;
    }

    len += fK.length + fV.length + 4;
    props.push(f);

    next = iter.next();
  }

  this.seen.pop();

  if(props.length === 0) return 'Map {}';

  if(len <= this.maxLineLength) {
    return 'Map { ' + props.join(this.propSep + ' ') + ' }';
  } else {
    return 'Map {\n' + props.map(util.addSpaces).join(this.propSep + '\n') + '\n' + '}';
  }
});

Formatter.prototype.defaultFormat = Formatter.prototype._format_object;

function defaultFormat(value, opts) {
  return new Formatter(opts).format(value);
}

defaultFormat.Formatter = Formatter;
module.exports = defaultFormat;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * should.js - assertion library
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */

var Formatter = __webpack_require__(62).Formatter;

var config = {
  checkProtoEql: false,

  getFormatter: function(opts) {
    return new Formatter(opts || config);
  }
};

module.exports = config;


/***/ }),
/* 64 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./10Digits": 4,
	"./10Digits.json": 4,
	"./2Digits": 5,
	"./2Digits.json": 5,
	"./3Digits": 6,
	"./3Digits.json": 6,
	"./4Digits": 7,
	"./4Digits.json": 7,
	"./5Digits": 8,
	"./5Digits.json": 8,
	"./6Digits": 9,
	"./6Digits.json": 9,
	"./7Digits": 10,
	"./7Digits.json": 10,
	"./8Digits": 11,
	"./8Digits.json": 11,
	"./AD": 12,
	"./AD.json": 12,
	"./AI": 13,
	"./AI.json": 13,
	"./AQ": 14,
	"./AQ.json": 14,
	"./AX": 15,
	"./AX.json": 15,
	"./AZ": 16,
	"./AZ.json": 16,
	"./BB": 17,
	"./BB.json": 17,
	"./BH": 18,
	"./BH.json": 18,
	"./BL": 19,
	"./BL.json": 19,
	"./BN": 20,
	"./BN.json": 20,
	"./CA": 21,
	"./CA.json": 21,
	"./FK": 22,
	"./FK.json": 22,
	"./GB": 23,
	"./GB.json": 23,
	"./GF": 24,
	"./GF.json": 24,
	"./GI": 25,
	"./GI.json": 25,
	"./GP": 26,
	"./GP.json": 26,
	"./GS": 27,
	"./GS.json": 27,
	"./HN": 28,
	"./HN.json": 28,
	"./IO": 29,
	"./IO.json": 29,
	"./KY": 30,
	"./KY.json": 30,
	"./LB": 31,
	"./LB.json": 31,
	"./LC": 32,
	"./LC.json": 32,
	"./LT": 33,
	"./LT.json": 33,
	"./LV": 34,
	"./LV.json": 34,
	"./MD": 35,
	"./MD.json": 35,
	"./MF": 36,
	"./MF.json": 36,
	"./MS": 37,
	"./MS.json": 37,
	"./MT": 38,
	"./MT.json": 38,
	"./NC": 39,
	"./NC.json": 39,
	"./NL": 40,
	"./NL.json": 40,
	"./PF": 41,
	"./PF.json": 41,
	"./PL": 42,
	"./PL.json": 42,
	"./PM": 43,
	"./PM.json": 43,
	"./PN": 44,
	"./PN.json": 44,
	"./PT": 45,
	"./PT.json": 45,
	"./RE": 46,
	"./RE.json": 46,
	"./RU": 47,
	"./RU.json": 47,
	"./SH": 48,
	"./SH.json": 48,
	"./SM": 49,
	"./SM.json": 49,
	"./SO": 50,
	"./SO.json": 50,
	"./SZ": 51,
	"./SZ.json": 51,
	"./TC": 52,
	"./TC.json": 52,
	"./US": 53,
	"./US.json": 53,
	"./VA": 54,
	"./VA.json": 54,
	"./VC": 55,
	"./VC.json": 55,
	"./VE": 56,
	"./VE.json": 56,
	"./VG": 57,
	"./VG.json": 57,
	"./WF": 58,
	"./WF.json": 58,
	"./WS": 59,
	"./WS.json": 59
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 65;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var should = __webpack_require__(88);

var defaultProto = Object.prototype;
var defaultProperty = 'should';

//Expose api via `Object#should`.
try {
  var prevShould = should.extend(defaultProperty, defaultProto);
  should._prevShould = prevShould;
} catch(e) {
  //ignore errors
}

module.exports = should;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var byAlpha2 = __webpack_require__(61);
var byAlpha3 = __webpack_require__(70);
var isNode = __webpack_require__(71);
var getFormat = null;
if (isNode) {
    getFormat = __webpack_require__(68) ;
} else {
    getFormat = __webpack_require__(69) ;
}

module.exports.validate = function (countryCode, postalCode, callback) {

    if (callback) {
        return validatePostalCodeInternal(countryCode, postalCode, callback);
    }

    var result;
    validatePostalCodeInternal(countryCode, postalCode, function (err, isValid) {
        result = isValid;
    });

    return result;
};

function validatePostalCodeInternal(countryCode, postalCode, callback) {
    if (!countryCode) {
        callback('Invalid country code.');
        return;
    }

    if (!postalCode) {
        callback('Invalid postal code.');
        return;
    }

    var countryData = undefined;
    countryCode = countryCode.trim();

    // Is it alpha2 ?
    if (countryCode.length == 2) {
        countryData = byAlpha2[countryCode.toUpperCase()];
    }

    // Is it alpha3 ?
    if (countryCode.length == 3) {
        countryData = byAlpha3[countryCode.toUpperCase()];
    }

    if (!countryData) {
        callback('Unknown alpha2/alpha3 country code: ' + countryCode);
        return;
    }

    var format = getFormat(countryData.postalCodeFormat);
    if (!format) {
        callback('Failed to load postal code format "' + countryData.postalCodeFormat + '".');
        return;
    }

    postalCode = postalCode.toString().trim();
    var preparedPostalCode = postalCode.slice(0);
    for(var i=0; i<format.RedundantCharacters.length; i++) {
        preparedPostalCode = preparedPostalCode.replace(new RegExp(format.RedundantCharacters[i], 'g'), '');
    }

    var expression = format.ValidationRegex;
    if (expression instanceof Array) {
        expression = '^' + expression.join('|') + '$';
    }

    var regexp = new RegExp(expression, 'i');
    var result = regexp.exec(preparedPostalCode);

    if (!result) {
        // Invalid postal code
        callback(null, false);
        return;
    }

    if (result[0].toLowerCase() != preparedPostalCode.toLowerCase()) {
        // Found "sub" match
        callback(null, false);
        return;
    }

    // Valid postal code
    callback(null, true);
}


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var path = __webpack_require__(94);

module.exports = function getFormat(postalCodeFormat){
    var format = eval('require')(path.join(__dirname, 'formats', postalCodeFormat));
    return format;
}
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var formats = {} ;

formats["10Digits.json"] = __webpack_require__(4);
formats["2Digits.json"] = __webpack_require__(5);
formats["3Digits.json"] = __webpack_require__(6);
formats["4Digits.json"] = __webpack_require__(7);
formats["5Digits.json"] = __webpack_require__(8);
formats["6Digits.json"] = __webpack_require__(9);
formats["7Digits.json"] = __webpack_require__(10);
formats["8Digits.json"] = __webpack_require__(11);
formats["AD.json"] = __webpack_require__(12);
formats["AI.json"] = __webpack_require__(13);
formats["AQ.json"] = __webpack_require__(14);
formats["AX.json"] = __webpack_require__(15);
formats["AZ.json"] = __webpack_require__(16);
formats["BB.json"] = __webpack_require__(17);
formats["BH.json"] = __webpack_require__(18);
formats["BL.json"] = __webpack_require__(19);
formats["BN.json"] = __webpack_require__(20);
formats["CA.json"] = __webpack_require__(21);
formats["FK.json"] = __webpack_require__(22);
formats["GB.json"] = __webpack_require__(23);
formats["GF.json"] = __webpack_require__(24);
formats["GI.json"] = __webpack_require__(25);
formats["GP.json"] = __webpack_require__(26);
formats["GS.json"] = __webpack_require__(27);
formats["HN.json"] = __webpack_require__(28);
formats["IO.json"] = __webpack_require__(29);
formats["KY.json"] = __webpack_require__(30);
formats["LB.json"] = __webpack_require__(31);
formats["LC.json"] = __webpack_require__(32);
formats["LT.json"] = __webpack_require__(33);
formats["LV.json"] = __webpack_require__(34);
formats["MD.json"] = __webpack_require__(35);
formats["MF.json"] = __webpack_require__(36);
formats["MS.json"] = __webpack_require__(37);
formats["MT.json"] = __webpack_require__(38);
formats["NC.json"] = __webpack_require__(39);
formats["NL.json"] = __webpack_require__(40);
formats["PF.json"] = __webpack_require__(41);
formats["PL.json"] = __webpack_require__(42);
formats["PM.json"] = __webpack_require__(43);
formats["PN.json"] = __webpack_require__(44);
formats["PT.json"] = __webpack_require__(45);
formats["RE.json"] = __webpack_require__(46);
formats["RU.json"] = __webpack_require__(47);
formats["SH.json"] = __webpack_require__(48);
formats["SM.json"] = __webpack_require__(49);
formats["SO.json"] = __webpack_require__(50);
formats["SZ.json"] = __webpack_require__(51);
formats["TC.json"] = __webpack_require__(52);
formats["US.json"] = __webpack_require__(53);
formats["VA.json"] = __webpack_require__(54);
formats["VC.json"] = __webpack_require__(55);
formats["VE.json"] = __webpack_require__(56);
formats["VG.json"] = __webpack_require__(57);
formats["WF.json"] = __webpack_require__(58);
formats["WS.json"] = __webpack_require__(59);


module.exports = function getFormat(postalCodeFormat){
    var format = formats[postalCodeFormat];
    return format;
}

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = {
	"AFG": {
		"countryName": "Afghanistan",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "AF",
		"alpha3": "AFG",
		"numeric3": "4"
	},
	"ALA": {
		"countryName": "Aland Islands",
		"postalCodeFormat": "AX.json",
		"alpha2": "AX",
		"alpha3": "ALA",
		"numeric3": "248"
	},
	"ALB": {
		"countryName": "Albania",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "AL",
		"alpha3": "ALB",
		"numeric3": "8"
	},
	"DZA": {
		"countryName": "Algeria",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "DZ",
		"alpha3": "DZA",
		"numeric3": "12"
	},
	"ASM": {
		"countryName": "American Samoa",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "AS",
		"alpha3": "ASM",
		"numeric3": "16"
	},
	"AND": {
		"countryName": "Andorra",
		"postalCodeFormat": "AD.json",
		"alpha2": "AD",
		"alpha3": "AND",
		"numeric3": "20"
	},
	"AGO": {
		"countryName": "Angola",
		"alpha2": "AO",
		"alpha3": "AGO",
		"numeric3": "24"
	},
	"AIA": {
		"countryName": "Anguilla",
		"postalCodeFormat": "AI.json",
		"alpha2": "AI",
		"alpha3": "AIA",
		"numeric3": "660"
	},
	"ATA": {
		"countryName": "Antarctica",
		"postalCodeFormat": "AQ.json",
		"alpha2": "AQ",
		"alpha3": "ATA",
		"numeric3": "10"
	},
	"ATG": {
		"countryName": "Antigua and Barbuda",
		"alpha2": "AG",
		"alpha3": "ATG",
		"numeric3": "28"
	},
	"ARG": {
		"countryName": "Argentina",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "AR",
		"alpha3": "ARG",
		"numeric3": "32"
	},
	"ARM": {
		"countryName": "Armenia",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "AM",
		"alpha3": "ARM",
		"numeric3": "51"
	},
	"ABW": {
		"countryName": "Aruba",
		"alpha2": "AW",
		"alpha3": "ABW",
		"numeric3": "533"
	},
	"AUS": {
		"countryName": "Australia",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "AU",
		"alpha3": "AUS",
		"numeric3": "36"
	},
	"AUT": {
		"countryName": "Austria",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "AT",
		"alpha3": "AUT",
		"numeric3": "40"
	},
	"AZE": {
		"countryName": "Azerbaijan",
		"postalCodeFormat": "AZ.json",
		"alpha2": "AZ",
		"alpha3": "AZE",
		"numeric3": "31"
	},
	"BHS": {
		"countryName": "Bahamas",
		"alpha2": "BS",
		"alpha3": "BHS",
		"numeric3": "44"
	},
	"BHR": {
		"countryName": "Bahrain",
		"postalCodeFormat": "BH.json",
		"alpha2": "BH",
		"alpha3": "BHR",
		"numeric3": "48"
	},
	"BGD": {
		"countryName": "Bangladesh",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "BD",
		"alpha3": "BGD",
		"numeric3": "50"
	},
	"BRB": {
		"countryName": "Barbados",
		"postalCodeFormat": "BB.json",
		"alpha2": "BB",
		"alpha3": "BRB",
		"numeric3": "52"
	},
	"BLR": {
		"countryName": "Belarus",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "BY",
		"alpha3": "BLR",
		"numeric3": "112"
	},
	"BEL": {
		"countryName": "Belgium",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "BE",
		"alpha3": "BEL",
		"numeric3": "56"
	},
	"BLZ": {
		"countryName": "Belize",
		"alpha2": "BZ",
		"alpha3": "BLZ",
		"numeric3": "84"
	},
	"BEN": {
		"countryName": "Benin",
		"alpha2": "BJ",
		"alpha3": "BEN",
		"numeric3": "204"
	},
	"BMU": {
		"countryName": "Bermuda",
		"alpha2": "BM",
		"alpha3": "BMU",
		"numeric3": "60"
	},
	"BTN": {
		"countryName": "Bhutan",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "BT",
		"alpha3": "BTN",
		"numeric3": "64"
	},
	"BOL": {
		"countryName": "Bolivia",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "BO",
		"alpha3": "BOL",
		"numeric3": "68"
	},
	"BIH": {
		"countryName": "Bosnia and Herzegovina",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "BA",
		"alpha3": "BIH",
		"numeric3": "70"
	},
	"BWA": {
		"countryName": "Botswana",
		"alpha2": "BW",
		"alpha3": "BWA",
		"numeric3": "72"
	},
	"BVT": {
		"countryName": "Bouvet Island",
		"alpha2": "BV",
		"alpha3": "BVT",
		"numeric3": "74"
	},
	"BRA": {
		"countryName": "Brazil",
		"postalCodeFormat": "8Digits.json",
		"alpha2": "BR",
		"alpha3": "BRA",
		"numeric3": "76"
	},
	"VGB": {
		"countryName": "British Virgin Islands",
		"postalCodeFormat": "VG.json",
		"alpha2": "VG",
		"alpha3": "VGB",
		"numeric3": "92"
	},
	"IOT": {
		"countryName": "British Indian Ocean Territory",
		"postalCodeFormat": "IO.json",
		"alpha2": "IO",
		"alpha3": "IOT",
		"numeric3": "86"
	},
	"BRN": {
		"countryName": "Brunei Darussalam",
		"postalCodeFormat": "BN.json",
		"alpha2": "BN",
		"alpha3": "BRN",
		"numeric3": "96"
	},
	"BGR": {
		"countryName": "Bulgaria",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "BG",
		"alpha3": "BGR",
		"numeric3": "100"
	},
	"BFA": {
		"countryName": "Burkina Faso",
		"alpha2": "BF",
		"alpha3": "BFA",
		"numeric3": "854"
	},
	"BDI": {
		"countryName": "Burundi",
		"alpha2": "BI",
		"alpha3": "BDI",
		"numeric3": "108"
	},
	"KHM": {
		"countryName": "Cambodia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "KH",
		"alpha3": "KHM",
		"numeric3": "116"
	},
	"CMR": {
		"countryName": "Cameroon",
		"alpha2": "CM",
		"alpha3": "CMR",
		"numeric3": "120"
	},
	"CAN": {
		"countryName": "Canada",
		"postalCodeFormat": "CA.json",
		"alpha2": "CA",
		"alpha3": "CAN",
		"numeric3": "124"
	},
	"CPV": {
		"countryName": "Cape Verde",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "CV",
		"alpha3": "CPV",
		"numeric3": "132"
	},
	"CYM": {
		"countryName": "Cayman Islands",
		"postalCodeFormat": "KY.json",
		"alpha2": "KY",
		"alpha3": "CYM",
		"numeric3": "136"
	},
	"CAF": {
		"countryName": "Central African Republic",
		"alpha2": "CF",
		"alpha3": "CAF",
		"numeric3": "140"
	},
	"TCD": {
		"countryName": "Chad",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "TD",
		"alpha3": "TCD",
		"numeric3": "148"
	},
	"CHL": {
		"countryName": "Chile",
		"postalCodeFormat": "7Digits.json",
		"alpha2": "CL",
		"alpha3": "CHL",
		"numeric3": "152"
	},
	"CHN": {
		"countryName": "China",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "CN",
		"alpha3": "CHN",
		"numeric3": "156"
	},
	"HKG": {
		"countryName": "Hong Kong, Special Administrative Region of China",
		"alpha2": "HK",
		"alpha3": "HKG",
		"numeric3": "344"
	},
	"MAC": {
		"countryName": "Macao, Special Administrative Region of China",
		"alpha2": "MO",
		"alpha3": "MAC",
		"numeric3": "446"
	},
	"CXR": {
		"countryName": "Christmas Island",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "CX",
		"alpha3": "CXR",
		"numeric3": "162"
	},
	"CCK": {
		"countryName": "Cocos (Keeling) Islands",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "CC",
		"alpha3": "CCK",
		"numeric3": "166"
	},
	"COL": {
		"countryName": "Colombia",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "CO",
		"alpha3": "COL",
		"numeric3": "170"
	},
	"COM": {
		"countryName": "Comoros",
		"alpha2": "KM",
		"alpha3": "COM",
		"numeric3": "174"
	},
	"COG": {
		"countryName": "Congo (Brazzaville)",
		"alpha2": "CG",
		"alpha3": "COG",
		"numeric3": "178"
	},
	"COD": {
		"countryName": "Congo, Democratic Republic of the",
		"alpha2": "CD",
		"alpha3": "COD",
		"numeric3": "180"
	},
	"COK": {
		"countryName": "Cook Islands",
		"alpha2": "CK",
		"alpha3": "COK",
		"numeric3": "184"
	},
	"CRI": {
		"countryName": "Costa Rica",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "CR",
		"alpha3": "CRI",
		"numeric3": "188"
	},
	"CIV": {
		"countryName": "Côte d'Ivoire",
		"alpha2": "CI",
		"alpha3": "CIV",
		"numeric3": "384"
	},
	"HRV": {
		"countryName": "Croatia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "HR",
		"alpha3": "HRV",
		"numeric3": "191"
	},
	"CUB": {
		"countryName": "Cuba",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "CU",
		"alpha3": "CUB",
		"numeric3": "192"
	},
	"CYP": {
		"countryName": "Cyprus",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "CY",
		"alpha3": "CYP",
		"numeric3": "196"
	},
	"CZE": {
		"countryName": "Czech Republic",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "CZ",
		"alpha3": "CZE",
		"numeric3": "203"
	},
	"DNK": {
		"countryName": "Denmark",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "DK",
		"alpha3": "DNK",
		"numeric3": "208"
	},
	"DJI": {
		"countryName": "Djibouti",
		"alpha2": "DJ",
		"alpha3": "DJI",
		"numeric3": "262"
	},
	"DMA": {
		"countryName": "Dominica",
		"alpha2": "DM",
		"alpha3": "DMA",
		"numeric3": "212"
	},
	"DOM": {
		"countryName": "Dominican Republic",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "DO",
		"alpha3": "DOM",
		"numeric3": "214"
	},
	"ECU": {
		"countryName": "Ecuador",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "EC",
		"alpha3": "ECU",
		"numeric3": "218"
	},
	"EGY": {
		"countryName": "Egypt",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "EG",
		"alpha3": "EGY",
		"numeric3": "818"
	},
	"SLV": {
		"countryName": "El Salvador",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "SV",
		"alpha3": "SLV",
		"numeric3": "222"
	},
	"GNQ": {
		"countryName": "Equatorial Guinea",
		"alpha2": "GQ",
		"alpha3": "GNQ",
		"numeric3": "226"
	},
	"ERI": {
		"countryName": "Eritrea",
		"alpha2": "ER",
		"alpha3": "ERI",
		"numeric3": "232"
	},
	"EST": {
		"countryName": "Estonia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "EE",
		"alpha3": "EST",
		"numeric3": "233"
	},
	"ETH": {
		"countryName": "Ethiopia",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "ET",
		"alpha3": "ETH",
		"numeric3": "231"
	},
	"FLK": {
		"countryName": "Falkland Islands (Malvinas)",
		"postalCodeFormat": "FK.json",
		"alpha2": "FK",
		"alpha3": "FLK",
		"numeric3": "238"
	},
	"FRO": {
		"countryName": "Faroe Islands",
		"postalCodeFormat": "3Digits.json",
		"alpha2": "FO",
		"alpha3": "FRO",
		"numeric3": "234"
	},
	"FJI": {
		"countryName": "Fiji",
		"alpha2": "FJ",
		"alpha3": "FJI",
		"numeric3": "242"
	},
	"FIN": {
		"countryName": "Finland",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "FI",
		"alpha3": "FIN",
		"numeric3": "246"
	},
	"FRA": {
		"countryName": "France",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "FR",
		"alpha3": "FRA",
		"numeric3": "250"
	},
	"GUF": {
		"countryName": "French Guiana",
		"postalCodeFormat": "GF.json",
		"alpha2": "GF",
		"alpha3": "GUF",
		"numeric3": "254"
	},
	"PYF": {
		"countryName": "French Polynesia",
		"postalCodeFormat": "PF.json",
		"alpha2": "PF",
		"alpha3": "PYF",
		"numeric3": "258"
	},
	"ATF": {
		"countryName": "French Southern Territories",
		"alpha2": "TF",
		"alpha3": "ATF",
		"numeric3": "260"
	},
	"GAB": {
		"countryName": "Gabon",
		"alpha2": "GA",
		"alpha3": "GAB",
		"numeric3": "266"
	},
	"GMB": {
		"countryName": "Gambia",
		"alpha2": "GM",
		"alpha3": "GMB",
		"numeric3": "270"
	},
	"GEO": {
		"countryName": "Georgia",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "GE",
		"alpha3": "GEO",
		"numeric3": "268"
	},
	"DEU": {
		"countryName": "Germany",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "DE",
		"alpha3": "DEU",
		"numeric3": "276"
	},
	"GHA": {
		"countryName": "Ghana",
		"alpha2": "GH",
		"alpha3": "GHA",
		"numeric3": "288"
	},
	"GIB": {
		"countryName": "Gibraltar",
		"postalCodeFormat": "GI.json",
		"alpha2": "GI",
		"alpha3": "GIB",
		"numeric3": "292"
	},
	"GRC": {
		"countryName": "Greece",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "GR",
		"alpha3": "GRC",
		"numeric3": "300"
	},
	"GRL": {
		"countryName": "Greenland",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "GL",
		"alpha3": "GRL",
		"numeric3": "304"
	},
	"GRD": {
		"countryName": "Grenada",
		"alpha2": "GD",
		"alpha3": "GRD",
		"numeric3": "308"
	},
	"GLP": {
		"countryName": "Guadeloupe",
		"postalCodeFormat": "GP.json",
		"alpha2": "GP",
		"alpha3": "GLP",
		"numeric3": "312"
	},
	"GUM": {
		"countryName": "Guam",
		"postalCodeFormat": "US.json",
		"alpha2": "GU",
		"alpha3": "GUM",
		"numeric3": "316"
	},
	"GTM": {
		"countryName": "Guatemala",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "GT",
		"alpha3": "GTM",
		"numeric3": "320"
	},
	"GGY": {
		"countryName": "Guernsey",
		"postalCodeFormat": "GB.json",
		"alpha2": "GG",
		"alpha3": "GGY",
		"numeric3": "831"
	},
	"GIN": {
		"countryName": "Guinea",
		"postalCodeFormat": "3Digits.json",
		"alpha2": "GN",
		"alpha3": "GIN",
		"numeric3": "324"
	},
	"GNB": {
		"countryName": "Guinea-Bissau",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "GW",
		"alpha3": "GNB",
		"numeric3": "624"
	},
	"GUY": {
		"countryName": "Guyana",
		"alpha2": "GY",
		"alpha3": "GUY",
		"numeric3": "328"
	},
	"HTI": {
		"countryName": "Haiti",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "HT",
		"alpha3": "HTI",
		"numeric3": "332"
	},
	"HMD": {
		"countryName": "Heard Island and Mcdonald Islands",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "HM",
		"alpha3": "HMD",
		"numeric3": "334"
	},
	"VAT": {
		"countryName": "Holy See (Vatican City State)",
		"postalCodeFormat": "VA.json",
		"alpha2": "VA",
		"alpha3": "VAT",
		"numeric3": "336"
	},
	"HND": {
		"countryName": "Honduras",
		"postalCodeFormat": "HN.json",
		"alpha2": "HN",
		"alpha3": "HND",
		"numeric3": "340"
	},
	"HUN": {
		"countryName": "Hungary",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "HU",
		"alpha3": "HUN",
		"numeric3": "348"
	},
	"ISL": {
		"countryName": "Iceland",
		"postalCodeFormat": "3Digits.json",
		"alpha2": "IS",
		"alpha3": "ISL",
		"numeric3": "352"
	},
	"IND": {
		"countryName": "India",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "IN",
		"alpha3": "IND",
		"numeric3": "356"
	},
	"IDN": {
		"countryName": "Indonesia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "ID",
		"alpha3": "IDN",
		"numeric3": "360"
	},
	"IRN": {
		"countryName": "Iran, Islamic Republic of",
		"postalCodeFormat": "10Digits.json",
		"alpha2": "IR",
		"alpha3": "IRN",
		"numeric3": "364"
	},
	"IRQ": {
		"countryName": "Iraq",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "IQ",
		"alpha3": "IRQ",
		"numeric3": "368"
	},
	"IRL": {
		"countryName": "Ireland",
		"alpha2": "IE",
		"alpha3": "IRL",
		"numeric3": "372"
	},
	"IMN": {
		"countryName": "Isle of Man",
		"postalCodeFormat": "GB.json",
		"alpha2": "IM",
		"alpha3": "IMN",
		"numeric3": "833"
	},
	"ISR": {
		"countryName": "Israel",
		"postalCodeFormat": "7Digits.json",
		"alpha2": "IL",
		"alpha3": "ISR",
		"numeric3": "376"
	},
	"ITA": {
		"countryName": "Italy",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "IT",
		"alpha3": "ITA",
		"numeric3": "380"
	},
	"JAM": {
		"countryName": "Jamaica",
		"postalCodeFormat": "2Digits.json",
		"alpha2": "JM",
		"alpha3": "JAM",
		"numeric3": "388"
	},
	"JPN": {
		"countryName": "Japan",
		"postalCodeFormat": "7Digits.json",
		"alpha2": "JP",
		"alpha3": "JPN",
		"numeric3": "392"
	},
	"JEY": {
		"countryName": "Jersey",
		"postalCodeFormat": "GB.json",
		"alpha2": "JE",
		"alpha3": "JEY",
		"numeric3": "832"
	},
	"JOR": {
		"countryName": "Jordan",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "JO",
		"alpha3": "JOR",
		"numeric3": "400"
	},
	"KAZ": {
		"countryName": "Kazakhstan",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "KZ",
		"alpha3": "KAZ",
		"numeric3": "398"
	},
	"KEN": {
		"countryName": "Kenya",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "KE",
		"alpha3": "KEN",
		"numeric3": "404"
	},
	"KIR": {
		"countryName": "Kiribati",
		"alpha2": "KI",
		"alpha3": "KIR",
		"numeric3": "296"
	},
	"PRK": {
		"countryName": "Korea, Democratic People's Republic of",
		"alpha2": "KP",
		"alpha3": "PRK",
		"numeric3": "408"
	},
	"KOR": {
		"countryName": "Korea, Republic of",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "KR",
		"alpha3": "KOR",
		"numeric3": "410"
	},
	"KWT": {
		"countryName": "Kuwait",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "KW",
		"alpha3": "KWT",
		"numeric3": "414"
	},
	"KGZ": {
		"countryName": "Kyrgyzstan",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "KG",
		"alpha3": "KGZ",
		"numeric3": "417"
	},
	"LAO": {
		"countryName": "Lao PDR",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "LA",
		"alpha3": "LAO",
		"numeric3": "418"
	},
	"LVA": {
		"countryName": "Latvia",
		"postalCodeFormat": "LV.json",
		"alpha2": "LV",
		"alpha3": "LVA",
		"numeric3": "428"
	},
	"LBN": {
		"countryName": "Lebanon",
		"postalCodeFormat": "LB.json",
		"alpha2": "LB",
		"alpha3": "LBN",
		"numeric3": "422"
	},
	"LSO": {
		"countryName": "Lesotho",
		"postalCodeFormat": "3Digits.json",
		"alpha2": "LS",
		"alpha3": "LSO",
		"numeric3": "426"
	},
	"LBR": {
		"countryName": "Liberia",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "LR",
		"alpha3": "LBR",
		"numeric3": "430"
	},
	"LBY": {
		"countryName": "Libya",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "LY",
		"alpha3": "LBY",
		"numeric3": "434"
	},
	"LIE": {
		"countryName": "Liechtenstein",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "LI",
		"alpha3": "LIE",
		"numeric3": "438"
	},
	"LTU": {
		"countryName": "Lithuania",
		"postalCodeFormat": "LT.json",
		"alpha2": "LT",
		"alpha3": "LTU",
		"numeric3": "440"
	},
	"LUX": {
		"countryName": "Luxembourg",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "LU",
		"alpha3": "LUX",
		"numeric3": "442"
	},
	"MKD": {
		"countryName": "Macedonia, Republic of",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "MK",
		"alpha3": "MKD",
		"numeric3": "807"
	},
	"MDG": {
		"countryName": "Madagascar",
		"postalCodeFormat": "3Digits.json",
		"alpha2": "MG",
		"alpha3": "MDG",
		"numeric3": "450"
	},
	"MWI": {
		"countryName": "Malawi",
		"alpha2": "MW",
		"alpha3": "MWI",
		"numeric3": "454"
	},
	"MYS": {
		"countryName": "Malaysia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MY",
		"alpha3": "MYS",
		"numeric3": "458"
	},
	"MDV": {
		"countryName": "Maldives",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MV",
		"alpha3": "MDV",
		"numeric3": "462"
	},
	"MLI": {
		"countryName": "Mali",
		"alpha2": "ML",
		"alpha3": "MLI",
		"numeric3": "466"
	},
	"MLT": {
		"countryName": "Malta",
		"postalCodeFormat": "MT.json",
		"alpha2": "MT",
		"alpha3": "MLT",
		"numeric3": "470"
	},
	"MHL": {
		"countryName": "Marshall Islands",
		"postalCodeFormat": "US.json",
		"alpha2": "MH",
		"alpha3": "MHL",
		"numeric3": "584"
	},
	"MTQ": {
		"countryName": "Martinique",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MQ",
		"alpha3": "MTQ",
		"numeric3": "474"
	},
	"MRT": {
		"countryName": "Mauritania",
		"alpha2": "MR",
		"alpha3": "MRT",
		"numeric3": "478"
	},
	"MUS": {
		"countryName": "Mauritius",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MU",
		"alpha3": "MUS",
		"numeric3": "480"
	},
	"MYT": {
		"countryName": "Mayotte",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "YT",
		"alpha3": "MYT",
		"numeric3": "175"
	},
	"MEX": {
		"countryName": "Mexico",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MX",
		"alpha3": "MEX",
		"numeric3": "484"
	},
	"FSM": {
		"countryName": "Micronesia, Federated States of",
		"postalCodeFormat": "US.json",
		"alpha2": "FM",
		"alpha3": "FSM",
		"numeric3": "583"
	},
	"MDA": {
		"countryName": "Moldova",
		"postalCodeFormat": "MD.json",
		"alpha2": "MD",
		"alpha3": "MDA",
		"numeric3": "498"
	},
	"MCO": {
		"countryName": "Monaco",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MC",
		"alpha3": "MCO",
		"numeric3": "492"
	},
	"MNG": {
		"countryName": "Mongolia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MN",
		"alpha3": "MNG",
		"numeric3": "496"
	},
	"MNE": {
		"countryName": "Montenegro",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "ME",
		"alpha3": "MNE",
		"numeric3": "499"
	},
	"MSR": {
		"countryName": "Montserrat",
		"postalCodeFormat": "MS.json",
		"alpha2": "MS",
		"alpha3": "MSR",
		"numeric3": "500"
	},
	"MAR": {
		"countryName": "Morocco",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MA",
		"alpha3": "MAR",
		"numeric3": "504"
	},
	"MOZ": {
		"countryName": "Mozambique",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "MZ",
		"alpha3": "MOZ",
		"numeric3": "508"
	},
	"MMR": {
		"countryName": "Myanmar",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "MM",
		"alpha3": "MMR",
		"numeric3": "104"
	},
	"NAM": {
		"countryName": "Namibia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "NA",
		"alpha3": "NAM",
		"numeric3": "516"
	},
	"NRU": {
		"countryName": "Nauru",
		"alpha2": "NR",
		"alpha3": "NRU",
		"numeric3": "520"
	},
	"NPL": {
		"countryName": "Nepal",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "NP",
		"alpha3": "NPL",
		"numeric3": "524"
	},
	"NLD": {
		"countryName": "Netherlands",
		"postalCodeFormat": "NL.json",
		"alpha2": "NL",
		"alpha3": "NLD",
		"numeric3": "528"
	},
	"ANT": {
		"countryName": "Netherlands Antilles",
		"alpha2": "AN",
		"alpha3": "ANT",
		"numeric3": "530"
	},
	"NCL": {
		"countryName": "New Caledonia",
		"postalCodeFormat": "NC.json",
		"alpha2": "NC",
		"alpha3": "NCL",
		"numeric3": "540"
	},
	"NZL": {
		"countryName": "New Zealand",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "NZ",
		"alpha3": "NZL",
		"numeric3": "554"
	},
	"NIC": {
		"countryName": "Nicaragua",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "NI",
		"alpha3": "NIC",
		"numeric3": "558"
	},
	"NER": {
		"countryName": "Niger",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "NE",
		"alpha3": "NER",
		"numeric3": "562"
	},
	"NGA": {
		"countryName": "Nigeria",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "NG",
		"alpha3": "NGA",
		"numeric3": "566"
	},
	"NIU": {
		"countryName": "Niue",
		"alpha2": "NU",
		"alpha3": "NIU",
		"numeric3": "570"
	},
	"NFK": {
		"countryName": "Norfolk Island",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "NF",
		"alpha3": "NFK",
		"numeric3": "574"
	},
	"MNP": {
		"countryName": "Northern Mariana Islands",
		"postalCodeFormat": "US.json",
		"alpha2": "MP",
		"alpha3": "MNP",
		"numeric3": "580"
	},
	"NOR": {
		"countryName": "Norway",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "NO",
		"alpha3": "NOR",
		"numeric3": "578"
	},
	"OMN": {
		"countryName": "Oman",
		"postalCodeFormat": "3Digits.json",
		"alpha2": "OM",
		"alpha3": "OMN",
		"numeric3": "512"
	},
	"PAK": {
		"countryName": "Pakistan",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "PK",
		"alpha3": "PAK",
		"numeric3": "586"
	},
	"PLW": {
		"countryName": "Palau",
		"postalCodeFormat": "US.json",
		"alpha2": "PW",
		"alpha3": "PLW",
		"numeric3": "585"
	},
	"PSE": {
		"countryName": "Palestinian Territory, Occupied",
		"postalCodeFormat": "3Digits.json",
		"alpha2": "PS",
		"alpha3": "PSE",
		"numeric3": "275"
	},
	"PAN": {
		"countryName": "Panama",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "PA",
		"alpha3": "PAN",
		"numeric3": "591"
	},
	"PNG": {
		"countryName": "Papua New Guinea",
		"postalCodeFormat": "3Digits.json",
		"alpha2": "PG",
		"alpha3": "PNG",
		"numeric3": "598"
	},
	"PRY": {
		"countryName": "Paraguay",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "PY",
		"alpha3": "PRY",
		"numeric3": "600"
	},
	"PER": {
		"countryName": "Peru",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "PE",
		"alpha3": "PER",
		"numeric3": "604"
	},
	"PHL": {
		"countryName": "Philippines",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "PH",
		"alpha3": "PHL",
		"numeric3": "608"
	},
	"PCN": {
		"countryName": "Pitcairn",
		"postalCodeFormat": "PN.json",
		"alpha2": "PN",
		"alpha3": "PCN",
		"numeric3": "612"
	},
	"POL": {
		"countryName": "Poland",
		"postalCodeFormat": "PL.json",
		"alpha2": "PL",
		"alpha3": "POL",
		"numeric3": "616"
	},
	"PRT": {
		"countryName": "Portugal",
		"postalCodeFormat": "PT.json",
		"alpha2": "PT",
		"alpha3": "PRT",
		"numeric3": "620"
	},
	"PRI": {
		"countryName": "Puerto Rico",
		"postalCodeFormat": "US.json",
		"alpha2": "PR",
		"alpha3": "PRI",
		"numeric3": "630"
	},
	"QAT": {
		"countryName": "Qatar",
		"alpha2": "QA",
		"alpha3": "QAT",
		"numeric3": "634"
	},
	"REU": {
		"countryName": "Réunion",
		"postalCodeFormat": "RE.json",
		"alpha2": "RE",
		"alpha3": "REU",
		"numeric3": "638"
	},
	"ROU": {
		"countryName": "Romania",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "RO",
		"alpha3": "ROU",
		"numeric3": "642"
	},
	"RUS": {
		"countryName": "Russian Federation",
		"postalCodeFormat": "RU.json",
		"alpha2": "RU",
		"alpha3": "RUS",
		"numeric3": "643"
	},
	"RWA": {
		"countryName": "Rwanda",
		"alpha2": "RW",
		"alpha3": "RWA",
		"numeric3": "646"
	},
	"BLM": {
		"countryName": "Saint-Barthélemy",
		"postalCodeFormat": "BL.json",
		"alpha2": "BL",
		"alpha3": "BLM",
		"numeric3": "652"
	},
	"SHN": {
		"countryName": "Saint Helena",
		"postalCodeFormat": "SH.json",
		"alpha2": "SH",
		"alpha3": "SHN",
		"numeric3": "654"
	},
	"KNA": {
		"countryName": "Saint Kitts and Nevis",
		"alpha2": "KN",
		"alpha3": "KNA",
		"numeric3": "659"
	},
	"LCA": {
		"countryName": "Saint Lucia",
		"postalCodeFormat": "LC.json",
		"alpha2": "LC",
		"alpha3": "LCA",
		"numeric3": "662"
	},
	"MAF": {
		"countryName": "Saint-Martin (French part)",
		"postalCodeFormat": "MF.json",
		"alpha2": "MF",
		"alpha3": "MAF",
		"numeric3": "663"
	},
	"SPM": {
		"countryName": "Saint Pierre and Miquelon",
		"postalCodeFormat": "PM.json",
		"alpha2": "PM",
		"alpha3": "SPM",
		"numeric3": "666"
	},
	"VCT": {
		"countryName": "Saint Vincent and Grenadines",
		"postalCodeFormat": "VC.json",
		"alpha2": "VC",
		"alpha3": "VCT",
		"numeric3": "670"
	},
	"WSM": {
		"countryName": "Samoa",
		"postalCodeFormat": "WS.json",
		"alpha2": "WS",
		"alpha3": "WSM",
		"numeric3": "882"
	},
	"SMR": {
		"countryName": "San Marino",
		"postalCodeFormat": "SM.json",
		"alpha2": "SM",
		"alpha3": "SMR",
		"numeric3": "674"
	},
	"STP": {
		"countryName": "Sao Tome and Principe",
		"alpha2": "ST",
		"alpha3": "STP",
		"numeric3": "678"
	},
	"SAU": {
		"countryName": "Saudi Arabia",
		"postalCodeFormat": "US.json",
		"alpha2": "SA",
		"alpha3": "SAU",
		"numeric3": "682"
	},
	"SEN": {
		"countryName": "Senegal",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "SN",
		"alpha3": "SEN",
		"numeric3": "686"
	},
	"SRB": {
		"countryName": "Serbia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "RS",
		"alpha3": "SRB",
		"numeric3": "688"
	},
	"SYC": {
		"countryName": "Seychelles",
		"alpha2": "SC",
		"alpha3": "SYC",
		"numeric3": "690"
	},
	"SLE": {
		"countryName": "Sierra Leone",
		"alpha2": "SL",
		"alpha3": "SLE",
		"numeric3": "694"
	},
	"SGP": {
		"countryName": "Singapore",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "SG",
		"alpha3": "SGP",
		"numeric3": "702"
	},
	"SVK": {
		"countryName": "Slovakia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "SK",
		"alpha3": "SVK",
		"numeric3": "703"
	},
	"SVN": {
		"countryName": "Slovenia",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "SI",
		"alpha3": "SVN",
		"numeric3": "705"
	},
	"SLB": {
		"countryName": "Solomon Islands",
		"alpha2": "SB",
		"alpha3": "SLB",
		"numeric3": "90"
	},
	"SOM": {
		"countryName": "Somalia",
		"postalCodeFormat": "SO.json",
		"alpha2": "SO",
		"alpha3": "SOM",
		"numeric3": "706"
	},
	"ZAF": {
		"countryName": "South Africa",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "ZA",
		"alpha3": "ZAF",
		"numeric3": "710"
	},
	"SGS": {
		"countryName": "South Georgia and the South Sandwich Islands",
		"postalCodeFormat": "GS.json",
		"alpha2": "GS",
		"alpha3": "SGS",
		"numeric3": "239"
	},
	"SSD": {
		"countryName": "South Sudan",
		"alpha2": "SS",
		"alpha3": "SSD",
		"numeric3": "728"
	},
	"ESP": {
		"countryName": "Spain",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "ES",
		"alpha3": "ESP",
		"numeric3": "724"
	},
	"LKA": {
		"countryName": "Sri Lanka",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "LK",
		"alpha3": "LKA",
		"numeric3": "144"
	},
	"SDN": {
		"countryName": "Sudan",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "SD",
		"alpha3": "SDN",
		"numeric3": "736"
	},
	"SUR": {
		"countryName": "Suriname *",
		"alpha2": "SR",
		"alpha3": "SUR",
		"numeric3": "740"
	},
	"SJM": {
		"countryName": "Svalbard and Jan Mayen Islands",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "SJ",
		"alpha3": "SJM",
		"numeric3": "744"
	},
	"SWZ": {
		"countryName": "Swaziland",
		"postalCodeFormat": "SZ.json",
		"alpha2": "SZ",
		"alpha3": "SWZ",
		"numeric3": "748"
	},
	"SWE": {
		"countryName": "Sweden",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "SE",
		"alpha3": "SWE",
		"numeric3": "752"
	},
	"CHE": {
		"countryName": "Switzerland",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "CH",
		"alpha3": "CHE",
		"numeric3": "756"
	},
	"SYR": {
		"countryName": "Syrian Arab Republic (Syria)",
		"alpha2": "SY",
		"alpha3": "SYR",
		"numeric3": "760"
	},
	"TWN": {
		"countryName": "Taiwan, Republic of China",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "TW",
		"alpha3": "TWN",
		"numeric3": "158"
	},
	"TJK": {
		"countryName": "Tajikistan",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "TJ",
		"alpha3": "TJK",
		"numeric3": "762"
	},
	"TZA": {
		"countryName": "Tanzania *, United Republic of",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "TZ",
		"alpha3": "TZA",
		"numeric3": "834"
	},
	"THA": {
		"countryName": "Thailand",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "TH",
		"alpha3": "THA",
		"numeric3": "764"
	},
	"TLS": {
		"countryName": "Timor-Leste",
		"alpha2": "TL",
		"alpha3": "TLS",
		"numeric3": "626"
	},
	"TGO": {
		"countryName": "Togo",
		"alpha2": "TG",
		"alpha3": "TGO",
		"numeric3": "768"
	},
	"TKL": {
		"countryName": "Tokelau",
		"alpha2": "TK",
		"alpha3": "TKL",
		"numeric3": "772"
	},
	"TON": {
		"countryName": "Tonga",
		"alpha2": "TO",
		"alpha3": "TON",
		"numeric3": "776"
	},
	"TTO": {
		"countryName": "Trinidad and Tobago",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "TT",
		"alpha3": "TTO",
		"numeric3": "780"
	},
	"TUN": {
		"countryName": "Tunisia",
		"postalCodeFormat": "4Digits.json",
		"alpha2": "TN",
		"alpha3": "TUN",
		"numeric3": "788"
	},
	"TUR": {
		"countryName": "Turkey",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "TR",
		"alpha3": "TUR",
		"numeric3": "792"
	},
	"TKM": {
		"countryName": "Turkmenistan",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "TM",
		"alpha3": "TKM",
		"numeric3": "795"
	},
	"TCA": {
		"countryName": "Turks and Caicos Islands",
		"postalCodeFormat": "TC.json",
		"alpha2": "TC",
		"alpha3": "TCA",
		"numeric3": "796"
	},
	"TUV": {
		"countryName": "Tuvalu",
		"alpha2": "TV",
		"alpha3": "TUV",
		"numeric3": "798"
	},
	"UGA": {
		"countryName": "Uganda",
		"alpha2": "UG",
		"alpha3": "UGA",
		"numeric3": "800"
	},
	"UKR": {
		"countryName": "Ukraine",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "UA",
		"alpha3": "UKR",
		"numeric3": "804"
	},
	"ARE": {
		"countryName": "United Arab Emirates",
		"alpha2": "AE",
		"alpha3": "ARE",
		"numeric3": "784"
	},
	"GBR": {
		"countryName": "United Kingdom",
		"postalCodeFormat": "GB.json",
		"alpha2": "GB",
		"alpha3": "GBR",
		"numeric3": "826"
	},
	"USA": {
		"countryName": "United States of America",
		"postalCodeFormat": "US.json",
		"alpha2": "US",
		"alpha3": "USA",
		"numeric3": "840"
	},
	"UMI": {
		"countryName": "United States Minor Outlying Islands",
		"alpha2": "UM",
		"alpha3": "UMI",
		"numeric3": "581"
	},
	"URY": {
		"countryName": "Uruguay",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "UY",
		"alpha3": "URY",
		"numeric3": "858"
	},
	"UZB": {
		"countryName": "Uzbekistan",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "UZ",
		"alpha3": "UZB",
		"numeric3": "860"
	},
	"VUT": {
		"countryName": "Vanuatu",
		"alpha2": "VU",
		"alpha3": "VUT",
		"numeric3": "548"
	},
	"VEN": {
		"countryName": "Venezuela (Bolivarian Republic of)",
		"postalCodeFormat": "VE.json",
		"alpha2": "VE",
		"alpha3": "VEN",
		"numeric3": "862"
	},
	"VNM": {
		"countryName": "Viet Nam",
		"postalCodeFormat": "6Digits.json",
		"alpha2": "VN",
		"alpha3": "VNM",
		"numeric3": "704"
	},
	"VIR": {
		"countryName": "Virgin Islands, US",
		"postalCodeFormat": "US.json",
		"alpha2": "VI",
		"alpha3": "VIR",
		"numeric3": "850"
	},
	"WLF": {
		"countryName": "Wallis and Futuna Islands",
		"postalCodeFormat": "WF.json",
		"alpha2": "WF",
		"alpha3": "WLF",
		"numeric3": "876"
	},
	"ESH": {
		"countryName": "Western Sahara",
		"alpha2": "EH",
		"alpha3": "ESH",
		"numeric3": "732"
	},
	"YEM": {
		"countryName": "Yemen",
		"alpha2": "YE",
		"alpha3": "YEM",
		"numeric3": "887"
	},
	"ZMB": {
		"countryName": "Zambia",
		"postalCodeFormat": "5Digits.json",
		"alpha2": "ZM",
		"alpha3": "ZMB",
		"numeric3": "894"
	},
	"ZWE": {
		"countryName": "Zimbabwe",
		"alpha2": "ZW",
		"alpha3": "ZWE",
		"numeric3": "716"
	}
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = false;

// Only Node.JS has a process variable that is of [[Class]] process
try {
 module.exports = Object.prototype.toString.call(global.process) === '[object process]'
} catch(e) {}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(64)))

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = function format(msg) {
  var args = arguments;
  for(var i = 1, l = args.length; i < l; i++) {
    msg = msg.replace(/%s/, args[i]);
  }
  return msg;
}


/***/ }),
/* 73 */
/***/ (function(module, exports) {

function addSpaces(v) {
  return v.split('\n').map(function(vv) { return '  ' + vv; }).join('\n');
}

function pad(str, value, filler) {
  str = String(str)
  var isRight = false;

  if(value < 0) {
    isRight = true;
    value = -value;
  }

  if(str.length < value) {
    var padding = new Array(value - str.length + 1).join(filler);
    return isRight ? str + padding : padding + str;
  } else{
    return str;
  }
}

module.exports = {
  addSpaces: addSpaces,
  pad: pad,
  pad0: function(str, value) {
    return pad(str, value, '0');
  }
};


/***/ }),
/* 74 */
/***/ (function(module, exports) {

var types = {
  NUMBER: 'number',
  UNDEFINED: 'undefined',
  STRING: 'string',
  BOOLEAN: 'boolean',
  OBJECT: 'object',
  FUNCTION: 'function',
  NULL: 'null',
  ARRAY: 'array',
  REGEXP: 'regexp',
  DATE: 'date',
  ERROR: 'error',
  ARGUMENTS: 'arguments',
  SYMBOL: 'symbol',
  ARRAY_BUFFER: 'array-buffer',
  TYPED_ARRAY: 'typed-array',
  DATA_VIEW: 'data-view',
  MAP: 'map',
  SET: 'set',
  WEAK_SET: 'weak-set',
  WEAK_MAP: 'weak-map',
  PROMISE: 'promise',

// node buffer
  BUFFER: 'buffer',

// dom html element
  HTML_ELEMENT: 'html-element',
  HTML_ELEMENT_TEXT: 'html-element-text',
  DOCUMENT: 'document',
  WINDOW: 'window',
  FILE: 'file',
  FILE_LIST: 'file-list',
  BLOB: 'blob',

  HOST: 'host',

  XHR: 'xhr'
};

module.exports = types;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// implement assert interface using already written peaces of should.js

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var Assertion = __webpack_require__(3);

var _deepEqual = __webpack_require__(1);

var pSlice = Array.prototype.slice;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.
/**
 * Node.js standard [`assert.fail`](http://nodejs.org/api/assert.html#assert_assert_fail_actual_expected_message_operator).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {*} actual Actual object
 * @param {*} expected Expected object
 * @param {string} message Message for assertion
 * @param {string} operator Operator text
 */
function fail(actual, expected, message, operator, stackStartFunction) {
  var a = new Assertion(actual);
  a.params = {
    operator: operator,
    expected: expected,
    message: message,
    stackStartFunction: stackStartFunction || fail
  };

  a.fail();
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.
/**
 * Node.js standard [`assert.ok`](http://nodejs.org/api/assert.html#assert_assert_value_message_assert_ok_value_message).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {*} value
 * @param {string} [message]
 */
function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

/**
 * Node.js standard [`assert.equal`](http://nodejs.org/api/assert.html#assert_assert_equal_actual_expected_message).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {*} actual
 * @param {*} expected
 * @param {string} [message]
 */
assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);
/**
 * Node.js standard [`assert.notEqual`](http://nodejs.org/api/assert.html#assert_assert_notequal_actual_expected_message).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {*} actual
 * @param {*} expected
 * @param {string} [message]
 */
assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);
/**
 * Node.js standard [`assert.deepEqual`](http://nodejs.org/api/assert.html#assert_assert_deepequal_actual_expected_message).
 * But uses should.js .eql implementation instead of Node.js own deepEqual.
 *
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {*} actual
 * @param {*} expected
 * @param {string} [message]
 */
assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected).result) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};


// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);
/**
 * Node.js standard [`assert.notDeepEqual`](http://nodejs.org/api/assert.html#assert_assert_notdeepequal_actual_expected_message).
 * But uses should.js .eql implementation instead of Node.js own deepEqual.
 *
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {*} actual
 * @param {*} expected
 * @param {string} [message]
 */
assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected).result) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);
/**
 * Node.js standard [`assert.strictEqual`](http://nodejs.org/api/assert.html#assert_assert_strictequal_actual_expected_message).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {*} actual
 * @param {*} expected
 * @param {string} [message]
 */
assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
/**
 * Node.js standard [`assert.notStrictEqual`](http://nodejs.org/api/assert.html#assert_assert_notstrictequal_actual_expected_message).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {*} actual
 * @param {*} expected
 * @param {string} [message]
 */
assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof expected == 'string') {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ')' : '.') +
  (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected && !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);
/**
 * Node.js standard [`assert.throws`](http://nodejs.org/api/assert.html#assert_assert_throws_block_error_message).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {Function} block
 * @param {Function} [error]
 * @param {String} [message]
 */
assert.throws = function(/*block, error, message*/) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
/**
 * Node.js standard [`assert.doesNotThrow`](http://nodejs.org/api/assert.html#assert_assert_doesnotthrow_block_message).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {Function} block
 * @param {String} [message]
 */
assert.doesNotThrow = function(/*block, message*/) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

/**
 * Node.js standard [`assert.ifError`](http://nodejs.org/api/assert.html#assert_assert_iferror_value).
 * @static
 * @memberOf should
 * @category assertion assert
 * @param {Error} err
 */
assert.ifError = function(err) {
  if (err) {
    throw err;
  }
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * should.js - assertion library
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */

var util = __webpack_require__(0);
var assert = __webpack_require__(75);
var AssertionError = __webpack_require__(60);

module.exports = function(should) {
  var i = should.format;

  /*
   * Expose assert to should
   *
   * This allows you to do things like below
   * without require()ing the assert module.
   *
   *    should.equal(foo.bar, undefined);
   *
   */
  util.merge(should, assert);

  /**
   * Assert _obj_ exists, with optional message.
   *
   * @static
   * @memberOf should
   * @category assertion assert
   * @alias should.exists
   * @param {*} obj
   * @param {String} [msg]
   * @example
   *
   * should.exist(1);
   * should.exist(new Date());
   */
  should.exist = should.exists = function(obj, msg) {
    if (null == obj) {
      throw new AssertionError({
        message: msg || ('expected ' + i(obj) + ' to exist'), stackStartFunction: should.exist
      });
    }
  };

  should.not = {};
  /**
   * Asserts _obj_ does not exist, with optional message.
   *
   * @name not.exist
   * @static
   * @memberOf should
   * @category assertion assert
   * @alias should.not.exists
   * @param {*} obj
   * @param {String} [msg]
   * @example
   *
   * should.not.exist(null);
   * should.not.exist(void 0);
   */
  should.not.exist = should.not.exists = function(obj, msg) {
    if (null != obj) {
      throw new AssertionError({
        message: msg || ('expected ' + i(obj) + ' to not exist'), stackStartFunction: should.not.exist
      });
    }
  };
};


/***/ }),
/* 77 */
/***/ (function(module, exports) {

/*
 * should.js - assertion library
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */

module.exports = function(should, Assertion) {
  /**
   * Assert given object is exactly `true`.
   *
   * @name true
   * @memberOf Assertion
   * @category assertion bool
   * @alias Assertion#True
   * @param {string} [message] Optional message
   * @example
   *
   * (true).should.be.true();
   * false.should.not.be.true();
   *
   * ({ a: 10}).should.not.be.true();
   */
  Assertion.add('true', function(message) {
    this.is.exactly(true, message);
  });

  Assertion.alias('true', 'True');

  /**
   * Assert given object is exactly `false`.
   *
   * @name false
   * @memberOf Assertion
   * @category assertion bool
   * @alias Assertion#False
   * @param {string} [message] Optional message
   * @example
   *
   * (true).should.not.be.false();
   * false.should.be.false();
   */
  Assertion.add('false', function(message) {
    this.is.exactly(false, message);
  });

  Assertion.alias('false', 'False');

  /**
   * Assert given object is thuthy according javascript type conversions.
   *
   * @name ok
   * @memberOf Assertion
   * @category assertion bool
   * @example
   *
   * (true).should.be.ok();
   * ''.should.not.be.ok();
   * should(null).not.be.ok();
   * should(void 0).not.be.ok();
   *
   * (10).should.be.ok();
   * (0).should.not.be.ok();
   */
  Assertion.add('ok', function() {
    this.params = { operator: 'to be truthy' };

    this.assert(this.obj);
  });
};


/***/ }),
/* 78 */
/***/ (function(module, exports) {

/*
 * should.js - assertion library
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */

module.exports = function(should, Assertion) {
  /**
   * Simple chaining. It actually do nothing.
   *
   * @memberOf Assertion
   * @name be
   * @property {should.Assertion} be
   * @alias Assertion#an
   * @alias Assertion#of
   * @alias Assertion#a
   * @alias Assertion#and
   * @alias Assertion#have
   * @alias Assertion#has
   * @alias Assertion#with
   * @alias Assertion#is
   * @alias Assertion#which
   * @alias Assertion#the
   * @alias Assertion#it
   * @category assertion chaining
   */
  ['an', 'of', 'a', 'and', 'be', 'has', 'have', 'with', 'is', 'which', 'the', 'it'].forEach(function(name) {
    Assertion.addChain(name);
  });
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * should.js - assertion library
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */

var util = __webpack_require__(0);
var eql = __webpack_require__(1);

module.exports = function(should, Assertion) {
  var i = should.format;

  /**
   * Assert that given object contain something that equal to `other`. It uses `should-equal` for equality checks.
   * If given object is array it search that one of elements was equal to `other`.
   * If given object is string it checks if `other` is a substring - expected that `other` is a string.
   * If given object is Object it checks that `other` is a subobject - expected that `other` is a object.
   *
   * @name containEql
   * @memberOf Assertion
   * @category assertion contain
   * @param {*} other Nested object
   * @example
   *
   * [1, 2, 3].should.containEql(1);
   * [{ a: 1 }, 'a', 10].should.containEql({ a: 1 });
   *
   * 'abc'.should.containEql('b');
   * 'ab1c'.should.containEql(1);
   *
   * ({ a: 10, c: { d: 10 }}).should.containEql({ a: 10 });
   * ({ a: 10, c: { d: 10 }}).should.containEql({ c: { d: 10 }});
   * ({ a: 10, c: { d: 10 }}).should.containEql({ b: 10 });
   * // throws AssertionError: expected { a: 10, c: { d: 10 } } to contain { b: 10 }
   * //            expected { a: 10, c: { d: 10 } } to have property b
   */
  Assertion.add('containEql', function(other) {
    this.params = {operator: 'to contain ' + i(other)};

    this.is.not.null().and.not.undefined();

    var obj = this.obj;

    if (typeof obj == 'string') {
      this.assert(obj.indexOf(String(other)) >= 0);
    } else if (util.isIndexable(obj)) {
      this.assert(util.some(obj, function(v) {
        return eql(v, other).result;
      }));
    } else {
      this.have.properties(other);
    }
  });

  /**
   * Assert that given object is contain equally structured object on the same depth level.
   * If given object is an array and `other` is an array it checks that the eql elements is going in the same sequence in given array (recursive)
   * If given object is an object it checks that the same keys contain deep equal values (recursive)
   * On other cases it try to check with `.eql`
   *
   * @name containDeepOrdered
   * @memberOf Assertion
   * @category assertion contain
   * @param {*} other Nested object
   * @example
   *
   * [ 1, 2, 3].should.containDeepOrdered([1, 2]);
   * [ 1, 2, [ 1, 2, 3 ]].should.containDeepOrdered([ 1, [ 2, 3 ]]);
   *
   * ({ a: 10, b: { c: 10, d: [1, 2, 3] }}).should.containDeepOrdered({a: 10});
   * ({ a: 10, b: { c: 10, d: [1, 2, 3] }}).should.containDeepOrdered({b: {c: 10}});
   * ({ a: 10, b: { c: 10, d: [1, 2, 3] }}).should.containDeepOrdered({b: {d: [1, 3]}});
   */
  Assertion.add('containDeepOrdered', function(other) {
    this.params = {operator: 'to contain ' + i(other)};

    var obj = this.obj;
    if (typeof obj == 'string') {// expect other to be string
      this.is.equal(String(other));
    } else if (util.isIndexable(obj) && util.isIndexable(other)) {
      for (var objIdx = 0, otherIdx = 0, objLength = util.length(obj), otherLength = util.length(other); objIdx < objLength && otherIdx < otherLength; objIdx++) {
        try {
          should(obj[objIdx]).containDeepOrdered(other[otherIdx]);
          otherIdx++;
        } catch (e) {
          if (e instanceof should.AssertionError) {
            continue;
          }
          throw e;
        }
      }

      this.assert(otherIdx === otherLength);
    } else if (obj != null && other != null && typeof obj == 'object' && typeof other == 'object') {// object contains object case
      util.forEach(other, function(value, key) {
        should(obj[key]).containDeepOrdered(value);
      });

      // if both objects is empty means we finish traversing - and we need to compare for hidden values
      if (util.isEmptyObject(other)) {
        this.eql(other);
      }
    } else {
      this.eql(other);
    }
  });

  /**
   * The same like `Assertion#containDeepOrdered` but all checks on arrays without order.
   *
   * @name containDeep
   * @memberOf Assertion
   * @category assertion contain
   * @param {*} other Nested object
   * @example
   *
   * [ 1, 2, 3].should.containDeep([2, 1]);
   * [ 1, 2, [ 1, 2, 3 ]].should.containDeep([ 1, [ 3, 1 ]]);
   */
  Assertion.add('containDeep', function(other) {
    this.params = {operator: 'to contain ' + i(other)};

    var obj = this.obj;
    if (typeof obj == 'string') {// expect other to be string
      this.is.equal(String(other));
    } else if (util.isIndexable(obj) && util.isIndexable(other)) {
      var usedKeys = {};
      util.forEach(other, function(otherItem) {
        this.assert(util.some(obj, function(item, index) {
          if (index in usedKeys) return false;

          try {
            should(item).containDeep(otherItem);
            usedKeys[index] = true;
            return true;
          } catch (e) {
            if (e instanceof should.AssertionError) {
              return false;
            }
            throw e;
          }
        }));
      }, this);
    } else if (obj != null && other != null && typeof obj == 'object' && typeof other == 'object') {// object contains object case
      util.forEach(other, function(value, key) {
        should(obj[key]).containDeep(value);
      });

      // if both objects is empty means we finish traversing - and we need to compare for hidden values
      if (util.isEmptyObject(other)) {
        this.eql(other);
      }
    } else {
      this.eql(other);
    }
  });

};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * should.js - assertion library
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */

var eql = __webpack_require__(1);
var type = __webpack_require__(2);
var util = __webpack_require__(0);

function formatEqlResult(r, a, b) {
  return ((r.path.length > 0 ? 'at ' + r.path.map(util.formatProp).join(' -> ') : '') +
  (r.a === a ? '' : ', A has ' + util.format(r.a)) +
  (r.b === b ? '' : ' and B has ' + util.format(r.b)) +
  (r.showReason ? ' because ' + r.reason : '')).trim();
}

module.exports = function(should, Assertion) {

  /**
   * Deep object equality comparison. For full spec see [`should-equal tests`](https://github.com/shouldjs/equal/blob/master/test.js).
   *
   * @name eql
   * @memberOf Assertion
   * @category assertion equality
   * @alias Assertion#deepEqual
   * @param {*} val Expected value
   * @param {string} [description] Optional message
   * @example
   *
   * (10).should.be.eql(10);
   * ('10').should.not.be.eql(10);
   * (-0).should.not.be.eql(+0);
   *
   * NaN.should.be.eql(NaN);
   *
   * ({ a: 10}).should.be.eql({ a: 10 });
   * [ 'a' ].should.not.be.eql({ '0': 'a' });
   */
  Assertion.add('eql', function(val, description) {
    this.params = {operator: 'to equal', expected: val, message: description};

    var result = eql(this.obj, val, should.config);
    this.params.details = result.result ? '' : formatEqlResult(result, this.obj, val);

    this.params.showDiff = eql(type(this.obj), type(val)).result;

    this.assert(result.result);
  });

  /**
   * Exact comparison using ===.
   *
   * @name equal
   * @memberOf Assertion
   * @category assertion equality
   * @alias Assertion#exactly
   * @param {*} val Expected value
   * @param {string} [description] Optional message
   * @example
   *
   * 10.should.be.equal(10);
   * 'a'.should.be.exactly('a');
   *
   * should(null).be.exactly(null);
   */
  Assertion.add('equal', function(val, description) {
    this.params = {operator: 'to be', expected: val, message: description};

    this.params.showDiff = eql(type(this.obj), type(val)).result;

    this.assert(val === this.obj);
  });

  Assertion.alias('equal', 'exactly');
  Assertion.alias('eql', 'deepEqual');

  function addOneOf(name, message, method) {
    Assertion.add(name, function(vals) {
      if (arguments.length !== 1) {
        vals = Array.prototype.slice.call(arguments);
      } else {
        should(vals).be.Array();
      }

      this.params = {operator: message, expected: vals};

      var obj = this.obj;
      var found = false;

      util.forEach(vals, function(val) {
        try {
          should(val)[method](obj);
          found = true;
          return false;
        } catch (e) {
          if (e instanceof should.AssertionError) {
            return;//do nothing
          }
          throw e;
        }
      });

      this.assert(found);
    });
  }

  /**
   * Exact comparison using === to be one of supplied objects.
   *
   * @name equalOneOf
   * @memberOf Assertion
   * @category assertion equality
   * @param {Array|*} vals Expected values
   * @example
   *
   * 'ab'.should.be.equalOneOf('a', 10, 'ab');
   * 'ab'.should.be.equalOneOf(['a', 10, 'ab']);
   */
  addOneOf('equalOneOf', 'to be equals one of', 'equal');

  /**
   * Exact comparison using .eql to be one of supplied objects.
   *
   * @name oneOf
   * @memberOf Assertion
   * @category assertion equality
   * @param {Array|*} vals Expected values
   * @example
   *
   * ({a: 10}).should.be.oneOf('a', 10, 'ab', {a: 10});
   * ({a: 10}).should.be.oneOf(['a', 10, 'ab', {a: 10}]);
   */
  addOneOf('oneOf', 'to be one of', 'eql');

};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * should.js - assertion library
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */
var util = __webpack_require__(0);

module.exports = function(should, Assertion) {
  var i = should.format;

  /**
   * Assert given function throws error with such message.
   *
   * @name throw
   * @memberOf Assertion
   * @category assertion errors
   * @alias Assertion#throwError
   * @param {string|RegExp|Function|Object|GeneratorFunction|GeneratorObject} [message] Message to match or properties
   * @param {Object} [properties] Optional properties that will be matched to thrown error
   * @example
   *
   * (function(){ throw new Error('fail') }).should.throw();
   * (function(){ throw new Error('fail') }).should.throw('fail');
   * (function(){ throw new Error('fail') }).should.throw(/fail/);
   *
   * (function(){ throw new Error('fail') }).should.throw(Error);
   * var error = new Error();
   * error.a = 10;
   * (function(){ throw error; }).should.throw(Error, { a: 10 });
   * (function(){ throw error; }).should.throw({ a: 10 });
   * (function*() {
   *   yield throwError();
   * }).should.throw();
   */
  Assertion.add('throw', function(message, properties) {
    var fn = this.obj;
    var err = {};
    var errorInfo = '';
    var thrown = false;

    if (util.isGeneratorFunction(fn)) {
      return should(fn()).throw(message, properties);
    } else if (util.isGeneratorObject(fn)) {
      return should(fn.next.bind(fn)).throw(message, properties);
    }

    this.is.a.Function();

    var errorMatched = true;

    try {
      fn();
    } catch (e) {
      thrown = true;
      err = e;
    }

    if (thrown) {
      if (message) {
        if ('string' == typeof message) {
          errorMatched = message == err.message;
        } else if (message instanceof RegExp) {
          errorMatched = message.test(err.message);
        } else if ('function' == typeof message) {
          errorMatched = err instanceof message;
        } else if (null != message) {
          try {
            should(err).match(message);
          } catch (e) {
            if (e instanceof should.AssertionError) {
              errorInfo = ": " + e.message;
              errorMatched = false;
            } else {
              throw e;
            }
          }
        }

        if (!errorMatched) {
          if ('string' == typeof message || message instanceof RegExp) {
            errorInfo = " with a message matching " + i(message) + ", but got '" + err.message + "'";
          } else if ('function' == typeof message) {
            errorInfo = " of type " + util.functionName(message) + ", but got " + util.functionName(err.constructor);
          }
        } else if ('function' == typeof message && properties) {
          try {
            should(err).match(properties);
          } catch (e) {
            if (e instanceof should.AssertionError) {
              errorInfo = ": " + e.message;
              errorMatched = false;
            } else {
              throw e;
            }
          }
        }
      } else {
        errorInfo = " (got " + i(err) + ")";
      }
    }

    this.params = { operator: 'to throw exception' + errorInfo };

    this.assert(thrown);
    this.assert(errorMatched);
  });

  Assertion.alias('throw', 'throwError');
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * should.js - assertion library
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */

var util = __webpack_require__(0);
var eql = __webpack_require__(1);

module.exports = function(should, Assertion) {
  var i = should.format;

  /**
   * Asserts if given object match `other` object, using some assumptions:
   * First object matched if they are equal,
   * If `other` is a regexp and given object is a string check on matching with regexp
   * If `other` is a regexp and given object is an array check if all elements matched regexp
   * If `other` is a regexp and given object is an object check values on matching regexp
   * If `other` is a function check if this function throws AssertionError on given object or return false - it will be assumed as not matched
   * If `other` is an object check if the same keys matched with above rules
   * All other cases failed.
   *
   * Usually it is right idea to add pre type assertions, like `.String()` or `.Object()` to be sure assertions will do what you are expecting.
   * Object iteration happen by keys (properties with enumerable: true), thus some objects can cause small pain. Typical example is js
   * Error - it by default has 2 properties `name` and `message`, but they both non-enumerable. In this case make sure you specify checking props (see examples).
   *
   * @name match
   * @memberOf Assertion
   * @category assertion matching
   * @param {*} other Object to match
   * @param {string} [description] Optional message
   * @example
   * 'foobar'.should.match(/^foo/);
   * 'foobar'.should.not.match(/^bar/);
   *
   * ({ a: 'foo', c: 'barfoo' }).should.match(/foo$/);
   *
   * ['a', 'b', 'c'].should.match(/[a-z]/);
   *
   * (5).should.not.match(function(n) {
   *   return n < 0;
   * });
   * (5).should.not.match(function(it) {
   *    it.should.be.an.Array();
   * });
   * ({ a: 10, b: 'abc', c: { d: 10 }, d: 0 }).should
   * .match({ a: 10, b: /c$/, c: function(it) {
   *    return it.should.have.property('d', 10);
   * }});
   *
   * [10, 'abc', { d: 10 }, 0].should
   * .match({ '0': 10, '1': /c$/, '2': function(it) {
   *    return it.should.have.property('d', 10);
   * }});
   *
   * var myString = 'abc';
   *
   * myString.should.be.a.String().and.match(/abc/);
   *
   * myString = {};
   *
   * myString.should.match(/abc/); //yes this will pass
   * //better to do
   * myString.should.be.an.Object().and.not.empty().and.match(/abc/);//fixed
   *
   * (new Error('boom')).should.match(/abc/);//passed because no keys
   * (new Error('boom')).should.not.match({ message: /abc/ });//check specified property
   */
  Assertion.add('match', function(other, description) {
    this.params = {operator: 'to match ' + i(other), message: description};

    if (!eql(this.obj, other).result) {
      if (other instanceof RegExp) { // something - regex

        if (typeof this.obj == 'string') {

          this.assert(other.exec(this.obj));
        } else if (util.isIndexable(this.obj)) {
          util.forEach(this.obj, function(item) {
            this.assert(other.exec(item));// should we try to convert to String and exec?
          }, this);
        } else if (null != this.obj && typeof this.obj == 'object') {

          var notMatchedProps = [], matchedProps = [];
          util.forEach(this.obj, function(value, name) {
            if (other.exec(value)) matchedProps.push(util.formatProp(name));
            else notMatchedProps.push(util.formatProp(name) + ' (' + i(value) + ')');
          }, this);

          if (notMatchedProps.length)
            this.params.operator += '\n    not matched properties: ' + notMatchedProps.join(', ');
          if (matchedProps.length)
            this.params.operator += '\n    matched properties: ' + matchedProps.join(', ');

          this.assert(notMatchedProps.length === 0);
        } // should we try to convert to String and exec?
      } else if (typeof other == 'function') {
        var res;

        res = other(this.obj);

        //if(res instanceof Assertion) {
        //  this.params.operator += '\n    ' + res.getMessage();
        //}

        //if we throw exception ok - it is used .should inside
        if (typeof res == 'boolean') {
          this.assert(res); // if it is just boolean function assert on it
        }
      } else if (other != null && this.obj != null && typeof other == 'object' && typeof this.obj == 'object') { // try to match properties (for Object and Array)
        notMatchedProps = [];
        matchedProps = [];

        util.forEach(other, function(value, key) {
          try {
            should(this.obj).have.property(key).which.match(value);
            matchedProps.push(util.formatProp(key));
          } catch (e) {
            if (e instanceof should.AssertionError) {
              notMatchedProps.push(util.formatProp(key) + ' (' + i(this.obj[key]) + ')');
            } else {
              throw e;
            }
          }
        }, this);

        if (notMatchedProps.length)
          this.params.operator += '\n    not matched properties: ' + notMatchedProps.join(', ');
        if (matchedProps.length)
          this.params.operator += '\n    matched properties: ' + matchedProps.join(', ');

        this.assert(notMatchedProps.length === 0);
      } else {
        this.assert(false);
      }
    }
  });

  /**
   * Asserts if given object values or array elements all match `other` object, using some assumptions:
   * First object matched if they are equal,
   * If `other` is a regexp - matching with regexp
   * If `other` is a function check if this function throws AssertionError on given object or return false - it will be assumed as not matched
   * All other cases check if this `other` equal to each element
   *
   * @name matchEach
   * @memberOf Assertion
   * @category assertion matching
   * @alias Assertion#matchEvery
   * @param {*} other Object to match
   * @param {string} [description] Optional message
   * @example
   * [ 'a', 'b', 'c'].should.matchEach(/\w+/);
   * [ 'a', 'a', 'a'].should.matchEach('a');
   *
   * [ 'a', 'a', 'a'].should.matchEach(function(value) { value.should.be.eql('a') });
   *
   * { a: 'a', b: 'a', c: 'a' }.should.matchEach(function(value) { value.should.be.eql('a') });
   */
  Assertion.add('matchEach', function(other, description) {
    this.params = {operator: 'to match each ' + i(other), message: description};

    util.forEach(this.obj, function(value) {
      should(value).match(other);
    }, this);
  });

  /**
  * Asserts if any of given object values or array elements match `other` object, using some assumptions:
  * First object matched if they are equal,
  * If `other` is a regexp - matching with regexp
  * If `other` is a function check if this function throws AssertionError on given object or return false - it will be assumed as not matched
  * All other cases check if this `other` equal to each element
  *
  * @name matchAny
  * @memberOf Assertion
  * @category assertion matching
  * @param {*} other Object to match
  * @alias Assertion#matchSome
  * @param {string} [description] Optional message
  * @example
  * [ 'a', 'b', 'c'].should.matchAny(/\w+/);
  * [ 'a', 'b', 'c'].should.matchAny('a');
  *
  * [ 'a', 'b', 'c'].should.matchAny(function(value) { value.should.be.eql('a') });
  *
  * { a: 'a', b: 'b', c: 'c' }.should.matchAny(function(value) { value.should.be.eql('a') });
  */
  Assertion.add('matchAny', function(other, description) {
    this.params = {operator: 'to match any ' + i(other), message: description};

    this.assert(util.some(this.obj, function(value) {
      try {
        should(value).match(other);
        return true;
      } catch (e) {
        if (e instanceof should.AssertionError) {
          // Caught an AssertionError, return false to the iterator
          return false;
        }
        throw e;
      }
    }));
  });

  Assertion.alias('matchAny', 'matchSome');
  Assertion.alias('matchEach', 'matchEvery');
};


/***/ }),
/* 83 */
/***/ (function(module, exports) {

/*
 * should.js - assertion library
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */

module.exports = function(should, Assertion) {

  /**
   * Assert given object is NaN
   * @name NaN
   * @memberOf Assertion
   * @category assertion numbers
   * @example
   *
   * (10).should.not.be.NaN();
   * NaN.should.be.NaN();
   */
  Assertion.add('NaN', function() {
    this.params = { operator: 'to be NaN' };

    this.assert(this.obj !== this.obj);
  });

  /**
   * Assert given object is not finite (positive or negative)
   *
   * @name Infinity
   * @memberOf Assertion
   * @category assertion numbers
   * @example
   *
   * (10).should.not.be.Infinity();
   * NaN.should.not.be.Infinity();
   */
  Assertion.add('Infinity', function() {
    this.params = { operator: 'to be Infinity' };

    this.is.a.Number()
      .and.not.a.NaN()
      .and.assert(!isFinite(this.obj));
  });

  /**
   * Assert given number between `start` and `finish` or equal one of them.
   *
   * @name within
   * @memberOf Assertion
   * @category assertion numbers
   * @param {number} start Start number
   * @param {number} finish Finish number
   * @param {string} [description] Optional message
   * @example
   *
   * (10).should.be.within(0, 20);
   */
  Assertion.add('within', function(start, finish, description) {
    this.params = { operator: 'to be within ' + start + '..' + finish, message: description };

    this.assert(this.obj >= start && this.obj <= finish);
  });

  /**
   * Assert given number near some other `value` within `delta`
   *
   * @name approximately
   * @memberOf Assertion
   * @category assertion numbers
   * @param {number} value Center number
   * @param {number} delta Radius
   * @param {string} [description] Optional message
   * @example
   *
   * (9.99).should.be.approximately(10, 0.1);
   */
  Assertion.add('approximately', function(value, delta, description) {
    this.params = { operator: 'to be approximately ' + value + ' ±' + delta, message: description };

    this.assert(Math.abs(this.obj - value) <= delta);
  });

  /**
   * Assert given number above `n`.
   *
   * @name above
   * @alias Assertion#greaterThan
   * @memberOf Assertion
   * @category assertion numbers
   * @param {number} n Margin number
   * @param {string} [description] Optional message
   * @example
   *
   * (10).should.be.above(0);
   */
  Assertion.add('above', function(n, description) {
    this.params = { operator: 'to be above ' + n, message: description };

    this.assert(this.obj > n);
  });

  /**
   * Assert given number below `n`.
   *
   * @name below
   * @alias Assertion#lessThan
   * @memberOf Assertion
   * @category assertion numbers
   * @param {number} n Margin number
   * @param {string} [description] Optional message
   * @example
   *
   * (0).should.be.below(10);
   */
  Assertion.add('below', function(n, description) {
    this.params = { operator: 'to be below ' + n, message: description };

    this.assert(this.obj < n);
  });

  Assertion.alias('above', 'greaterThan');
  Assertion.alias('below', 'lessThan');

  /**
   * Assert given number above `n`.
   *
   * @name aboveOrEqual
   * @alias Assertion#greaterThanOrEqual
   * @memberOf Assertion
   * @category assertion numbers
   * @param {number} n Margin number
   * @param {string} [description] Optional message
   * @example
   *
   * (10).should.be.aboveOrEqual(0);
   * (10).should.be.aboveOrEqual(10);
   */
  Assertion.add('aboveOrEqual', function(n, description) {
    this.params = { operator: 'to be above or equal' + n, message: description };

    this.assert(this.obj >= n);
  });

  /**
   * Assert given number below `n`.
   *
   * @name belowOrEqual
   * @alias Assertion#lessThanOrEqual
   * @memberOf Assertion
   * @category assertion numbers
   * @param {number} n Margin number
   * @param {string} [description] Optional message
   * @example
   *
   * (0).should.be.belowOrEqual(10);
   * (0).should.be.belowOrEqual(0);
   */
  Assertion.add('belowOrEqual', function(n, description) {
    this.params = { operator: 'to be below or equal' + n, message: description };

    this.assert(this.obj <= n);
  });

  Assertion.alias('aboveOrEqual', 'greaterThanOrEqual');
  Assertion.alias('belowOrEqual', 'lessThanOrEqual');

};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * should.js - assertion library
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */

var util = __webpack_require__(0);
var PromisedAssertion = __webpack_require__(3).PromisedAssertion;
var Assertion = __webpack_require__(3);

module.exports = function(should) {
  /**
   * Assert given object is a Promise
   *
   * @name Promise
   * @memberOf Assertion
   * @category assertion promises
   * @example
   *
   * promise.should.be.Promise()
   * (new Promise(function(resolve, reject) { resolve(10); })).should.be.a.Promise()
   * (10).should.not.be.a.Promise()
   */
  Assertion.add('Promise', function() {
    this.params = {operator: 'to be promise'};

    var obj = this.obj;

    should(obj).have.property('then')
      .which.is.a.Function();
  });

  /**
   * Assert given promise will be fulfilled. Result of assertion is still .thenable and should be handled accordingly.
   *
   * @name fulfilled
   * @memberOf Assertion
   * @returns {Promise}
   * @category assertion promises
   * @example
   *
   * // don't forget to handle async nature
   * (new Promise(function(resolve, reject) { resolve(10); })).should.be.fulfilled();
   *
   * // test example with mocha it is possible to return promise
   * it('is async', () => {
   *    return new Promise(resolve => resolve(10))
   *      .should.be.fulfilled();
   * });
   */
  Assertion.prototype.fulfilled = function Assertion$fulfilled() {
    this.params = {operator: 'to be fulfilled'};

    should(this.obj).be.a.Promise();

    var that = this;
    return this.obj.then(function next$onResolve(value) {
      if (that.negate) {
        that.fail();
      }
      return value;
    }, function next$onReject(err) {
      if (!that.negate) {
        that.params.operator += ', but it was rejected with ' + should.format(err);
        that.fail();
      }
      return err;
    });
  };

  /**
   * Assert given promise will be rejected. Result of assertion is still .thenable and should be handled accordingly.
   *
   * @name rejected
   * @memberOf Assertion
   * @category assertion promises
   * @returns {Promise}
   * @example
   *
   * // don't forget to handle async nature
   * (new Promise(function(resolve, reject) { resolve(10); }))
   *    .should.not.be.rejected();
   *
   * // test example with mocha it is possible to return promise
   * it('is async', () => {
   *    return new Promise((resolve, reject) => reject(new Error('boom')))
   *      .should.be.rejected();
   * });
   */
  Assertion.prototype.rejected = function() {
    this.params = {operator: 'to be rejected'};

    should(this.obj).be.a.Promise();

    var that = this;
    return this.obj.then(function(value) {
      if (!that.negate) {
        that.params.operator += ', but it was fulfilled';
        if (arguments.length != 0) {
          that.params.operator += ' with ' + should.format(value);
        }
        that.fail();
      }
      return value;
    }, function next$onError(err) {
      if (that.negate) {
        that.fail();
      }
      return err;
    });
  };

  /**
   * Assert given promise will be fulfilled with some expected value (value compared using .eql).
   * Result of assertion is still .thenable and should be handled accordingly.
   *
   * @name fulfilledWith
   * @memberOf Assertion
   * @category assertion promises
   * @returns {Promise}
   * @example
   *
   * // don't forget to handle async nature
   * (new Promise(function(resolve, reject) { resolve(10); }))
   *    .should.be.fulfilledWith(10);
   *
   * // test example with mocha it is possible to return promise
   * it('is async', () => {
   *    return new Promise((resolve, reject) => resolve(10))
   *       .should.be.fulfilledWith(10);
   * });
   */
  Assertion.prototype.fulfilledWith = function(expectedValue) {
    this.params = {operator: 'to be fulfilled with ' + should.format(expectedValue)};

    should(this.obj).be.a.Promise();

    var that = this;
    return this.obj.then(function(value) {
      if (that.negate) {
        that.fail();
      }
      should(value).eql(expectedValue);
      return value;
    }, function next$onError(err) {
      if (!that.negate) {
        that.params.operator += ', but it was rejected with ' + should.format(err);
        that.fail();
      }
      return err;
    });
  };

  /**
   * Assert given promise will be rejected with some sort of error. Arguments is the same for Assertion#throw.
   * Result of assertion is still .thenable and should be handled accordingly.
   *
   * @name rejectedWith
   * @memberOf Assertion
   * @category assertion promises
   * @returns {Promise}
   * @example
   *
   * function failedPromise() {
   *   return new Promise(function(resolve, reject) {
   *     reject(new Error('boom'))
   *   })
   * }
   * failedPromise().should.be.rejectedWith(Error);
   * failedPromise().should.be.rejectedWith('boom');
   * failedPromise().should.be.rejectedWith(/boom/);
   * failedPromise().should.be.rejectedWith(Error, { message: 'boom' });
   * failedPromise().should.be.rejectedWith({ message: 'boom' });
   *
   * // test example with mocha it is possible to return promise
   * it('is async', () => {
   *    return failedPromise().should.be.rejectedWith({ message: 'boom' });
   * });
   */
  Assertion.prototype.rejectedWith = function(message, properties) {
    this.params = {operator: 'to be rejected'};

    should(this.obj).be.a.Promise();

    var that = this;
    return this.obj.then(function(value) {
      if (!that.negate) {
        that.fail();
      }
      return value;
    }, function next$onError(err) {
      if (that.negate) {
        that.fail();
      }

      var errorMatched = true;
      var errorInfo = '';

      if ('string' === typeof message) {
        errorMatched = message === err.message;
      } else if (message instanceof RegExp) {
        errorMatched = message.test(err.message);
      } else if ('function' === typeof message) {
        errorMatched = err instanceof message;
      } else if (message !== null && typeof message === 'object') {
        try {
          should(err).match(message);
        } catch (e) {
          if (e instanceof should.AssertionError) {
            errorInfo = ': ' + e.message;
            errorMatched = false;
          } else {
            throw e;
          }
        }
      }

      if (!errorMatched) {
        if ( typeof message === 'string' || message instanceof RegExp) {
          errorInfo = ' with a message matching ' + should.format(message) + ", but got '" + err.message + "'";
        } else if ('function' === typeof message) {
          errorInfo = ' of type ' + util.functionName(message) + ', but got ' + util.functionName(err.constructor);
        }
      } else if ('function' === typeof message && properties) {
        try {
          should(err).match(properties);
        } catch (e) {
          if (e instanceof should.AssertionError) {
            errorInfo = ': ' + e.message;
            errorMatched = false;
          } else {
            throw e;
          }
        }
      }

      that.params.operator += errorInfo;

      that.assert(errorMatched);

      return err;
    });
  };

  /**
   * Assert given object is promise and wrap it in PromisedAssertion, which has all properties of Assertion.
   * That means you can chain as with usual Assertion.
   * Result of assertion is still .thenable and should be handled accordingly.
   *
   * @name finally
   * @memberOf Assertion
   * @alias Assertion#eventually
   * @category assertion promises
   * @returns {PromisedAssertion} Like Assertion, but .then this.obj in Assertion
   * @example
   *
   * (new Promise(function(resolve, reject) { resolve(10); }))
   *    .should.be.eventually.equal(10);
   *
   * // test example with mocha it is possible to return promise
   * it('is async', () => {
   *    return new Promise(resolve => resolve(10))
   *      .should.be.finally.equal(10);
   * });
   */
  Object.defineProperty(Assertion.prototype, 'finally', {
    get: function() {
      should(this.obj).be.a.Promise();

      var that = this;

      return new PromisedAssertion(this.obj.then(function(obj) {
        var a = should(obj);

        a.negate = that.negate;
        a.anyOne = that.anyOne;

        return a;
      }));
    }
  });

  Assertion.alias('finally', 'eventually');
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * should.js - assertion library
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */

var util = __webpack_require__(0);
var eql = __webpack_require__(1);

var aSlice = Array.prototype.slice;

module.exports = function(should, Assertion) {
  var i = should.format;
  /**
   * Asserts given object has some descriptor. **On success it change given object to be value of property**.
   *
   * @name propertyWithDescriptor
   * @memberOf Assertion
   * @category assertion property
   * @param {string} name Name of property
   * @param {Object} desc Descriptor like used in Object.defineProperty (not required to add all properties)
   * @example
   *
   * ({ a: 10 }).should.have.propertyWithDescriptor('a', { enumerable: true });
   */
  Assertion.add('propertyWithDescriptor', function(name, desc) {
    this.params = {actual: this.obj, operator: 'to have own property with descriptor ' + i(desc)};
    var obj = this.obj;
    this.have.ownProperty(name);
    should(Object.getOwnPropertyDescriptor(Object(obj), name)).have.properties(desc);
  });

  function processPropsArgs() {
    var args = {};
    if (arguments.length > 1) {
      args.names = aSlice.call(arguments);
    } else {
      var arg = arguments[0];
      if (typeof arg === 'string') {
        args.names = [arg];
      } else if (util.isIndexable(arg)) {
        args.names = arg;
      } else {
        args.names = Object.keys(arg);
        args.values = arg;
      }
    }
    return args;
  }


  /**
   * Asserts given object has enumerable property with optionally value. **On success it change given object to be value of property**.
   *
   * @name enumerable
   * @memberOf Assertion
   * @category assertion property
   * @param {string} name Name of property
   * @param {*} [val] Optional property value to check
   * @example
   *
   * ({ a: 10 }).should.have.enumerable('a');
   */
  Assertion.add('enumerable', function(name, val) {
    name = util.convertPropertyName(name);

    this.params = {
      operator: "to have enumerable property " + util.formatProp(name) + (arguments.length > 1 ? " equal to " + i(val): "")
    };

    var desc = { enumerable: true };
    if (arguments.length > 1) desc.value = val;
    this.have.propertyWithDescriptor(name, desc);
  });

  /**
   * Asserts given object has enumerable properties
   *
   * @name enumerables
   * @memberOf Assertion
   * @category assertion property
   * @param {Array|...string|Object} names Names of property
   * @example
   *
   * ({ a: 10, b: 10 }).should.have.enumerables('a');
   */
  Assertion.add('enumerables', function(/*names*/) {
    var args = processPropsArgs.apply(null, arguments);

    this.params = {
      operator: "to have enumerables " + args.names.map(util.formatProp)
    };

    var obj = this.obj;
    args.names.forEach(function(name) {
      should(obj).have.enumerable(name);
    });
  });

  /**
   * Asserts given object has property with optionally value. **On success it change given object to be value of property**.
   *
   * @name property
   * @memberOf Assertion
   * @category assertion property
   * @param {string} name Name of property
   * @param {*} [val] Optional property value to check
   * @example
   *
   * ({ a: 10 }).should.have.property('a');
   */
  Assertion.add('property', function(name, val) {
    name = util.convertPropertyName(name);
    if (arguments.length > 1) {
      var p = {};
      p[name] = val;
      this.have.properties(p);
    } else {
      this.have.properties(name);
    }
    this.obj = this.obj[name];
  });

  /**
   * Asserts given object has properties. On this method affect .any modifier, which allow to check not all properties.
   *
   * @name properties
   * @memberOf Assertion
   * @category assertion property
   * @param {Array|...string|Object} names Names of property
   * @example
   *
   * ({ a: 10 }).should.have.properties('a');
   * ({ a: 10, b: 20 }).should.have.properties([ 'a' ]);
   * ({ a: 10, b: 20 }).should.have.properties({ b: 20 });
   */
  Assertion.add('properties', function(names) {
    var values = {};
    if (arguments.length > 1) {
      names = aSlice.call(arguments);
    } else if (!Array.isArray(names)) {
      if (typeof names == 'string' || typeof names == 'symbol') {
        names = [names];
      } else {
        values = names;
        names = Object.keys(names);
      }
    }

    var obj = Object(this.obj), missingProperties = [];

    //just enumerate properties and check if they all present
    names.forEach(function(name) {
      if (!(name in obj)) missingProperties.push(util.formatProp(name));
    });

    var props = missingProperties;
    if (props.length === 0) {
      props = names.map(util.formatProp);
    } else if (this.anyOne) {
      props = names.filter(function(name) {
        return missingProperties.indexOf(util.formatProp(name)) < 0;
      }).map(util.formatProp);
    }

    var operator = (props.length === 1 ?
        'to have property ' : 'to have ' + (this.anyOne ? 'any of ' : '') + 'properties ') + props.join(', ');

    this.params = {obj: this.obj, operator: operator};

    //check that all properties presented
    //or if we request one of them that at least one them presented
    this.assert(missingProperties.length === 0 || (this.anyOne && missingProperties.length != names.length));

    // check if values in object matched expected
    var valueCheckNames = Object.keys(values);
    if (valueCheckNames.length) {
      var wrongValues = [];
      props = [];

      // now check values, as there we have all properties
      valueCheckNames.forEach(function(name) {
        var value = values[name];
        if (!eql(obj[name], value).result) {
          wrongValues.push(util.formatProp(name) + ' of ' + i(value) + ' (got ' + i(obj[name]) + ')');
        } else {
          props.push(util.formatProp(name) + ' of ' + i(value));
        }
      });

      if ((wrongValues.length !== 0 && !this.anyOne) || (this.anyOne && props.length === 0)) {
        props = wrongValues;
      }

      operator = (props.length === 1 ?
        'to have property ' : 'to have ' + (this.anyOne ? 'any of ' : '') + 'properties ') + props.join(', ');

      this.params = {obj: this.obj, operator: operator};

      //if there is no not matched values
      //or there is at least one matched
      this.assert(wrongValues.length === 0 || (this.anyOne && wrongValues.length != valueCheckNames.length));
    }
  });

  /**
   * Asserts given object has property `length` with given value `n`
   *
   * @name length
   * @alias Assertion#lengthOf
   * @memberOf Assertion
   * @category assertion property
   * @param {number} n Expected length
   * @param {string} [description] Optional message
   * @example
   *
   * [1, 2].should.have.length(2);
   */
  Assertion.add('length', function(n, description) {
    this.have.property('length', n, description);
  });

  Assertion.alias('length', 'lengthOf');

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  /**
   * Asserts given object has own property. **On success it change given object to be value of property**.
   *
   * @name ownProperty
   * @alias Assertion#hasOwnProperty
   * @memberOf Assertion
   * @category assertion property
   * @param {string} name Name of property
   * @param {string} [description] Optional message
   * @example
   *
   * ({ a: 10 }).should.have.ownProperty('a');
   */
  Assertion.add('ownProperty', function(name, description) {
    name = util.convertPropertyName(name);
    this.params = {
      actual: this.obj,
      operator: 'to have own property ' + util.formatProp(name),
      message: description
    };

    this.assert(hasOwnProperty.call(this.obj, name));

    this.obj = this.obj[name];
  });

  Assertion.alias('ownProperty', 'hasOwnProperty');

  /**
   * Asserts given object is empty. For strings, arrays and arguments it checks .length property, for objects it checks keys.
   *
   * @name empty
   * @memberOf Assertion
   * @category assertion property
   * @example
   *
   * ''.should.be.empty();
   * [].should.be.empty();
   * ({}).should.be.empty();
   */
  Assertion.add('empty', function() {
    this.params = {operator: 'to be empty'};

    if (util.length(this.obj) !== void 0) {
      should(this.obj).have.property('length', 0);
    } else {
      var obj = Object(this.obj); // wrap to reference for booleans and numbers
      for (var prop in obj) {
        should(this.obj).not.have.ownProperty(prop);
      }
    }
  }, true);

  /**
   * Asserts given object has exact keys. Compared to `properties`, `keys` does not accept Object as a argument.
   *
   * @name keys
   * @alias Assertion#key
   * @memberOf Assertion
   * @category assertion property
   * @param {Array|...string} [keys] Keys to check
   * @example
   *
   * ({ a: 10 }).should.have.keys('a');
   * ({ a: 10, b: 20 }).should.have.keys('a', 'b');
   * ({ a: 10, b: 20 }).should.have.keys([ 'a', 'b' ]);
   * ({}).should.have.keys();
   */
  Assertion.add('keys', function(keys) {
    if (arguments.length > 1) keys = aSlice.call(arguments);
    else if (arguments.length === 1 && typeof keys === 'string') keys = [keys];
    else if (arguments.length === 0) keys = [];

    keys = keys.map(String);

    var obj = Object(this.obj);

    // first check if some keys are missing
    var missingKeys = [];
    keys.forEach(function(key) {
      if (!hasOwnProperty.call(this.obj, key))
        missingKeys.push(util.formatProp(key));
    }, this);

    // second check for extra keys
    var extraKeys = [];
    Object.keys(obj).forEach(function(key) {
      if (keys.indexOf(key) < 0) {
        extraKeys.push(util.formatProp(key));
      }
    });

    var verb = keys.length === 0 ? 'to be empty' :
    'to have ' + (keys.length === 1 ? 'key ' : 'keys ');

    this.params = {operator: verb + keys.map(util.formatProp).join(', ')};

    if (missingKeys.length > 0)
      this.params.operator += '\n\tmissing keys: ' + missingKeys.join(', ');

    if (extraKeys.length > 0)
      this.params.operator += '\n\textra keys: ' + extraKeys.join(', ');

    this.assert(missingKeys.length === 0 && extraKeys.length === 0);
  });

  Assertion.alias("keys", "key");

  /**
   * Asserts given object has nested property in depth by path. **On success it change given object to be value of final property**.
   *
   * @name propertyByPath
   * @memberOf Assertion
   * @category assertion property
   * @param {Array|...string} properties Properties path to search
   * @example
   *
   * ({ a: {b: 10}}).should.have.propertyByPath('a', 'b').eql(10);
   */
  Assertion.add('propertyByPath', function(properties) {
    if (arguments.length > 1) properties = aSlice.call(arguments);
    else if (arguments.length === 1 && typeof properties == 'string') properties = [properties];
    else if (arguments.length === 0) properties = [];

    var allProps = properties.map(util.formatProp);

    properties = properties.map(String);

    var obj = should(Object(this.obj));

    var foundProperties = [];

    var currentProperty;
    while (properties.length) {
      currentProperty = properties.shift();
      this.params = {operator: 'to have property by path ' + allProps.join(', ') + ' - failed on ' + util.formatProp(currentProperty)};
      obj = obj.have.property(currentProperty);
      foundProperties.push(currentProperty);
    }

    this.params = {obj: this.obj, operator: 'to have property by path ' + allProps.join(', ')};

    this.obj = obj.obj;
  });
};


/***/ }),
/* 86 */
/***/ (function(module, exports) {

/*
 * should.js - assertion library
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */

module.exports = function(should, Assertion) {
  /**
   * Assert given string starts with prefix
   * @name startWith
   * @memberOf Assertion
   * @category assertion strings
   * @param {string} str Prefix
   * @param {string} [description] Optional message
   * @example
   *
   * 'abc'.should.startWith('a');
   */
  Assertion.add('startWith', function(str, description) {
    this.params = { operator: 'to start with ' + should.format(str), message: description };

    this.assert(0 === this.obj.indexOf(str));
  });

  /**
   * Assert given string ends with prefix
   * @name endWith
   * @memberOf Assertion
   * @category assertion strings
   * @param {string} str Prefix
   * @param {string} [description] Optional message
   * @example
   *
   * 'abca'.should.endWith('a');
   */
  Assertion.add('endWith', function(str, description) {
    this.params = { operator: 'to end with ' + should.format(str), message: description };

    this.assert(this.obj.indexOf(str, this.obj.length - str.length) >= 0);
  });
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * should.js - assertion library
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */

var util = __webpack_require__(0);

module.exports = function(should, Assertion) {
  /**
   * Assert given object is number
   * @name Number
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('Number', function() {
    this.params = {operator: 'to be a number'};

    this.have.type('number');
  });

  /**
   * Assert given object is arguments
   * @name arguments
   * @alias Assertion#Arguments
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('arguments', function() {
    this.params = {operator: 'to be arguments'};

    this.have.class('Arguments');
  });

  Assertion.alias('arguments', 'Arguments');

  /**
   * Assert given object has some type using `typeof`
   * @name type
   * @memberOf Assertion
   * @param {string} type Type name
   * @param {string} [description] Optional message
   * @category assertion types
   */
  Assertion.add('type', function(type, description) {
    this.params = {operator: 'to have type ' + type, message: description};

    should(typeof this.obj).be.exactly(type);
  });

  /**
   * Assert given object is instance of `constructor`
   * @name instanceof
   * @alias Assertion#instanceOf
   * @memberOf Assertion
   * @param {Function} constructor Constructor function
   * @param {string} [description] Optional message
   * @category assertion types
   */
  Assertion.add('instanceof', function(constructor, description) {
    this.params = {operator: 'to be an instance of ' + util.functionName(constructor), message: description};

    this.assert(Object(this.obj) instanceof constructor);
  });

  Assertion.alias('instanceof', 'instanceOf');

  /**
   * Assert given object is function
   * @name Function
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('Function', function() {
    this.params = {operator: 'to be a function'};

    this.have.type('function');
  });

  /**
   * Assert given object is object
   * @name Object
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('Object', function() {
    this.params = {operator: 'to be an object'};

    this.is.not.null().and.have.type('object');
  });

  /**
   * Assert given object is string
   * @name String
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('String', function() {
    this.params = {operator: 'to be a string'};

    this.have.type('string');
  });

  /**
   * Assert given object is array
   * @name Array
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('Array', function() {
    this.params = {operator: 'to be an array'};

    this.have.class('Array');
  });

  /**
   * Assert given object is boolean
   * @name Boolean
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('Boolean', function() {
    this.params = {operator: 'to be a boolean'};

    this.have.type('boolean');
  });

  /**
   * Assert given object is error
   * @name Error
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('Error', function() {
    this.params = {operator: 'to be an error'};

    this.have.instanceOf(Error);
  });

  /**
   * Assert given object is a date
   * @name Date
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('Date', function() {
    this.params = {operator: 'to be a date'};

    this.have.instanceOf(Date);
  });

  /**
   * Assert given object is null
   * @name null
   * @alias Assertion#Null
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('null', function() {
    this.params = {operator: 'to be null'};

    this.assert(this.obj === null);
  });

  Assertion.alias('null', 'Null');

  /**
   * Assert given object has some internal [[Class]], via Object.prototype.toString call
   * @name class
   * @alias Assertion#Class
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('class', function(cls) {
    this.params = {operator: 'to have [[Class]] ' + cls};

    this.assert(Object.prototype.toString.call(this.obj) === '[object ' + cls + ']');
  });

  Assertion.alias('class', 'Class');

  /**
   * Assert given object is undefined
   * @name undefined
   * @alias Assertion#Undefined
   * @memberOf Assertion
   * @category assertion types
   */
  Assertion.add('undefined', function() {
    this.params = {operator: 'to be undefined'};

    this.assert(this.obj === void 0);
  });

  Assertion.alias('undefined', 'Undefined');

  /**
   * Assert given object supports es6 iterable protocol (just check
   * that object has property Symbol.iterator, which is a function)
   * @name iterable
   * @memberOf Assertion
   * @category assertion es6
   */
  Assertion.add('iterable', function() {
    this.params = {operator: 'to be iterable'};

    should(this.obj).have.property(Symbol.iterator).which.is.a.Function();
  });

  /**
   * Assert given object supports es6 iterator protocol (just check
   * that object has property next, which is a function)
   * @name iterator
   * @memberOf Assertion
   * @category assertion es6
   */
  Assertion.add('iterator', function() {
    this.params = {operator: 'to be iterator'};

    should(this.obj).have.property('next').which.is.a.Function();
  });

  /**
   * Assert given object is a generator object
   * @name generator
   * @memberOf Assertion
   * @category assertion es6
   */
  Assertion.add('generator', function() {
    this.params = {operator: 'to be generator'};

    should(this.obj).be.iterable
      .and.iterator
      .and.it.is.equal(this.obj[Symbol.iterator]());
  });
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * should.js - assertion library
 * Copyright(c) 2010-2013 TJ Holowaychuk <tj@vision-media.ca>
 * Copyright(c) 2013-2016 Denis Bardadym <bardadymchik@gmail.com>
 * MIT Licensed
 */


var util = __webpack_require__(0);

/**
 * Our function should
 *
 * @param {*} obj Object to assert
 * @returns {should.Assertion} Returns new Assertion for beginning assertion chain
 * @example
 *
 * var should = require('should');
 * should('abc').be.a.String();
 */
function should(obj) {
  return (new should.Assertion(obj));
}

should.AssertionError = __webpack_require__(60);
should.Assertion = __webpack_require__(3);

should.format = util.format;
should.type = __webpack_require__(2);
should.util = util;

/**
 * Object with configuration.
 * It contains such properties:
 * * `checkProtoEql` boolean - Affect if `.eql` will check objects prototypes
 * * `plusZeroAndMinusZeroEqual` boolean - Affect if `.eql` will treat +0 and -0 as equal
 * Also it can contain options for should-format.
 *
 * @type {Object}
 * @memberOf should
 * @static
 * @example
 *
 * var a = { a: 10 }, b = Object.create(null);
 * b.a = 10;
 *
 * a.should.be.eql(b);
 * //not throws
 *
 * should.config.checkProtoEql = true;
 * a.should.be.eql(b);
 * //throws AssertionError: expected { a: 10 } to equal { a: 10 } (because A and B have different prototypes)
 */
should.config = __webpack_require__(63);

// Expose should to external world.
exports = module.exports = should;

/**
 * Allow to extend given prototype with should property using given name. This getter will **unwrap** all standard wrappers like `Number`, `Boolean`, `String`.
 * Using `should(obj)` is the equivalent of using `obj.should` with known issues (like nulls and method calls etc).
 *
 * To add new assertions, need to use Assertion.add method.
 *
 * @param {string} [propertyName] Name of property to add. Default is `'should'`.
 * @param {Object} [proto] Prototype to extend with. Default is `Object.prototype`.
 * @memberOf should
 * @returns {{ name: string, descriptor: Object, proto: Object }} Descriptor enough to return all back
 * @static
 * @example
 *
 * var prev = should.extend('must', Object.prototype);
 *
 * 'abc'.must.startWith('a');
 *
 * var should = should.noConflict(prev);
 * should.not.exist(Object.prototype.must);
 */
should.extend = function(propertyName, proto) {
  propertyName = propertyName || 'should';
  proto = proto || Object.prototype;

  var prevDescriptor = Object.getOwnPropertyDescriptor(proto, propertyName);

  Object.defineProperty(proto, propertyName, {
    set: function() {
    },
    get: function() {
      return should(util.isWrapperType(this) ? this.valueOf() : this);
    },
    configurable: true
  });

  return { name: propertyName, descriptor: prevDescriptor, proto: proto };
};

/**
 * Delete previous extension. If `desc` missing it will remove default extension.
 *
 * @param {{ name: string, descriptor: Object, proto: Object }} [desc] Returned from `should.extend` object
 * @memberOf should
 * @returns {Function} Returns should function
 * @static
 * @example
 *
 * var should = require('should').noConflict();
 *
 * should(Object.prototype).not.have.property('should');
 *
 * var prev = should.extend('must', Object.prototype);
 * 'abc'.must.startWith('a');
 * should.noConflict(prev);
 *
 * should(Object.prototype).not.have.property('must');
 */
should.noConflict = function(desc) {
  desc = desc || should._prevShould;

  if (desc) {
    delete desc.proto[desc.name];

    if (desc.descriptor) {
      Object.defineProperty(desc.proto, desc.name, desc.descriptor);
    }
  }
  return should;
};

/**
 * Simple utility function for a bit more easier should assertion extension
 * @param {Function} f So called plugin function. It should accept 2 arguments: `should` function and `Assertion` constructor
 * @memberOf should
 * @returns {Function} Returns `should` function
 * @static
 * @example
 *
 * should.use(function(should, Assertion) {
 *   Assertion.add('asset', function() {
 *      this.params = { operator: 'to be asset' };
 *
 *      this.obj.should.have.property('id').which.is.a.Number();
 *      this.obj.should.have.property('path');
 *  })
 * })
 */
should.use = function(f) {
  f(should, should.Assertion);
  return this;
};

should
  .use(__webpack_require__(76))
  .use(__webpack_require__(78))
  .use(__webpack_require__(77))
  .use(__webpack_require__(83))
  .use(__webpack_require__(80))
  .use(__webpack_require__(87))
  .use(__webpack_require__(86))
  .use(__webpack_require__(85))
  .use(__webpack_require__(81))
  .use(__webpack_require__(82))
  .use(__webpack_require__(79))
  .use(__webpack_require__(84));


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var should = __webpack_require__(66);
var postalCodes = __webpack_require__(67)

describe('Postal codes validation: ', function () {

    var countriesData = __webpack_require__(61);
    Object.keys(countriesData).map(function (alpha2Code) {

        var formatFileName = countriesData[alpha2Code].postalCodeFormat;
        if (!formatFileName) {
            console.log('Cannot find format file for ' + alpha2Code);
            return;
        }

        var format = __webpack_require__(65)("./" + formatFileName);
        format.TestData.Valid.map(function (validPostalCode) {
            it(alpha2Code + ' / ' + validPostalCode + ' is valid', function () {
                postalCodes.validate(alpha2Code, validPostalCode).should.eql(true);
            })
        });

        format.TestData.Invalid.map(function (invalidPostalCode) {
            it(alpha2Code + ' / ' + invalidPostalCode + ' is NOT valid', function () {
                postalCodes.validate(alpha2Code, invalidPostalCode).should.eql(false);
            })
        });
    });
});

describe('Postal codes border cases: ', function() {
    var testCases = [
        {
            countryCode: null,
            postalCode: 1234,
            description: 'should return error when country code is null',
            expectedResult: undefined,
            expectedError: 'Invalid country code.',
        },
        {
            countryCode: undefined,
            postalCode: 1234,
            description: 'should return error when country code is undefined',
            expectedResult: undefined,
            expectedError: 'Invalid country code.',
        },
        {
            countryCode: 'us',
            postalCode: null,
            description: 'should return error when postal code is null',
            expectedResult: undefined,
            expectedError: 'Invalid postal code.',
        },
        {
            countryCode: 'gb',
            postalCode: undefined,
            description: 'should return error when postal code is undefined',
            expectedResult: undefined,
            expectedError: 'Invalid postal code.',
        },
        {
            countryCode: 'chf',
            postalCode: 8001,
            description: 'should return false when country code is unknown',
            expectedResult: undefined,
            expectedError: 'Unknown alpha2/alpha3 country code: chf',
        },
        {
            countryCode: 'ch',
            postalCode: '80010',
            description: 'should return false when postal code is invalid',
            expectedResult: false,
            expectedError: null,
        },
        {
            countryCode: 'ch',
            postalCode: '8001',
            description: 'should return true when postal code is valid string',
            expectedResult: true,
            expectedError: null,
        },
        {
            countryCode: 'ch',
            postalCode: 8001,
            description: 'should return true when postal code is valid number',
            expectedResult: true,
            expectedError: null,
        },
        {
            countryCode: ' us ',
            postalCode: ' 98001 ',
            description: 'should trim white spaces in input',
            expectedResult: true,
            expectedError: null,
        }
    ];

    testCases.forEach(function(test) {
        it(`${test.description}`, function(done) {
            postalCodes.validate(test.countryCode, test.postalCode, function(error, result) {
                should(result).be.eql(test.expectedResult);
                should(error).be.eql(test.expectedError);
                done();
            });
        });
    });
});

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(91)
var ieee754 = __webpack_require__(92)
var isArray = __webpack_require__(93)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(64)))

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 92 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 93 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(95)))

/***/ }),
/* 95 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);
