"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    index: function (req, res) {
        return res.render('rooms/select-room.ejs');
    },
    room: function (req, res) {
        if (req.params.room_name) {
            var rooms = ['misc', 'frontend', 'backend', 'mobile', 'games'];
            if (rooms.includes(req.params.room_name)) {
                var capitalize = function (str) {
                    var capitalized = str[0].toUpperCase() + str.substr(1, str.length);
                    return capitalized;
                };
                return res.render("rooms/room.ejs", {
                    room_name: capitalize(req.params.room_name),
                    username: req.body.userName
                });
            }
            else {
                res.status(400);
                return res.json({
                    error: 'Invalid room'
                });
            }
        }
        else {
            res.status(400);
            return res.json({
                error: 'You must pass a room as a slug in the URL'
            });
        }
    }
};
