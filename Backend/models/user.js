const db = require("../database/config");


// User model creation
const User = function(user) {
    this.pseudo=user.pseudo,
    this.email=user.email,
    this.password=user.password,
    this.profilPic=user.profilPic,
    this.isAdmin=!!user.isAdmin,
    this.isActive=!!user.isActive
}

// Creation of a user
User.create = (newUser, result) => {
    db.query(`INSERT INTO users SET ?`, 
            newUser, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, {
                id:res.id,
                ...newUser
            })
        }
    })
};

// Find user with his email
User.findOneByEmail = (email, result) => {
    db.query(`SELECT *  FROM users  WHERE email=? AND isActive=true`, 
              email, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } 
        result(null, res[0])
    })
};

// Find use via his id
User.findOneById = (id, result) => {
    db.query(`SELECT * FROM users  WHERE id=? AND isActive=true`, 
              id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } 
        result(null, res[0])
    })
};

// Find all users
User.findAll = (result) => {
    db.query(`SELECT *  FROM users WHERE isActive=true`, 
              (err, res) => {
        if(err) {
            result(err, null);
            return;
        } 
        result(null, res)
    })
};

// Modify username
User.modifyPseudo = (user, result) => {
    db.query(`UPDATE users SET pseudo=? WHERE id=? AND isActive=true`, 
              [user.pseudo, user.id], (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

// Modify user profile picture
User.modifyProfilPic = (user, result) => {
    db.query(`UPDATE users SET profilPic=? WHERE id=? AND isActive=true`, 
              [user.profilPic, user.id], (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

// Deactivate user
User.deactivate = (id, result) => {
    db.query(`UPDATE users SET isActive=false WHERE id=?`, 
              id, (err, res) => {
        if(err) {
            result(err, null);
            return;
        } else {
            result(null, res)
        }
    })
};

module.exports = User;