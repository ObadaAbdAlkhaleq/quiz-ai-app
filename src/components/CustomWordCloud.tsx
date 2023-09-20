'use client';
import { useTheme } from 'next-themes';
import D3WordCloud from 'react-d3-cloud';

const data = [
  { text: 'Hey', value: 1000 },
  { text: 'YO', value: 10000 },
  { text: 'lol', value: 200 },
  { text: 'first impression', value: 800 },
  { text: 'very cool', value: 1000 },
  { text: 'duck', value: 1000 },
  { text: 'wsg', value: 1050 },
];

const fontSizeMapper = (word: { value: number; }) => {
  return Math.log2(word.value) * 5 + 16;
};

const CustomWordCloud = () => {
  const theme = useTheme();
  return (
    <D3WordCloud
      height={ 650 }
      font='Times'
      fontSize={ fontSizeMapper }
      rotate={ 0 }
      data={ data }
      padding={ 10 }
      fill={ theme.theme == 'dark' ? 'white' : 'black' }
    />
  );
};

export default CustomWordCloud;