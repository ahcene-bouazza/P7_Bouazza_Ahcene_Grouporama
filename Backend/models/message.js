const db = require("../database/config");

const Message = function(message) {
    this.user_id=message.user_id,
    this.content=message.content,
    this.image=message.image,
    this.createdAt=message.createdAt,
    this.updatedAt=message.updatedAt,
    this.isActive=!!message.isActive
}

// Create a message
Message.create = (newMessage, result) => {
    let statment = `INSERT INTO messages  SET ?`;
    db.query(statment, newMessage, (err, res) => {
        if(err) {
            result(err, null);
            return;
        }
        result(null, {
            id:res.id,
            ...newMessage
        })
    })
};

// Get a message
Message.findOne = (id, result) => {
    db.query(`SELECT * 
              FROM messages 
              WHERE id=?
              AND isActive=true`, 
              id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res[0])
        }
    })
};

// Get last message
Message.getLatest = (id, result) => {
    db.query(`SELECT * 
              FROM messages
              WHERE isActive=true 
              ORDER BY id 
              DESC 
              LIMIT 0,1`, 
              (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res[0])
        }
    })
};

// Get all messages
Message.findAll = (result) => {
    db.query(`SELECT messages.*, 
              users.pseudo, users.profilPic 
              FROM messages 
              JOIN users 
              ON users.id = messages.user_id
              WHERE messages.isActive=true
              ORDER BY messages.id 
              DESC`, 
              (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

// Get all messages with comments
Message.findAllWithComments = (result) => {
    db.query(`SELECT messages.*, 
              users.pseudo, users.profilPic, 
              comments.id AS comment_id, 
              user_comment.pseudo AS comment_pseudo, 
              comments.comment AS comment_content
              FROM messages 
              LEFT JOIN users ON messages.user_id = users.id
              LEFT JOIN comments ON messages.id = comments.message_id
              LEFT JOIN users AS user_comment ON comments.user_id = user_comment.id
              WHERE messages.isActive=true 
              ORDER BY messages.id DESC;`, 
              (err, res) => {
        if(err) {
            result(err, null);
        } else {
            result(null, res)
        }
    })
};

// Delete a message
Message.delete = (id, result) => {
    db.query(`UPDATE messages
              SET isActive=0 
              WHERE id=?`, 
              id, (err, res) => {
        if(err) {
            result(err, null);
        } else {
            result(null, res)
        }
    })
};

// Trouver le type de r??actions
Message.findReactionType = (id, result) => {
    db.query(`SELECT * 
              FROM reaction_type_id 
              WHERE id=?`, 
              id, (err, res) => {
        if(err) {
            result(err, null);
        } 
        else {
            result(null, res);
        }
    });
};

// Trouver une r??ction
Message.findReaction = (reaction, result) => {
    db.query(`SELECT * 
        FROM message_reaction_user
        WHERE message_id=?
        AND user_id=?`,
        [reaction.message_id, reaction.user_id], (err, res) => {
        if(err) {
            result(err, null);
        } 
        else {
            result(null, res);
        }
    });
};

// Trouver toutes les r??actions
Message.findAllReaction = (result) => {
    db.query(`SELECT message_id, reaction_id, COUNT(*) AS sumReaction
              FROM message_reaction_user
              GROUP BY message_id, reaction_id
              ORDER BY message_id DESC;`, 
              (err, res) => {
        if(err) {
          result(err, null);
        } else {
          result(null, res)
        }
    })
};

// Ajouter une r??action
Message.addReaction = (newReaction, result) => {
    let statment = `INSERT 
                    INTO message_reaction_user 
                    SET ?`;
    db.query(statment, newReaction, (err, res) => {
        if(err) {
            console.log(err);
            result(err, null);
        }
        result(null, null);
    })
};

// Modifier la r??action dun message
Message.updateReaction = (newReaction, result) => {
    db.query(`UPDATE message_reaction_user
              SET reaction_id=?
              WHERE message_id=?
              AND user_id=?`, 
              [newReaction.reaction_id, newReaction.message_id, newReaction.user_id], (err, res) => {
        if(err) {
            result(err, null);
        } else {
            result(null, res)
        }
    })
};

module.exports = Message;