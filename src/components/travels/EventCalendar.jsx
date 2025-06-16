import React, {useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Dialog, DialogTitle, DialogContent, Typography, Box } from '@mui/material'
// import '@fullcalendar/core/main.css'
// import '@fullcalendar/daygrid/main.css'
import "../../css/calendar.css"
// import { convertToHtml } from '../../api/convertToHtml'

const EventCalendar = ({events}) => {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent({
      title: clickInfo.event.extendedProps.title,
      start: clickInfo.event.extendedProps.start,
      end: clickInfo.event.extendedProps.end,
      address: clickInfo.event.extendedProps.addr1,
      firstimage: clickInfo.event.extendedProps.firstimage,
      mapx: clickInfo.event.extendedProps.mapx,
      mapy: clickInfo.event.extendedProps.mapy,
      mlevel: clickInfo.event.extendedProps.mlevel,
      tel: clickInfo.event.extendedProps.tel,
      contenttypeid: clickInfo.event.extendedProps.contenttypeid
    })
    setOpen(!open);
  }

  
  return (
    <>
      <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          events={events}
          locale="ko"
          height="auto"
          dayMaxEventRows={4}
          eventDisplay='block'
          eventClick={handleEventClick}
      />
      <Dialog 
        open={open} 
        onClose={()=>setOpen(false)} 
        maxWidth="md"
        sx={{zIndex: 10000}} 
        fullWidth
      >
        {selectedEvent &&
          <>
            <DialogTitle>{selectedEvent.title}행사 정보</DialogTitle>
            <DialogContent>
              <Box>
                {selectedEvent.firstimage && (
                  <Box component="img"
                       src={selectedEvent.firstimage}
                       alt='행사이미지'
                       sx={{ width: '100%', borderRadius: 2, mb: 2 }}
                  />
                )}
                <Typography variant='body2' color='text.secondary'>
                  날짜: {selectedEvent.start}
                      {
                        selectedEvent.end && (
                          <span> ~ {selectedEvent.end} </span>
                        )
                      }
                </Typography>
                {selectedEvent.tel && (
                  <Typography variant='body2' color='text.secondary' mt={1}>
                    전화번호: <span dangerouslySetInnerHTML={{__html: selectedEvent.tel}} />
                  </Typography>
                )}
                {selectedEvent.address && (
                  <Typography variant='body2' color='text.secondary' mt={1}>
                    장소: {selectedEvent.address}
                  </Typography>
                )}
              </Box>
            </DialogContent>
          </>
        }
      </Dialog>
    </>
  )
}

export default EventCalendar