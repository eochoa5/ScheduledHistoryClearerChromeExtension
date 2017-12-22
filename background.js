
var frequency;
var myInterval;

function clearHistory (){

    //clear history

    chrome.history.deleteAll(function(){

        // show notification telling the user

        var options = {
            type:"basic",
            iconUrl: "images/clear32.png",
            title: "History Clearer Notification",
            message: "Your history has been cleared!"
        };


        chrome.notifications.create("HistoryClearedNotification12345",  options, function(id){

        });

    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        var inputTime = request.inputTime.trim();
        var clearerEnabled = request.clearerEnabled;

        if(clearerEnabled){

            // save chosen frequency in storage

            chrome.storage.sync.set({'frequency': inputTime}, function() {

                chrome.storage.sync.get("frequency", function(res){
                    frequency = res.frequency * 3600000;

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

            chrome.storage.sync.remove("frequency");

        }

    });


// execute script when chrome is opened

chrome.storage.sync.get("frequency", function(res) {

    if (res.frequency !== undefined) {

        frequency = res.frequency * 3600000;

        //start scheduled clearer

        clearInterval(myInterval);
        myInterval = 0;
        myInterval = setInterval(function () {
            clearHistory()
        }, frequency);

    }


});















