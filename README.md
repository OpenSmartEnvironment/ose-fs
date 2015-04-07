# Open Smart Environment - Filesystem
This package is a part of the OSE suite.
All packages can be found [on GitHub](https://github.com/opensmartenvironment/).

The main advantage of OSE is the easy creation of applications
consisting of multiple instances that work as a single whole. The
objective is to develop an all-encompassing personal mesh running
on various devices including HTPCs, phones, tablets, workstations,
servers, Raspberry Pis, home automation gadgets, wearables, drones
etc.

<a href="http://opensmartenvironment.github.io/doc/resource/ose.svg"><img width=100% src="http://opensmartenvironment.github.io/doc/resource/ose.svg"></a>

For more information about OSE see **the [documentation](http://opensmartenvironment.github.io/doc/)**.

## Status
- Pre-alpha stage (insecure and buggy)
- Unstable API
- Gaps in the documentation
- No test suite

This is not yet a piece of download-and-use software. It is important
to understand the basic principles covered by the
[documentation](http://opensmartenvironment.github.io/doc/).

Use of this software is currently recommended only to users that
wish to participate in the development process, see
[contributions](http://opensmartenvironment.github.io/doc/#contrib).

## Platforms
OSE is being developed in JavaScript on the following platforms.
- Node.js (>0.10) running on Debian Jessie and Raspbian
- Firefox 37 or newer with Web Components enabled

It, however, probably also works with other Linux distributions.

## Package description
This package contains definitions of [entry kinds] that represent
files and directories and gives OSE access to the filesystem and
registers fs as a source to the [Media player].

See [Media player example].

It also defines a JSON file-based database backend for shards.

The documentation for "ose-fs" package can be found **[here](http://opensmartenvironment.github.io/doc/#ose-fs#)**.

## Licence
This software is released under the terms of the [GNU General
Public License v3.0](http://www.gnu.org/copyleft/gpl.html) or
later.
