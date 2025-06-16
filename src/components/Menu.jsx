import React from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'

const HoverImageLink = styled(Link)`
   display: inline-block;
   position:relative;
   width: 62px;
   height:62px;
   background-image: url(${props => props.$img});
   background-size:cover;
   background-position:center;
   transition: transform 0.3s ease;
   text-decoration:none;
   &:hover {
      transform: translateY(-10px);
   }
  &::after{
     content: "${props => props.$title}";
     position: absolute;
     top: 100%;
     left: 50%;
     transform: translateX(-50%);
     text-align:center;
     padding-top:10px;
     font-size:14px;
     color:#333;
     white-space:nowrap;
  }
`;


const Menu = ({ link, title, img }) => {
    return (
        <HoverImageLink to={link} $title={title} $img={img} />
    )
}

export default Menu