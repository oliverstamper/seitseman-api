$(document).ready(function () {
  
  
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);

 
  
  function createTimeBlocks() {
    var currentTime = dayjs().hour();
    var timeBlocksContainer = $("#timeBlocksContainer");

    
    
    for (var hour = 8; hour <= 16; hour++) {
      var timeBlock = $("<div>").addClass("row");
      var timeCol = $("<div>").addClass("col-2 hour").text(dayjs().hour(hour).format("hA"));
      var eventCol = $("<div>").addClass("col-8 description").html("<textarea class='event-input'></textarea>");

     
      
      if (hour < currentTime) {
        eventCol.addClass("past");
      } else if (hour === currentTime) {
        eventCol.addClass("present");
      } else {
        eventCol.addClass("future");
      }

      var saveCol = $("<div>").addClass("col-2 saveBtn").html("<i class='far fa-save'></i>");

      
      
      var storedEvent = localStorage.getItem("event" + hour);
      if (storedEvent) {
        eventCol.children("textarea").val(storedEvent);
      }

      
      
      saveCol.on("click", function () {
        var eventText = $(this).siblings(".description").children("textarea").val();
        var eventHour = $(this).parent().find(".hour").text().trim();
        localStorage.setItem("event" + eventHour, eventText);
      });

      
      
      timeBlock.append(timeCol, eventCol, saveCol);
      timeBlocksContainer.append(timeBlock);
    }
  }

 
  
  createTimeBlocks();
});