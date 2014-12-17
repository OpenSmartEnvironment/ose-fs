# Open Smart Environment Filesystem package

This package contains definitions of [entry kinds](http://opensmartenvironment.github.io/doc/classes/ose.lib.kind.html) that represent
files and directories and gives OSE access to the filesystem and
registers DVB as a source to the [OSE Media player](http://opensmartenvironment.github.io/doc/modules/media.html).

## Status
- Pre-alpha stage (insecure and buggy)
- Unstable API
- Gaps in the documentation
- No test suite

This is not yet a piece of download-and-use software. Its important
to understand the basic principles covered by this documentation.

Use of this software is currently recommended only for users that
wish participate in the development process (see Contributions).

TODO: Make "Contributions" a link

## Getting started
To get started with OSE, refer to the [ose-bundle](http://opensmartenvironment.github.io/doc/modules/bundle.html) package and
[Media player example application](http://opensmartenvironment.github.io/doc/modules/bundle.media.html). You can read the entire OSE
documentation [here]( http://opensmartenvironment.github.io/doc).

## Modules
Open Smart Environment Filesystem package consists of the following modules:
- Dir kind
- File kind
- OSE Filesystem core
- OSE Filesystem content

### Dir kind
[Entry kind](http://opensmartenvironment.github.io/doc/classes/ose.lib.kind.html) describing directories.

Module [Dir kind](http://opensmartenvironment.github.io/doc/classes/fs.lib.dir.html) reference ... 

### File kind
[Entry kind](http://opensmartenvironment.github.io/doc/classes/ose.lib.kind.html) describing files.

Module [File kind](http://opensmartenvironment.github.io/doc/classes/fs.lib.file.html) reference ... 

### OSE Filesystem core
Core singleton of ose-fs npm package. Registers [entry kinds](http://opensmartenvironment.github.io/doc/classes/ose.lib.kind.html)
defined by this package to the `"fs"` [scope](http://opensmartenvironment.github.io/doc/classes/ose.lib.scope.html).

Module [OSE Filesystem core](http://opensmartenvironment.github.io/doc/classes/fs.lib.html) reference ... 

### OSE Filesystem content
Provides files of OSE Filesystem package to the browser.

Module [OSE Filesystem content](http://opensmartenvironment.github.io/doc/classes/fs.content.html) reference ... 

## Contributions
To get started contributing or coding, it is good to read about the
two main npm packages [ose](http://opensmartenvironment.github.io/doc/modules/ose.html) and [ose-bb](http://opensmartenvironment.github.io/doc/modules/bb.html).

This software is in the pre-alpha stage. At the moment, it is
premature to file bugs. Input is, however, much welcome in the form
of ideas, comments and general suggestions.  Feel free to contact
us via
[github.com/opensmartenvironment](https://github.com/opensmartenvironment).

## Licence
This software is licensed under the terms of the [GNU GPL version
3](../LICENCE) or later
