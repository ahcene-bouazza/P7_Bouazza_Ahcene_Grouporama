const db = require("../database/config");
const Utils = require('../dateTime/dateTime');

const Comment = function(comment) {
    this.user_id=comment.user_id,
    this.message_id=comment.message_id,
    this.comment=comment.comment,
    this.createdAt=comment.createdAt,
    this.updatedAt=comment.updatedAt
}


// Create a comment
Comment.create = (newComment, result) => {
    db.query(`INSERT  INTO comments  SET ?`, 
              newComment, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }
        result(null, res)
    })
};

// Get last comment
Comment.latest = (result) => {
    db.query(`SELECT comments.*,
              users.pseudo as pseudo
              FROM comments
              JOIN users ON users.id=comments.user_id
              ORDER BY id
              DESC LIMIT 0,1`, 
              (err, res) => {
        if(err) {
            result(err, null);
            return;
        }
        result(null, res[0])
    })
};

// Get comments by message
Comment.findAllMessageComment = (id, result) => {
    db.query(`SELECT * 
              FROM comments 
              WHERE message_id=?`, 
              id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res[0])
        }
    })
};

// Delete a comment
Comment.delete = (id, result) => {
    db.query(`DELETE FROM comments 
              WHERE id=?`, 
              Number(id), (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

module.exports = Comment;