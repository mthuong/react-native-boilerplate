import React from "react";
import { Text } from "react-native";
import { ApplicationFont } from "../constants";
import { styled } from "../themes";

const DisplayText = styled(Text)<any>`
font-family: ${props => props.highlighted ? ApplicationFont.semiBold : ApplicationFont.regular};
font-size: 16px;
color:  ${props => props.highlighted ? props.theme.color.primary : `#4A4A4A`};
`;

interface HighlightedTextProps {
  highlightedText: string
  fullText: string
}

interface TextFragment {
  isHighlighted: boolean
  text: string
}

const HighlightedText: React.SFC<HighlightedTextProps> = (props) => {

  const generateTextFragments = (): TextFragment[] => {
    const highlightedText = props.highlightedText,
      parts = props.fullText.split(highlightedText),
      len = parts.length;

    // insert highlighted text in correct position
    for (let i = 0; i < len; i++) {
      if (i % 2 !== 0) {
        parts.splice(i, 0, highlightedText);
      }
    }
    
    return parts.map((text) => {
      const isHighlighted = text === highlightedText;
      return { isHighlighted: isHighlighted, text: text };
    });
  }

  return (
    <Text>
      {
        generateTextFragments().map((fragment, i) => (
          <DisplayText key={`${fragment.text}_${i}`} highlighted={fragment.isHighlighted}>
            {fragment.text}
          </DisplayText>
        ))
      }
    </Text>
  )
}

export default HighlightedText;