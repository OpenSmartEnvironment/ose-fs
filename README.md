# Open Smart Environment - Filesystem
This package contains definitions of [entry kinds](http://opensmartenvironment.github.io/doc/#entrykinds) that represent
files and directories and gives OSE access to the filesystem and
registers fs as a source to the [Media player](http://opensmartenvironment.github.io/doc/#mediaplayer).

See [Media player example](http://opensmartenvironment.github.io/doc/#mediaplayerexample).

It also defines a JSON file-based database backend for shards.

## Important links
This package is a part of the OSE suite. For more information, see the following links:
- [Filesystem documentation](http://opensmartenvironment.github.io/doc/#fs)
- [OSE suite documentation](http://opensmartenvironment.github.io/doc/)
- [All packages](https://github.com/opensmartenvironment/)
- [All issues](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+user%3AOpenSmartEnvironment+)

## About OSE
<b>Open Smart Environment software is a suite for creating
multi-instance applications that work as a single whole.</b><br>
Imagine, for example, a personal mesh running on various devices
including HTPCs, phones, tablets, workstations, servers, Raspberry
Pis, home automation gadgets, wearables, drones, etc.

OSE software consists of several npm packages: a [framework](http://opensmartenvironment.github.io/doc/#framework) running
on Node.js, an [HTML5 frontend](http://opensmartenvironment.github.io/doc/#html5frontend), extending
packages and a set of example applications.

<a href="http://opensmartenvironment.github.io/doc/resource/ose.svg"><img width=100% src="http://opensmartenvironment.github.io/doc/resource/ose.svg"></a>

**Set-up of current example applications.** Here,
OSE provides a [Media player](http://opensmartenvironment.github.io/doc/#example-player) running on an HTPC
that can be controlled by an IR remote through
[LIRC](http://opensmartenvironment.github.io/doc/#example-lirc) and is capable of playing streams from a
[DVB streamer](http://opensmartenvironment.github.io/doc/#example-dvb) and control devices through GPIO
pins on a [Raspberry Pi](http://opensmartenvironment.github.io/doc/#example-rpi)

For more information about OSE see **[the documentation](http://opensmartenvironment.github.io/doc/)**.

## Status
- Pre-alpha stage (insecure and buggy)
- Unstable API
- Patchy documentation
- Low test coverage (1 %)

This is not yet a piece of download-and-use software. It is important
to understand the basic principles covered by the
[documentation](http://opensmartenvironment.github.io/doc/).

However, this software has been successfully used continuously since the end
of 2013 in a house running 7 OSE instances spread over several
Raspberry Pis, notebooks and an HTPC.

## Platforms
OSE has the following prerequisites:
- Node.js (>0.12) running on Debian Jessie and Raspbian
- Recent version of Firefox or Chrome browser

## Licence
This software is released under the terms of the [GNU General
Public Licence v3.0](http://www.gnu.org/copyleft/gpl.html) or
later.
