var friends = require("../data/friends.js");

module.exports = function(app){
    app.get("/api/friends", function(req, res){
        res.json(friends);
    });

    app.post("/api/friends", function(req, res){
        console.log(req.body.scores);

        var userInput = req.body;

        var userResponse = userInput.scores;

        for (var i = 0; i < userResponse.length; i++){
            userResponse[i] = parseInt(userResponse[i]);
        }

        var bestMatch = 0;
        var bestDifference = 40;

        for(var i = 0; i < friends.length; i++){
            var totalDifference = 0;
            for (var j = 0; j < friends[i].length; j++){
                var friendDifference = Math.abs(userResponse[j] - friends[i].scores[j]);
                totalDifference += friendDifference
            }
            
            if(totalDifference < bestDifference){
                bestMatch = i;
                bestDifference = totalDifference;
            }
        }

        friends.push(userInput);

        res.json(friends[bestMatch]);

    });
};