import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, List, ListItemButton, ListItemText, Typography } from '@mui/material'
import {ExpandMore} from '@mui/icons-material'

const PetFilterBar = ({areaCodes, showPetOnly, selectedInbox, setAreaCode, setSelectedInbox, setShowPetOnly}) => {
  return (
    <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>반려동물 동반 가능한 관광지</Typography>
        </AccordionSummary>
        <AccordionDetails>
             <List component="nav">
                {
                    areaCodes.map((code, index) => (
                        <ListItemButton
                            key={index}
                            selected={selectedInbox === index}
                            onClick={(event) => {
                                if(!showPetOnly){setShowPetOnly(true)};
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

export default PetFilterBar