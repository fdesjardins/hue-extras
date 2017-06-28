# hue-extras

[![Build Status][travis-image]][travis-url]
[![Coverage][coveralls-image]][coveralls-url]

Philips Hue Utilities

## Installation

```
npm install --save hue-extras
```

For global CLI utils:

```
npm install -g hue-extras
```

## Usage

Create a config.js with your hue credentials filled in.

### Commands

#### `fire`

Set lamp 5 on fire with trimethyl borate (green flames):

```
hue fire -l 5 -f trimethylBorate
```

#### `brightness`

Increase the brightness of all lamps:

```
hue brightness -d u -a
```

#### `redshift`

Decrease temperature (Kelvin) of all lamps:

```
hue redshift -d d -a
```

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[travis-url]: https://travis-ci.org/fdesjardins/hue-extras
[travis-image]: https://img.shields.io/travis/fdesjardins/hue-extras.svg?style=flat
[coveralls-url]: https://coveralls.io/r/fdesjardins/hue-extras
[coveralls-image]: https://img.shields.io/coveralls/fdesjardins/hue-extras.svg?style=flat
