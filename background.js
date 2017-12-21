
var frequency;
var myInterval;

function clearHistory (){

    //clear history

}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        var inputTime = request.inputTime.trim();
        var clearerEnabled = request.clearerEnabled;

        if(clearerEnabled){
            // save chosen frequency in storage

            chrome.storage.sync.set({'frequency': inputTime}, function() {

                chrome.storage.sync.get("frequency", function(res){
                    frequency = res.frequency * 1000;

                    sendResponse({msg: " "});

                    //start scheduled clearer

                    clearInterval(myInterval);
                    myInterval = 0;
                    myInterval = setInterval(function(){ clearHistory() }, frequency);
                    
                });


            });


        }else{

            // stop scheduled clearer
            clearInterval(myInterval);
            myInterval = 0;

        }

    });











