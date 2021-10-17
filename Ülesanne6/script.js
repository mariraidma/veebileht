(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let mid = "pm"

            if (h <= 12) {
                mid = "am";
            }

            if (h == 0) {
                h = 12;
            } else if (h > 12) {
                h = h - 12;
            }


            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " +mid;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event){
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else if (linn.value === "tln"){
            
            e.innerHTML = "0,00 &euro;";
            
        } else if (linn.value === "trt"){

            e.innerHTML = "2,50 &euro;";

        } else if (linn.value === "nrv"){

            e.innerHTML = "2,50 &euro;";

        } else if (linn.value === "prn"){

            e.innerHTML = "3,00 &euro;";

        }
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {

    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.38104,
            26.71992
        );

    let secondCenter = new Microsoft.Maps.Location(
        59.3959451,
        24.6710596
    );

    let center = new Microsoft.Maps.Location(
      59.4163596,
      24.7427001
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });

    let pushpin2 = new Microsoft.Maps.Pushpin(secondCenter, {
        title: "TalTech",
    })

    let infobox1 = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    infobox1.setMap(map);

    pushpin.metadata = {
        title: "Tartu Ülikool",
        description: "Tartu ülikool"
    }

    pushpin2.metadata = {
        title: "TalTech",
        description: "TalTech"
    }

    function pushpinClicked(e) {
        if (e.target.metadata) {
            infobox1.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });

        }
    }

    Microsoft.Maps.Events.addHandler(pushpin, "click", pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, "click", pushpinClicked);

    map.entities.push(pushpin2);
    map.entities.push(pushpin);
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

