const fs = require('fs');
const path = require('path');

const assetPath = path.resolve(__dirname, './src/assets/styles/icons');
const dist = path.resolve(__dirname, './src/common/components/Icons/Icons.tsx');
const storyDist = path.resolve(
  __dirname,
  './src/common/components/Icons/Icons.stories.tsx'
);

const images = fs
  .readdirSync(assetPath)
  .filter((file) => new RegExp(`.\/|.svg`).test(file));

const ext = /\.\w+/gi;
const snake = /\_(.)/gi;

const rename = (name) => {
  return name
    .replace(ext, '')
    .replace(snake, (i) => i[1].toUpperCase())
    .split('')
    .map((char, idx) => (!idx ? char.toUpperCase() : char))
    .join('');
};

const result = images.reduce(
  (acc, name) => {
    const parseName = rename(name);

    acc['iconType'] += `| '${parseName}' `;
    acc['objectItem'] += `${parseName},`;
    acc[
      'importString'
    ] += `\nimport ${parseName} from 'src/assets/styles/icons/${name}';`;

    return acc;
  },
  {
    importString: `import React from 'react';\nimport { useTheme } from 'styled-components';`,
    iconType: `export type IconName = `,
    objectItem: '',
  }
);

const storyResult = images.reduce(
  (acc, name) => {
    const parseName = rename(name);
    acc['template'] += `export const ${parseName} = Template.bind({});

  ${parseName}.args = {
    name: '${parseName}'
  }
  `;

    return acc;
  },
  {
    template: '',
  }
);

const storyCode =
  `import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Icons } from './Icons';

export default {
  title: 'Atom/Icons/Icon',
  component: Icons,
} as ComponentMeta<typeof Icons>;

const Template: ComponentStory<typeof Icons> = (args) => <Icons {...args} />;

export const Default = Template.bind({});

Default.args = {
  name: 'ArrowCircleRight',
}

Default.storyName = '0. Default'
` + storyResult.template;

const code = `
  ${result.importString}
  ${result.iconType}

  type Props = {
    name: IconName;
  };

  const IconObject: Record<IconName, any> = {
    ${result.objectItem}
  }

  export const Icons: React.FC<Props & { [key: string]: any }> = ({
    name,
    ...rest
  }) => {
    const theme = useTheme();
  
    const fillColor = (theme && theme.color) || theme.color.v2.glyphs.main;
    const Svg = IconObject[name];
  
    return <Svg fill={fillColor} {...rest} />;
  };
  
  export default Icons;
`;

fs.writeFileSync(dist, code);
fs.writeFileSync(storyDist, storyCode);
