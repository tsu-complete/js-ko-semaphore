
js-ko-semaphore [![Build Status](https://travis-ci.org/tsu-complete/js-ko-semaphore.svg?branch=master)](https://travis-ci.org/tsu-complete/js-ko-semaphore) [![Dependency Status](https://david-dm.org/tsu-complete/js-ko-semaphore.svg)](https://david-dm.org/tsu-complete/js-ko-semaphore) [![Documentation Coverage](http://inch-ci.org/github/tsu-complete/js-ko-semaphore.svg?branch=master)](http://inch-ci.org/github/tsu-complete/js-ko-semaphore?branch=master)
===

> Exclusive observables for knockout

License
---

[![WTFPL](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-1.png)](http://www.wtfpl.net)

Usage
---

Objects will automatically be inserted into knockout but may be removed with noConflict

```js
mutex = ko.mutex.noConflict();

semaphore = ko.semaphore.noConflict();
```

#### Mutex

```js
mutex = ko.mutex();

if (mutex.try_lock()) {
    // Successfully taken...

    // Aliased to take...

    mutex.unlock();
    // Aliased to release...
}

mutex.subscribe(function ( taken ) {
    // State changed to taken...
});
```

#### Semaphore

```js
semaphore = ko.semaphore(3);

if (semaphore.p()) {
    // Successfully entered...

    // Aliased to down...

    semaphore.v();
    // Aliased to up...
}

semaphore.subscribe(function ( count ) {
    // Up count changed...
});
```

Linting
---

Linted with jshint

```js
$ npm run lint
```

Testing
---

Tested with mocha

```bash
$ npm test
```

Documentation
---

Documented with jsdoc

```bash
$ npm run docs
```

