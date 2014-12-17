# Open Smart Environment Filesystem package

This package contains definitions of [entry kinds] that represent
files and directories and gives OSE access to the filesystem and
registers DVB as a source to the [OSE Media player].

## Status
- Pre-alpha stage (insecure and buggy)
- Unstable API
- Gaps in the documentation
- No test suite

This is not yet a piece of download-and-use software. Its important
to understand the basic principles covered by this documentation.

Use of this software is currently recommended only for users that
wish participate in the development process (see Contributions).

TODO: Make contribution a link

## Getting started
To get started with OSE, refer to the [ose-bundle] package and
[Media player example application].

## Modules
Open Smart Environment Filesystem package consists of the following modules:
- Dir kind
- File kind
- OSE Filesystem core
- OSE Filesystem content

### Dir kind
[Entry kind] describing directories.

Module [Dir kind] reference ... 

### File kind
[Entry kind] describing files.

Module [File kind] reference ... 

### OSE Filesystem core
Core singleton of ose-fs npm package. Registers [entry kinds]
defined by this package to the `"fs"` [scope].

Module [OSE Filesystem core] reference ... 

### OSE Filesystem content
Provides files of OSE Filesystem package to the browser.

Module [OSE Filesystem content] reference ... 

## Contributions
To get started contributing or coding, it is good to read about the
two main npm packages [ose] and [ose-bb].

This software is in the pre-alpha stage. At the moment, it is
premature to file bugs. Input is, however, much welcome in the form
of ideas, comments and general suggestions.  Feel free to contact
us via
[github.com/opensmartenvironment](https://github.com/opensmartenvironment).

## License
This software is licensed under the terms of the [GNU GPL version
3](../LICENCE) or later
