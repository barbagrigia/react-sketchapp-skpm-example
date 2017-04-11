# react-sketchapp-skpm-example

This is an example [`react-sketchapp`](http://github.com/jongold/react-sketchapp) plugin being built with [`skpm`](https://github.com/sketch-pm/skpm).

It renders a grid of `Swatch` components, and to make it interesting it dynamically computes a text color for each swatch.

![image](https://cloud.githubusercontent.com/assets/591643/23916975/1a30fbb8-08ab-11e7-8870-dd7720150d04.png)


## Running
Install the dependencies
```
npm install
```

Run with live reloading in Sketch
```
npm run render
```

To install as a Sketch plugin:
```
npm run build
npm run link-plugin
```
Open Sketch, and the plugin will be in `Plugins -> react-sketchapp-skpm-example`
