import React from 'react'
import { func, string } from 'prop-types';
import styled from 'styled-components';
// Import a couple of SVG files we'll use in the design: https://www.material-ui.com
import { Brightness4 as MoonIcon, Brightness7 as SunIcon } from '@material-ui/icons';

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.gradient};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 7rem;
  height: 3rem;

  svg {
    color: white;
    height: auto;
    width: 2rem;
    // transition: all 0.3s linear;
    
    // sun icon
    &:first-child {
      transform: ${({ lightTheme }) => lightTheme ? 'translateY(-100px)' : 'translateY(0px)'};
    }
    
    // moon icon
    &:nth-child(2) {
      transform: ${({ lightTheme }) => lightTheme ? 'translateY(-100px)' : 'translateY(0px)'};
    }
  }
`;

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <>
    <ToggleContainer onClick={toggleTheme}>
      {theme === 'light'? 
        <SunIcon />:
      <SunIcon style={{visibility: 'hidden'}}/>}
      {theme === 'dark'? 
        <MoonIcon />:
      <MoonIcon style={{visibility: 'hidden'}}/>}
    </ToggleContainer>
    </>
  );
};

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
}

export default Toggle;