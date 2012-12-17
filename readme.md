# Sidecar

A barebones Wordpress launchpad for dynamic javascript based themes. The goal is to simplify the process of creating a WordPress theme entirely in JavaScript.

## installation

### dev tools

Sidecar relies on some amazing open source projects that you will need to have installed. Luckily it's super easy

* install [npm](http://nodejs.org/) - visit link, download, install
* install [bbb](https://github.com/backbone-boilerplate/grunt-bbb) - `npm install -g bbb`

### theme

* download the theme(repository) and upload to your wordpress theme folder
  `git clone git@github.com:jbergen/sidecar.git`
  `git submodule update --init --recursive`
* move the `wp-json-api` folder WordPress' `plugins` folder
* activate the plugin and the theme in your admin dashboard

## development

### configuration

* depending on where your wordpress is installed, you may need to update `root` in `js/app/app.js`. For example, if WP is installed at `http://foo.com/bar/` then you'll need to set `root: "bar/"` in `app.js`. However, if your installation is at the root directory then `root: "/"` should suffice.
* you can choose how you deploy (debug, release, dev) in `header.php`

### build

Sidecar utilizes grunt to take care of the dirty work for you. So in addition to these few examples, you can define your own to suit your needs

there are also two different grunt files, one at the base template folder which only contains a task to compile the LESS stylesheets, and the grunt file in js which takes care of all other tasks (lint, concat, compress, etc)

* `bbb:less` - compile less stylesheets
* `bbb:debug` - compile js and templates into uncompressed files
* `bbb:release` - compile and compress js and templates

see the [bbb](https://github.com/backbone-boilerplate/grunt-bbb) and [grunt](https://github.com/gruntjs/grunt) docs for more tasks and information

## usage

You are free to use Sidecar in your project to your heart's content. If you make something out of it, I'd love to hear about it! Pull requests and issue reports welcome (though I have limited time to devote to this project).

## credits

### special thanks

* [backbone](http://documentcloud.github.com/backbone/)
* [bbb](https://github.com/backbone-boilerplate/grunt-bbb)
* [wp-json-api](https://github.com/dphiffer/wp-json-api)

### libraries and tools

* almond.js
* backbone
* backbone layout manager
* bbb
* grunt.js
* jquery
* less
* lodash
* require.js
* wp-json-api

## license

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.