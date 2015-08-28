var stocks = [];
var endPrice = [];
var percentChange =[];
var i = 0;
var body = " ";

$(document).ready(function(){

  $("#search").click(function(){
    var input = $("#keyword").val();
    $.getJSON("http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=" + input + "&callback=?",function(result){
      stocks.unshift(result.Name);
      endPrice.unshift(result.LastPrice.toFixed(2));
      percentChange.unshift(result.ChangePercent.toFixed(2));
      $("#feed").text(stocks[0] + ": " + "$" + endPrice[0] + " with a change of " + percentChange[0]  + "%");
      body = stocks[i] + ": " + "$" + endPrice[i] + " with a change of " + percentChange[i]  + "%";
    })
  })


  $("#send").click(function(){
    var phoneNumber = $("#number").val();

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://AC79f0378dc2d8827ec902a0139ee70c60:36840398360e76c4becb2ead397b8c1c@api.twilio.com/2010-04-01/Accounts/AC79f0378dc2d8827ec902a0139ee70c60/SMS/Messages.json",
      "method": "POST",
      "headers": {
      "authorization": "Basic QUM3OWYwMzc4ZGMyZDg4MjdlYzkwMmEwMTM5ZWU3MGM2MDozNjg0MDM5ODM2MGU3NmM0YmVjYjJlYWQzOTdiOGMxYw=="
      },
      "data": {
        "To": phoneNumber.toString(),
        "From": "13476258854",
        "Body": body
      }
    }
    if ($('#Now').is(':checked')){
//window.setInterval(function(){ // Set interval for checking
  //  var date = new Date(); // Create a Date object to find out what time it is
    //if(date.getHours() === 4 && date.getMinutes() === 00){ // Check the time
         $.ajax(settings).done(function (response) {
            console.log(response);
            alert("Your message was sent successfully")
    });
    //}
//}, 60000); // Repeat every 60000 milliseconds (1 minute)
    }
    else if ($('#Later').is(':checked')){
      alert("Your message is queued and will be sent when the market closes")
      window.setInterval(function(){ // Set interval for checking
        var date = new Date(); // Create a Date object to find out what time it is
        if(date.getHours() === 4 && date.getMinutes() === 00){ // Check the time
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
        }
      }, 60000); // Repeat every 60000 milliseconds (1 minute)
    }
  })
});