import React from 'react'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    List,
    ListItemButton,
    ListItemText,
    Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AreaBar = ({ areaCodes, selectedInbox, setAreaCode, setSelectedInbox }) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>지역선택</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List component="nav">
                    {
                        areaCodes.map((code, index) => (
                            <ListItemButton
                                key={index}
                                selected={selectedInbox === index}
                                onClick={(event) => {
                                    setAreaCode(code.code);
                                    setSelectedInbox(index);

                                }}
                                sx={{ borderBottom: "1px dashed #ddd" }}
                            >
                                <ListItemText primary={code.name} />
                            </ListItemButton>
                        ))
                    }
                </List>
            </AccordionDetails>
        </Accordion>
    )
}

export default AreaBar