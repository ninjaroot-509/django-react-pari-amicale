import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle `
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
  }

  #w5137 {
    background: ${({theme}) => theme.extraColor};
  }

  h1 {
    font-family: "gt-walsheim", arial, helvetica, sans-serif;
    font-size: 36px;
    color: ${({theme}) => theme.hs};
    font-weight: 900;
  }

  h2 {
      font-family: "gt-walsheim", arial, helvetica, sans-serif;
      font-size: 30px;
      color: ${({theme}) => theme.hs};
      font-weight: 900;
      margin: 50px 0 30px;
  }

  h3 {
      font-family: "gt-walsheim", arial, helvetica, sans-serif;
      font-size: 20px;
      color: ${({theme}) => theme.hs};
  }

  .sn-element[data-sn-id="5146"] h1,
  .sn-element[data-sn-id="5146"] h2,
  .sn-element[data-sn-id="5146"] h3,
  .sn-element[data-sn-id="5146"] h4,
  .sn-element[data-sn-id="5146"] h5,
  .sn-element[data-sn-id="5146"] h6 {
      color: ${({theme}) => theme.hs};
  }

  .sn-element[data-sn-id="5146"] {
      color: ${({theme}) => theme.hs};
  }

  .sn-element[data-sn-id="16c97c39-486d-48b3-8613-9499b0c205fc"] {
    margin-left: 0px;
    margin-right: 0px;
    align-items: center;
    background-color: ${({theme}) => theme.boxgroup};
  }

  #sn_widget_4786 a.box {
    background-color: ${({theme}) => theme.boxgroup};
    padding: 10px 20px 10px 20px;
    border: 1px transparent solid;
    border-radius: 15px;
    text-decoration: none;
  }

  #sn_widget_4786 a.box:hover {
      background-color: #f6f6f6;
      border: 1px #e4e4e4 solid;
      text-decoration: none;
  }

  #w4778 .quiz_title {
    color: ${({theme}) => theme.hs};
    font-weight: 900;
    font-size: 21px;
    flex-grow: 1;
    margin: 0;
  }

  #w_4739 .container_intro,
  #w_4739 .container_question {
      // background: ${({theme}) => theme.boxgroup};
      border-radius: 15px;
      padding-top: 40px;
      color: ${({theme}) => theme.hs};
  }

  .card {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: ${({theme}) => theme.boxgroup};
    color: ${({theme}) => theme.hs};
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: .25rem
  }

  #w5137 .children-level-2 {
    width: 200px;
    margin: 0;
    padding: 15px 0;
    list-style: none;
    display: none;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 100%;
    background: ${({theme}) => theme.dropbottom};
    border-radius: 4px;
    -webkit-box-shadow: 0px 7px 17px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 7px 17px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 7px 17px 0px rgba(0, 0, 0, 0.1);
    animation: sub_menu_appear_5137 .3s cubic-bezier(.3, 0, .2, 1);
  }

  #w5137 .link-level-2 {
    display: block;
    padding: 7px 20px 7px 50px;
    font-size: 16px;
    font-weight: 600;
    color: ${({theme}) => theme.hs};
    text-decoration: none;
    position: relative;
    transition: all .3s cubic-bezier(.3, 0, .2, 1);
  }
  
  .main_menu_list{
    background-color: ${({theme}) => theme.extraColor};
  }

  #wdg_5160 a {
    font-size: 14px;
    color: ${({theme}) => theme.hs};
  }

  #w5137 .search_container .search_input:hover,
  #w5137 .menu_container:hover .mobile_link,
  #w5137 .mobile_link:focus {
    background-color: ${({theme}) => theme.humbutton};
  }

  #w5137 .link-level-2:hover {
    background: ${({theme}) => theme.humLis};
  }

  #w_4739 .final_score {
    font-size: 100px;
    line-height: 1;
    font-weight: 900;
    color: ${({theme}) => theme.hs};
  }

  #w_4739 .final_score_label {
      font-size: 30px;
      font-weight: 900;
      color: ${({theme}) => theme.hs};
  }

  #w_4739 .leaderboard {
      color: ${({theme}) => theme.hs};
      margin: 15px 0;
      font-size: 18px;
  }

  #w_4739 .col_more_quiz {
    background: ${({theme}) => theme.humLis};
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }

`