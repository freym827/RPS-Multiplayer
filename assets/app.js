// Initialize Firebase

//right now the game works correct, if you load both pages, play as many times as you like, and close both pages when done;
//if you open and close a bunch of pages you can break the app
//if you close all pages it will work again
//i am currently trying to reconfigure the app so that it can not be broken as easily
//mostly by using the connections I think there is a route to get somewhere.
var config = {
    apiKey: "AIzaSyDUPKYPK0uuxVJ6rp4Y9-aMUUwoYji1ink",
    authDomain: "awesomerps1.firebaseapp.com",
    databaseURL: "https://awesomerps1.firebaseio.com",
    projectId: "awesomerps1",
    storageBucket: "",
    messagingSenderId: "654945534595"
};
firebase.initializeApp(config);
var database = firebase.database();
var numberofplayers = 0;
var joinbtn = $(".joinbtn");
var gamecont = $(".gamecont");
var btn1box = $(".btn1div");
var btn2box = $(".btn2div");
var numberofchoices = 0;
var yourplayer = 0;
pl1wins = 0;
pl2wins = 0;
ties = 0;
var midtime = function() {};

/*var connectionsRef = database.ref("/connections");

var connectedRef = database.ref(".info/connected");

connectedRef.on("value", function(snap) {

  if (snap.val()) {

    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});

connectionsRef.on("value", function(snap) {
    $("#connected-viewers").text("Number of Viwers: " + snap.numChildren());
});*/

var throwdown = function(p1, p2) {
    database.ref().update( {
        choicenum: 0
    });
    if(p1 == "rock") {
        $(".rock1").css("display", "block")
        if(p2 == "rock") {
            $(".rock2").css("display", "block")
            return "tie"
        }
        if(p2 == "paper") {
            $(".paper2").css("display", "block")
            return "p2"
        }
        if(p2 == "scissors") {
            $(".scissors2").css("display", "block")
            return "p1"
        }
    }
    if(p1 == "paper") {
        $(".paper1").css("display", "block")
        if(p2 == "rock") {
            $(".rock2").css("display", "block")
            return "p1"
        }
        if(p2 == "paper") {
            $(".paper2").css("display", "block")
            return "tie"
        }
        if(p2 == "scissors") {
            $(".scissors2").css("display", "block")
            return "p2"
        }
    }
    if(p1 == "scissors") {
        $(".scissors1").css("display", "block")
        if(p2 == "rock") {
            $(".rock2").css("display", "block")
            return "p2"
        }
        if(p2 == "paper") {
            $(".paper2").css("display", "block")
            return "p1"
        }
        if(p2 == "scissors") {
            $(".scissors2").css("display", "block")
            return "tie"
        }
    }
}

database.ref().on("value", function(snapshot) { 
    numberofchoices = snapshot.val().choicenum
    numberofplayers = snapshot.val().playernum
    if(numberofchoices == 2) {
        numberofchoices == 0;
        var winner = throwdown(snapshot.val().p1choice, snapshot.val().p2choice)
        if(winner == "p1") {
            pl1wins++;
            $(".p1w").text("P1 Wins: " + pl1wins)
        }
        if(winner == "p2") {
            pl2wins++;
            $(".p2w").text("P2 Wins: " + pl2wins)
        }
        if(winner == "tie") {
            ties++
            $(".draws").text("Draws: " + ties)
        }
        midtime = setInterval(function(){ 
            clearInterval(midtime);
            $(".chimg").css("display","none")
            if(yourplayer == 1) {
                btn1box.css("display", "block");
            }
            if(yourplayer == 2) {
                btn2box.css("display", "block");
            }
        }, 3000);
    }
})

joinbtn.on("click", function() {
    gamecont.css("display", "block");
    joinbtn.css("display", "none");
    if(numberofplayers == 1) {
        yourplayer = 1;
        btn1box.css("display", "block");
        numberofplayers++;
        database.ref().update( {
            playernum: numberofplayers
        });
    }else if(numberofplayers == 2) {
        yourplayer = 2;
        btn2box.css("display", "block");
        numberofplayers++;
        database.ref().update( {
            playernum: numberofplayers
        });
    }else {
        gamecont.css("display", "none");
        joinbtn.css("display", "block");
        joinbtn.text("CANT JOIN. TOO MANY PLAYERS")
    }
});

$(".rock1").on("click", function() {
    numberofchoices++;
    database.ref().update( {
        p1choice: "rock",
        choicenum: numberofchoices
    });
    btn1box.css("display", "none")
})

$(".paper1").on("click", function() {
    numberofchoices++;
    database.ref().update( {
        p1choice: "paper",
        choicenum: numberofchoices
    });
    btn1box.css("display", "none")
})

$(".scissors1").on("click", function() {
    numberofchoices++;
    database.ref().update( {
        p1choice: "scissors",
        choicenum: numberofchoices
    });
    btn1box.css("display", "none")
})

$(".rock2").on("click", function() {
    numberofchoices++;
    database.ref().update( {
        p2choice: "rock",
        choicenum: numberofchoices
    });
    btn2box.css("display", "none")
})

$(".paper2").on("click", function() {
    numberofchoices++;
    database.ref().update( {
        p2choice: "paper",
        choicenum: numberofchoices
    });
    btn2box.css("display", "none")
})

$(".scissors2").on("click", function() {
    numberofchoices++;
    database.ref().update( {
        p2choice: "scissors",
        choicenum: numberofchoices
    });
    btn2box.css("display", "none")
})

$(".sendbtn").on("click", function() {
    var newtxt = $(".sendtext").val().trim();
    $(".sendtext").val("")
    database.ref().push( {
        message: "p" + yourplayer + ": " + newtxt
    });
});

database.ref().on('child_added', function(snapshot) {
    $(".old5chat").text($(".old4chat").text())
    $(".old4chat").text($(".old3chat").text())
    $(".old3chat").text($(".old2chat").text())
    $(".old2chat").text($(".oldchat").text())
    $(".oldchat").text($(".newchat").text())
    $(".newchat").text(snapshot.val().message);
});



//reset info on page close
var presenceRef = firebase.database().ref();
presenceRef.onDisconnect().set({
        playernum: 1,
        choicenum: 0,
        p1choice: "rock",
        p2choice: "rock",
        connections: 0
});




