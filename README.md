# Open Smart Environment - Filesystem
This package is a part of the OSE suite.
All packages can be found [on GitHub](https://github.com/opensmartenvironment/).

<b>Open Smart Environment software is a suite for creating
multi-instance applications that work as a single whole.</b><br>
Imagine, for example, a personal mesh running on various devices
including HTPCs, phones, tablets, workstations, servers, Raspberry
Pis, home automation gadgets, wearables, drones, etc.

OSE software consists of several npm packages: a [framework](http://opensmartenvironment.github.io/doc/#framework running
on Node.js, an [HTML5 frontend](http://opensmartenvironment.github.io/doc/#html5frontend, extending
packages and a set of example applications.

<figure>
  <a href="http://opensmartenvironment.github.io/doc/resource/ose.svg"><img width=100% src="http://opensmartenvironment.github.io/doc/resource/ose.svg"></a>

  <figcaption><b>Set-up of current example applications.</b> Here,
  OSE provides a [Media player](http://opensmartenvironment.github.io/doc/#example-player) running on an HTPC
  that can be controlled by an IR remote through
  [LIRC](http://opensmartenvironment.github.io/doc/#example-lirc) and is capable of playing streams from a
  [DVB streamer](http://opensmartenvironment.github.io/doc/#example-dvb) and control devices through GPIO
  pins on a [Raspberry Pi](http://opensmartenvironment.github.io/doc/#example-rpi) </figcaption> </figure>

For more information about OSE see **the [documentation](http://opensmartenvironment.github.io/doc/)**.

## Status
- Pre-alpha stage (insecure and buggy)
- Unstable API
- Patchy documentation
- No test suite

This is not yet a piece of download-and-use software. It is important
to understand the basic principles covered by the
[documentation](http://opensmartenvironment.github.io/doc/).

## Platforms
OSE has the following prerequisites:
- Node.js (>0.10) running on Debian Jessie and Raspbian
- Firefox 37 or newer with Web Components enabled

## Package description
This package contains definitions of [entry kinds](http://opensmartenvironment.github.io/doc/#entrykinds that represent
files and directories and gives OSE access to the filesystem and
registers fs as a source to the [Media player](http://opensmartenvironment.github.io/doc/#mediaplayer.

See [Media player example](http://opensmartenvironment.github.io/doc/#mediaplayerexample.

It also defines a JSON file-based database backend for shards.

The documentation for "ose-fs" package can be found **[here](http://opensmartenvironment.github.io/doc/#ose-fs#)**.

## Licence
This software is released under the terms of the [GNU General
Public Licence v3.0](http://www.gnu.org/copyleft/gpl.html) or
later.
