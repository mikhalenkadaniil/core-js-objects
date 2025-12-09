/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns shallow copy of an object.
 *
 * @param {Object} obj - an object to copy
 * @return {Object}
 *
 * @example
 *    shallowCopy({a: 2, b: 5}) => {a: 2, b: 5}
 *    shallowCopy({a: 2, b: { a: [1, 2, 3]}}) => {a: 2, b: { a: [1, 2, 3]}}
 *    shallowCopy({}) => {}
 */
function shallowCopy(obj) {
  const target = {};
  return Object.assign(target, obj);
}

/**
 * Merges array of objects into a single object. If there are overlapping keys, the values
 * should be summed.
 *
 * @param {Object[]} objects - The array of objects to merge
 * @return {Object} - The merged object
 *
 * @example
 *    mergeObjects([{a: 1, b: 2}, {b: 3, c: 5}]) => {a: 1, b: 5, c: 5}
 *    mergeObjects([]) => {}
 */
function mergeObjects(objects) {
  const result = {};
  objects.forEach((object) => {
    Object.entries(object).forEach((element) => {
      const [key, value] = element;
      if (result[key] === undefined) {
        result[key] = value;
      } else {
        result[key] += value;
      }
    });
  });
  return result;
}

/**
 * Removes a properties from an object.
 *
 * @param {Object} obj - The object from which to remove the property
 * @param {string[]} keys - The keys of the properties to remove
 * @return {Object} - The object with the specified key removed
 *
 * @example
 *    removeProperties({a: 1, b: 2, c: 3}, ['b', 'c']) => {a: 1}
 *    removeProperties({a: 1, b: 2, c: 3}, ['d', 'e']) => {a: 1, b: 2, c: 3}
 *    removeProperties({name: 'John', age: 30, city: 'New York'}, ['age']) => {name: 'John', city: 'New York'}
 *
 */
function removeProperties(obj, keys) {
  const result = obj;
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}

/**
 * Compares two source objects. Returns true if the objects are equal and false otherwise.
 * There are no nested objects.
 *
 * @param {Object} obj1 - The first object to compare
 * @param {Object} obj2 - The second object to compare
 * @return {boolean} - True if the objects are equal, false otherwise
 *
 * @example
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 2}) => true
 *    compareObjects({a: 1, b: 2}, {a: 1, b: 3}) => false
 */
function compareObjects(obj1, obj2) {
  const entries1 = Object.entries(obj1);
  const entries2 = Object.entries(obj2);
  if (entries1.length !== entries2.length) return false;
  for (let i = 0; i < entries1.length; i += 1) {
    if (entries1[i][0] !== entries2[i][0] || entries1[i][1] !== entries2[i][1])
      return false;
  }
  return true;
}

/**
 * Checks if the source object is empty.
 * Returns true if the object contains no enumerable own properties, false otherwise.
 *
 * @param {Object} obj - The object to check
 * @return {boolean} - True if the object is empty, false otherwise
 *
 * @example
 *    isEmptyObject({}) => true
 *    isEmptyObject({a: 1}) => false
 */
function isEmptyObject(obj) {
  if (Object.keys(obj).length === 0) return true;
  return false;
}

/**
 * Makes the source object immutable by preventing any changes to its properties.
 *
 * @param {Object} obj - The source object to make immutable
 * @return {Object} - The immutable version of the object
 *
 * @example
 *    const obj = {a: 1, b: 2};
 *    const immutableObj = makeImmutable(obj);
 *    immutableObj.a = 5;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    delete immutableObj.a;
 *    console.log(immutableObj) => {a: 1, b: 2}
 *    immutableObj.newProp = 'new';
 *    console.log(immutableObj) => {a: 1, b: 2}
 */
function makeImmutable(obj) {
  return Object.freeze(obj);
}

/**
 * Returns a word from letters whose positions are provided as an object.
 *
 * @param {Object} lettersObject - An object where keys are letters and values are arrays of positions
 * @return {string} - The constructed word
 *
 * @example
 *    makeWord({ a: [0, 1], b: [2, 3], c: [4, 5] }) => 'aabbcc'
 *    makeWord({ H:[0], e: [1], l: [2, 3, 8], o: [4, 6], W:[5], r:[7], d:[9]}) => 'HelloWorld'
 */
