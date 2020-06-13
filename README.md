
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

### lookup(dict, descr, cfg, key, dflt)

First, look up the option value, i.e. `cfg[key]` if it exists,
otherwise `dflt` will be used as the option value.
The idea is that the option value is something that makes sense to a
human reader, e.g. `Presentation`.
Then use `dict` to translate the option value to an
actionable representation, and return that, e.g.

```javascript
{ HandlePowerKey: 'ignore',
  HandleSuspendKey: 'ignore',
  HandleHibernateKey: 'ignore',
  HandleLidSwitch: 'ignore',
  IdleAction: 'ignore',
  IdleActionSec: 'never',
}
```

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
