MyInterval=setInterval(myFunction,3000);

function myFunction(){
    if(document.getElementById("export")){
        document.getElementById("export").addEventListener('click', function(){
         console.log("working...")
            chrome.tabs.query({}, tabs => {
                tabs.forEach(tab => { 
                var data = {
                    msg : "work"
             
                }
                chrome.tabs.sendMessage(tab.id, {msg:data});
              });
            });
        },{once:true})   
    }


}

