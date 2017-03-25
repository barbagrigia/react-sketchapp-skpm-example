/* @flow */
import React from 'react';
import { render, Text, View } from 'react-sketchapp';
import chroma from 'chroma-js';
import fetch from 'sketch-module-fetch-polyfill';

// take a hex and give us a nice text color to put over it
const textColor = (hex) => {
  const vsWhite = chroma.contrast(hex, 'white');
  if (vsWhite > 4) { return '#FFF'; }
  return chroma(hex).darken(3).hex();
};

const Swatch = ({ name, hex }) => (
  <View
    name={`Swatch ${name}`}
    style={{
      height: 96,
      width: 96,
      marginRight: 8,
      marginBottom: 8,
      backgroundColor: hex,
      padding: 8,
    }}
  >
    <Text
      name="Swatch Name"
      style={{ color: textColor(hex), fontWeight: 'bold' }}
    >
      {name}
    </Text>
    <Text
      name="Swatch Hex"
      style={{ color: textColor(hex) }}
    >
      {hex}
    </Text>
  </View>
);

const Color = {
  hex: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
};

Swatch.propTypes = Color;

const Document = ({ colors }) =>
  <View
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: (96 + 8) * 4,
    }}
  >
    { Object.keys(colors).map(color =>
      <Swatch
        name={color}
        hex={colors[color]}
        key={color}
      />,
    )}
  </View>;

Document.propTypes = {
  colors: React.PropTypes.objectOf(React.PropTypes.string.isRequired).isRequired,
};

export default function (context) {
  if (0) {
    const colorList = {
      Haus: '#F3F4F4',
      Night: '#333',
      Sur: '#96DBE4',
      'Sur Dark': '#24828F',
      Peach: '#EFADA0',
      'Peach Dark': '#E37059',
      Pear: '#93DAAB',
      'Pear Dark': '#2E854B',
    };
    render(<Document colors={colorList} />, context);
  } else {
    const doc = context.document;
    doc.showMessage("Loading JSON from github...");
    const URL = "https://gist.githubusercontent.com/darknoon/b096646539f535ad205f6f845c6f0803/raw/efe8741c3c9fcde021ca05cf1c879ca99533ffe3/colors.json";
    const colorList = fetch(URL)
      .then( r => r.json() )
      .then( colorList => {
        render(<Document colors={colorList} />, context);
        doc.hideMessage()
      })
      .catch( err => { doc.showMessage("" + err); log("ERROR:" + err);   coscript.setShouldKeepAround(false)} );
  }

}
