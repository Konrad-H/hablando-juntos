(function (global){
    var recorder, gumStream;    
    var app={};
    var homeHtml = "snippets/home.html";
    var sheetHtml = "snippets/sheet.html";
    var endHtml = "snippets/end.html";
    const delayTime = 3000;

    // Convenience function for inserting innerHTML for 'select'
    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    // Show loading icon inside element identified by 'selector'.
    var showLoading = function (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='assets/ajax/ajax-loader.gif'></div>";
        insertHtml(selector, html);
      };
      
    // Return substitute of '{{propName}}'
    // with propValue in given 'string'
    var insertProperty = function (string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string
        .replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    }

    loadHome = function(){
        $ajaxUtils.sendGetRequest(
            homeHtml,
            function (responseText) {
              document.querySelector("#main-content")
                .innerHTML = responseText;
            },
            false);
    }

    loadEnd = function(){
        $ajaxUtils.sendGetRequest(
            endHtml,
            function (responseText) {
              document.querySelector("#main-content")
                .innerHTML = responseText;
            },
            false);
    }
  

    loadSheet = function (number){
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            sheetHtml,
            function(responseText){
                var strnum;
                if (0<number & (number<10) ){ strnum = "0" + String(number); }
                else if (number>=10){ strnum = String(number);}
                // console.log(strnum);
                responseText = insertProperty(responseText, "num", strnum);
                document.querySelector("#main-content")
            .innerHTML = responseText;
                var recordButton = document.getElementById("record_"+strnum );
                recordButton.addEventListener("click", toggleRecording);
            },
            false);
    };

    // On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function (event) {
    
            // On first load, show home view
            // showLoading("#main-content");
            // Start with this
            // loadHome();
            loadSheet(1);
            app.page = 1;
        });
    
    app.homepage=function(){
        loadHome();
        app.page=0;
    };
    
    app.nextpage = function (){
        if (this.page<39){
            loadSheet(++(this.page));
        }
        else if (this.page==39){
            this.page++;
            loadEnd();
        }

    };
    
    app.prevpage = function (){
        if (this.page>1){
            loadSheet(--(this.page));
        }

    };

    function toggleRecording(self) {
        var self=this;
        if (recorder && recorder.state == "recording") {
            stopRecording(self); 
            
        } 
        else {
            $(self).attr('data-recording', 'true');
            navigator.mediaDevices.getUserMedia({
                audio: true
            }).then(function(stream) {
                gumStream = stream;
                recorder = new MediaRecorder(stream);
                recorder.ondataavailable = function(e) {
                    var url = URL.createObjectURL(e.data);
                    var preview = document.createElement('audio');
                    preview.controls = true;
                    preview.src = url;
                    var holderObject = $('<div class="row"></div>')
                    .append(preview);
                    console.log(holderObject[0]);
                    document.querySelector(".holder").appendChild(holderObject[0]);
                };
                recorder.start();
                self.className = self.className.replace("btn-primary","btn-danger");
                setTimeout(function(){stopRecording(self);}, delayTime);
            });
        }
    }

    function stopRecording(self){
        recorder.stop();
        gumStream.getAudioTracks()[0].stop();
        $(self).attr('data-recording', '');
        self.className = self.className.replace("btn-danger","btn-primary");
        
    }


    app.page= 1;
    






    global.$app = app;
})(window);