$(document).ready(function () {

    function showMessage() {

        var inputTime = document.getElementById('time').value;
        var mySwitch = document.getElementById('mySwitch').checked;

        chrome.runtime.sendMessage({inputTime: inputTime, clearerEnabled:mySwitch}, function(response) {
            Materialize.toast('Preferences have been updated!', 3000, '', function(){
                window.close();
            });
        });

    }

    document.getElementById('doneBtn').addEventListener('click', showMessage);



});




