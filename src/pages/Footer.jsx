import React from 'react'
import FooterMain from '../components/FooterMain'
import Copyright from '../components/Copyright'

const Footer = ({ onFooterClick }) => {
    return (
        <footer>
            <FooterMain />
            <Copyright onFooterClick={onFooterClick} />
        </footer>
    )
}

export default Footer