import React from 'react'

const Icons = ({ IconName, iconTitle }) => {
    return (
        <a href="./" style={{
            display: "block",
            textAlign: "center",
            textDecoration: "none",
            color: "#333"
        }}>
            {<IconName size={35} />}
            <div style={{ fontSize: "13px", marginBottom: "15px" }}>{iconTitle}</div>
        </a>
    )
}

export default Icons