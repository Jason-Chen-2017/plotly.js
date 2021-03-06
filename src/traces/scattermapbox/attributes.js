/**
* Copyright 2012-2019, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var scatterGeoAttrs = require('../scattergeo/attributes');
var scatterAttrs = require('../scatter/attributes');
var mapboxAttrs = require('../../plots/mapbox/layout_attributes');
var plotAttrs = require('../../plots/attributes');
var colorbarAttrs = require('../../components/colorbar/attributes');

var extendFlat = require('../../lib/extend').extendFlat;
var overrideAll = require('../../plot_api/edit_types').overrideAll;

var lineAttrs = scatterGeoAttrs.line;
var markerAttrs = scatterGeoAttrs.marker;

module.exports = overrideAll({
    lon: scatterGeoAttrs.lon,
    lat: scatterGeoAttrs.lat,

    // locations
    // locationmode

    mode: extendFlat({}, scatterAttrs.mode, {
        dflt: 'markers',
        description: [
            'Determines the drawing mode for this scatter trace.',
            'If the provided `mode` includes *text* then the `text` elements',
            'appear at the coordinates. Otherwise, the `text` elements',
            'appear on hover.'
        ].join(' ')
    }),

    text: extendFlat({}, scatterAttrs.text, {
        description: [
            'Sets text elements associated with each (lon,lat) pair',
            'If a single string, the same string appears over',
            'all the data points.',
            'If an array of string, the items are mapped in order to the',
            'this trace\'s (lon,lat) coordinates.',
            'If trace `hoverinfo` contains a *text* flag and *hovertext* is not set,',
            'these elements will be seen in the hover labels.'
        ].join(' ')
    }),
    hovertext: extendFlat({}, scatterAttrs.hovertext, {
        description: [
            'Sets hover text elements associated with each (lon,lat) pair',
            'If a single string, the same string appears over',
            'all the data points.',
            'If an array of string, the items are mapped in order to the',
            'this trace\'s (lon,lat) coordinates.',
            'To be seen, trace `hoverinfo` must contain a *text* flag.'
        ].join(' ')
    }),

    line: {
        color: lineAttrs.color,
        width: lineAttrs.width

        // TODO
        // dash: dash
    },

    connectgaps: scatterAttrs.connectgaps,

    marker: {
        symbol: {
            valType: 'string',
            dflt: 'circle',
            role: 'style',
            arrayOk: true,
            description: [
                'Sets the marker symbol.',
                'Full list: https://www.mapbox.com/maki-icons/',
                'Note that the array `marker.color` and `marker.size`',
                'are only available for *circle* symbols.'
            ].join(' ')
        },
        opacity: markerAttrs.opacity,
        size: markerAttrs.size,
        sizeref: markerAttrs.sizeref,
        sizemin: markerAttrs.sizemin,
        sizemode: markerAttrs.sizemode,
        color: markerAttrs.color,
        colorscale: markerAttrs.colorscale,
        cauto: markerAttrs.cauto,
        cmax: markerAttrs.cmax,
        cmin: markerAttrs.cmin,
        autocolorscale: markerAttrs.autocolorscale,
        reversescale: markerAttrs.reversescale,
        showscale: markerAttrs.showscale,
        colorbar: colorbarAttrs,

        // line
    },

    fill: scatterGeoAttrs.fill,
    fillcolor: scatterAttrs.fillcolor,

    textfont: mapboxAttrs.layers.symbol.textfont,
    textposition: mapboxAttrs.layers.symbol.textposition,

    selected: {
        marker: scatterAttrs.selected.marker
    },
    unselected: {
        marker: scatterAttrs.unselected.marker
    },

    hoverinfo: extendFlat({}, plotAttrs.hoverinfo, {
        flags: ['lon', 'lat', 'text', 'name']
    })
}, 'calc', 'nested');
