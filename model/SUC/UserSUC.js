var db = require('../../common/db');

function getAllUsers(next) {
    let query = "select * from user";
    db.query(query, function(err, results) {
        next(err, results);
    });
}

function countUser() {
    return new Promise(function(resolve, reject) {
        let query = "select count(*) as total from user";
        db.query(query, function(err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results[0].total);
            }            
        });
    });
    
}

function getUserByUsername(username, next) {
    let query = `select * from user where username='${username}'`;
    db.query(query, function(err, results) {
        next(err, results);
    });
}

function insertNewUser(username, password, name, phone, email, next) {
    let query = `insert into user(username, password, name, phone, email) 
                values('${username}', '${password}', '${name}', '${phone}', '${email}')`;
    db.query(query, function(err, results) {
        next(err, results);
    });
}

function updateUser(username, password, name, phone, email, next) {
    let query = `update user set password='${password}', name='${name}', 
                            phone='${phone}', email='${email}'
                            where username='${username}'`;
    db.query(query, function(err, results) {
        next(err, results);
    });
}

function deleteUser(username, next) {
    let query = `delete from user where username='${username}'`;
    db.query(query, function(err, results) {
        next(err, results);
    });
}

module.exports = {
    getAllUsers:            getAllUsers,
    countUser:              countUser,
    getUserByUsername:      getUserByUsername,
    insertNewUser:          insertNewUser,
    updateUser:             updateUser,
    deleteUser:             deleteUser
}