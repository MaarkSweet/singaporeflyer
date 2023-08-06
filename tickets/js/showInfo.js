// Ticket
function showTicketInfo(ticketId) {
    const ticketInfo = document.getElementById(ticketId);
    const ticketInfos = document.querySelectorAll(".ticket-info");
    const isMobile = window.matchMedia("(max-width: 1400px)").matches;
    
    ticketInfos.forEach(info => {
      if (info.id === ticketId) {
        info.style.display = isMobile ? "block" : "flex";
      } else {
        info.style.display = "none";
      }
    });
  }
  
  // Man
  function showManInfo(manId) {
    const manInfo = document.getElementById(manId);
    const manInfos = document.querySelectorAll(".man-info");
  
    manInfos.forEach(info => {
      if (info.id === manId) {
        info.style.display = "block";
      } else {
        info.style.display = "none";
      }
    });
  }
  

  // Calendar
  function showCalenderInfo(calendarId) {
    const calendarInfo = document.getElementById(calendarId);
    const calendarInfos = document.querySelectorAll(".calendar-info");
    
    calendarInfos.forEach(info => {
      if (info.id === calendarId) {
        info.style.display = "block";
      } else {
        info.style.display = "none";
      }
    });
  }