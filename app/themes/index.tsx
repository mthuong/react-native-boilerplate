import baseStyled, { ThemedStyledInterface } from 'styled-components';

const primary = '#320C7A';

export const theme = {
  color: {
    background: '#1F0808',
    transparent: 'rgba(0,0,0,0)',
    primary,
    highlight: '#EF8802',
    tabIconDefault: '#9B8AB4',
    tabIconSelected: 'white',
    tabBar: primary,
    primaryTextColor: '#4A4A4A'
  },
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
