var friends = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        console.log(req.body.scores);

        var userInput = req.body;

        var userResponse = userInput.scores;

        for (var i = 0; i < userResponse.length; i++) {
            userResponse[i] = parseInt(userResponse[i]);
        }

        var bestMatch = 0;
        var bestDifference = 40;

        for (var i = 0; i < friends.length; i++) {
            console.log("friends loop");
            var totalDifference = 0;
            // for (var j = 0; j < friends[i].length; j++){
            for (var j = 0; j < 10; j++) {
                // console.log("User" + userResponse[j] + " | " + friends[i].scores[j]);
                var friendDifference = Math.abs(userResponse[j] - friends[i].scores[j]);
                totalDifference += friendDifference
            }
            
            console.log(totalDifference + " | " + bestDifference);
            if (totalDifference < bestDifference) {
                bestMatch = i;
                bestDifference = totalDifference;
            }
        }

        friends.push(userInput);
        console.log("best Match" + bestMatch);

        res.json(friends[bestMatch]);

    });
};