function makeWord(lettersObject) {
  const result = [];
  Object.entries(lettersObject).forEach((element) => {
    const [char, positions] = element;
    positions.forEach((position) => {
      result[position] = char;
    });
  });
  return result.join('');
}

/**
 * There is a queue for tickets to a popular movie.
 * The ticket seller sells one ticket at a time strictly in order and give the change.
 * The ticket costs 25. Customers pay with bills of 25, 50, or 100.
 * Initially the seller has no money for change.
 * Return true if the seller can sell tickets, false otherwise
 *
 * @param {number[]} queue - The array representing the bills each customer pays with
 * @return {boolean} - True if the seller can sell tickets to everyone, false otherwise
 *
 * @example
 *    sellTickets([25, 25, 50]) => true
 *    sellTickets([25, 100]) => false (The seller does not have enough money to give change.)
 */
function sellTickets(queue) {
  const cashbox = {
    25: 0,
    50: 0,
  };
  for (let i = 0; i < queue.length; i += 1) {
    const key = queue[i];
    if (key === 25) {
      cashbox['25'] += 1;
    }
    if (key === 50) {
      if (cashbox['25'] > 0) {
        cashbox['25'] -= 1;
        cashbox['50'] += 1;
      } else {
        return false;
      }
    }
    if (key === 100) {
      if (cashbox['50'] > 0 && cashbox['25'] > 0) {
        cashbox['50'] -= 1;
        cashbox['25'] -= 1;
      } else if (cashbox['25'] > 2) {
        cashbox['25'] -= 3;
      } else {
        return false;
      }
    }
  }
  return true;
}

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.getArea = () => {
    return this.width * this.height;
  };
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {Object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { height: 10, width: 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {Object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  return Object.assign(Object.create(proto), obj);
}

/**
 * Sorts the specified array by country name first and city name
 * (if countries are equal) in ascending order.
 *
 * @typedef {{
 * country: string,
 * city: string
 * }} GeoEntity
 *
 * @param {GeoEntity[]} arr
 * @return {GeoEntity[]}
 *
 * @example
 *    [
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Saint Petersburg' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Belarus', city: 'Brest' }
 *    ]
 *                      =>
 *    [
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland',  city: 'Krakow' },
 *      { country: 'Poland',  city: 'Warsaw' },
 *      { country: 'Russia',  city: 'Moscow' },
 *      { country: 'Russia',  city: 'Saint Petersburg' }
 *    ]
 */
function sortCitiesArray(arr) {
  return arr.sort((a, b) => {
    const countryCompare = a.country.localeCompare(b.country);
    if (countryCompare !== 0) return countryCompare;
    return a.city.localeCompare(b.city);
  });
}

/**
 * Groups elements of the specified array by key.
 * Returns multimap of keys extracted from array elements via keySelector callback
 * and values extracted via valueSelector callback.
 * See: https://en.wikipedia.org/wiki/Multimap
 *
 * @typedef {{
 * country: string,
 * city: string
 * }} GeoEntity
 *
 * @param {GeoEntity[]} array
 * @param {(item: GeoEntity) => string} keySelector
 * @param {(item: GeoEntity) => string} valueSelector
 * @return {Map<string, string[]>}
 *
 * @example
 *   group([
 *      { country: 'Belarus', city: 'Brest' },
 *      { country: 'Russia', city: 'Omsk' },
 *      { country: 'Russia', city: 'Samara' },
 *      { country: 'Belarus', city: 'Grodno' },
 *      { country: 'Belarus', city: 'Minsk' },
 *      { country: 'Poland', city: 'Lodz' }
 *     ],
 *     item => item.country,
 *     item => item.city
 *   )
 *            =>
 *   Map {
 *    "Belarus" => ["Brest", "Grodno", "Minsk"],
 *    "Russia" => ["Omsk", "Samara"],
 *    "Poland" => ["Lodz"]
 *   }
 */
function group(array, keySelector, valueSelector) {
  const map = new Map();
  array.forEach((element) => {
    const mapKey = keySelector(element);
    const mapAdditionalValue = valueSelector(element);
    if (map.has(mapKey)) {
      const currentValues = map.get(mapKey);
      currentValues.push(mapAdditionalValue);
      map.set(mapKey, currentValues);
    } else {
      map.set(mapKey, [mapAdditionalValue]);
    }
  });
  return map;
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class Selector {
  constructor() {
    this.elementName = null;
    this.idName = null;
    this.classes = [];
    this.attributes = [];
    this.pseudoClasses = [];
    this.pseudoElementName = null;

    this.order = [];
  }

  checkOrder(part) {
    const orderMap = {
      element: 1,
      id: 2,
      class: 3,
      attr: 4,
      pseudoClass: 5,
      pseudoElement: 6,
    };

    const last = this.order[this.order.length - 1];
    if (last && orderMap[last] > orderMap[part]) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }

    this.order.push(part);
  }

  static ensureSingle(value) {
    if (value !== null) {
      throw new Error(
        'Element, id and pseudo-element should not occur more than one time inside the selector'
      );
    }
  }

  element(value) {
    Selector.ensureSingle(this.elementName);
    this.checkOrder('element');
    const copy = this.clone();
    copy.elementName = value;
    return copy;
  }

  id(value) {
    Selector.ensureSingle(this.idName);
    this.checkOrder('id');
    const copy = this.clone();
    copy.idName = value;
    return copy;
  }

  class(value) {
    this.checkOrder('class');
    const copy = this.clone();
    copy.classes.push(value);
    return copy;
  }

  attr(value) {
    this.checkOrder('attr');
    const copy = this.clone();
    copy.attributes.push(value);
    return copy;
  }

  pseudoClass(value) {
    this.checkOrder('pseudoClass');
    const copy = this.clone();
    copy.pseudoClasses.push(value);
    return copy;
  }

  pseudoElement(value) {
    Selector.ensureSingle(this.pseudoElementName);
    this.checkOrder('pseudoElement');
    const copy = this.clone();
    copy.pseudoElementName = value;
    return copy;
  }

  clone() {
    const copy = new Selector();
    copy.elementName = this.elementName;
    copy.idName = this.idName;
    copy.classes = [...this.classes];
    copy.attributes = [...this.attributes];
    copy.pseudoClasses = [...this.pseudoClasses];
    copy.pseudoElementName = this.pseudoElementName;
    copy.order = [...this.order];
    return copy;
  }

  stringify() {
    function mapClass(c) {
      return `.${c}`;
    }
    function mapAttr(a) {
      return `[${a}]`;
    }
    function mapPseudoClass(pc) {
      return `:${pc}`;
    }
    return (
      (this.elementName || '') +
      (this.idName ? `#${this.idName}` : '') +
      this.classes.map(mapClass).join('') +
      this.attributes.map(mapAttr).join('') +
      this.pseudoClasses.map(mapPseudoClass).join('') +
      (this.pseudoElementName ? `::${this.pseudoElementName}` : '')
    );
  }
}

function CombinedSelector(selector1, combinator, selector2) {
  this.selector1 = selector1;
  this.selector2 = selector2;
  this.combinator = combinator;
}

function combinedStringify() {
  return `${this.selector1.stringify()} ${
    this.combinator
  } ${this.selector2.stringify()}`;
}

CombinedSelector.prototype.stringify = combinedStringify;

const cssSelectorBuilder = {
  element(value) {
    return new Selector().element(value);
  },

  id(value) {
    return new Selector().id(value);
  },

  class(value) {
    return new Selector().class(value);
  },

  attr(value) {
    return new Selector().attr(value);
  },

  pseudoClass(value) {
    return new Selector().pseudoClass(value);
  },

  pseudoElement(value) {
    return new Selector().pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    return new CombinedSelector(selector1, combinator, selector2);
  },
};

module.exports = {
  shallowCopy,
  mergeObjects,
  removeProperties,
  compareObjects,
  isEmptyObject,
  makeImmutable,
  makeWord,
  sellTickets,
  Rectangle,
  getJSON,
  fromJSON,
  group,
  sortCitiesArray,
  cssSelectorBuilder,
};
