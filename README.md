
<!--#echo json="package.json" key="name" underline="=" -->
must-lookup-prop-in-dict-pmb
============================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Look up the value of some config object&#39;s property in a dictionary object,
throw if not found. (Double lookup, double throw.)
<!--/#echo -->



API
---

This module exports one function:

### lookup(descr, cfg, dict, key, dflt)

First, look up the option value, i.e. `cfg[key]` if it exists,
otherwise `dflt` will be used as the option value.

* The idea is that the option value is something that makes sense to a
  human reader, e.g. `presentation`.
* The option value cannot be `undefined` (the false-y value).
  This should not be a problem, as it would be stringified for `dict`
  lookup anyway, so you can use the string `'undefined'`.
* If `cfg` is a function, the option value will instead be determined
  by `cfg(key, dflt)`. A result of `undefined` means failure.
  * This feature works nicely with the `.ifHas` from
    [objpop](https://github.com/mk-pmb/objpop-js).

Once the option value is determined, translate it by `dict` to an
actionable representation, and return that, e.g.
`{ HandleLidSwitch: 'ignore', IdleAction: 'ignore' }`.

If either lookup fails, throw an error.
The error message will use `String(descr || dict)` as the (hopefully)
human-readable context description.





Usage
-----

see [the tests](test/).


<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
