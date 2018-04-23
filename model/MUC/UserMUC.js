var userSUC = require('../SUC/UserSUC');

async function getAllUsers(next) {
    var output = {};
    var errorCode = '400';
    var responseCode = 400;
    var message = '';
    var data = '';

    userSUC.countUser().then(function(result) {
        // console.log('total1: ' + result)
        total = result;
    }, function(err) {
        console.log('err muc: ' + err);
    });

    userSUC.getAllUsers((err, results) => {
        try {
            if (err) {
                errorCode = getOutputFromErr(err);
                responseCode = 400;
                data = '';
                message = 'Yêu cầu không hợp lệ';
            } else {
                // console.log('total2: ' + total)
                responseCode = 200;
                errorCode = '200';
                data = {
                    total: total,
                    users: results
                };
                message = 'Thành công';
            }
        } catch (err) {
            responseCode = 500;
            errorCode = '500';
            data = '';
            message = 'Lỗi hệ thống';
        }

        output = {
            data: data,
            errorCode: errorCode,
            message: message
        };

        next(output, responseCode);
    });
}

function getUserByUsername(username, next) {
    var output = {};
    var errorCode = '400';
    var responseCode = 400;
    var message = '';
    var data = '';
    userSUC.getUserByUsername(username, (err, results) => {
        try {
            if (err) {
                errorCode = getOutputFromErr(err);
                responseCode = 400;
                data = '';
                message = 'Yêu cầu không hợp lệ';
            } else {
                if (results.length == 1) {
                    responseCode = 200;
                    errorCode = '200';
                    data = results;
                    message = 'Thành công';
                } else {
                    responseCode = 404;
                    errorCode = '404';
                    data = '';
                    message = 'Không tìm thấy thông tin của user này';
                }
            }
        } catch (err) {
            responseCode = 500;
            errorCode = '500';
            data = '';
            message = 'Lỗi hệ thống';
        }

        output = {
            data: data,
            errorCode: errorCode,
            message: message
        };

        next(output, responseCode);
    });
}

function insertNewUser(username, password, name, phone, email, next) {
    var output = {};
    var errorCode = '400';
    var responseCode = 400;
    var message = '';
    var data = '';
    try {
        if (username === undefined || username === '' ||
            password === undefined || password === '' ||
            name     === undefined || name     === '' ||
            phone    === undefined || phone    === '' ||
            email    === undefined || email    === '') {
                data = '';
                errorCode = getOutputFromErr({code: 'MISSING_INFORMATION_CREATE_NEW_USER'});
                message = 'Thông tin nhập vào chưa đủ. Vui lòng kiểm tra lại';
                responseCode = 400;

                next(output, responseCode);
        } else {
            userSUC.insertNewUser(username, password, name, phone, email, (err, results) => {
                if (err) {
                    errorCode = getOutputFromErr(err);
                    if (errorCode === '400_006') {
                        message = 'Username này đã được sử dụng. Vui lòng chọn username khác.';
                    } else {
                        message = 'Yêu cầu không hợp lệ';
                    }
                    responseCode = 400;
                    data = '';
                } else {
                    if (results.affectedRows == 1) {
                        errorCode = '201_001';
                        responseCode = 201;
                        data = '';
                        message = 'Tạo thành công';
                    } else {
                        errorCode = '400_099';
                        responseCode = 400;
                        data = '';
                        message = 'Yêu cầu không hợp lệ';
                    }
                }

                output = {
                    data: data,
                    errorCode: errorCode,
                    message: message
                };
    
                next(output, responseCode);
            });
        }
    } catch (err) {
        responseCode = 500;
        errorCode = '500';
        data = '';
        message = 'Lỗi hệ thống';

        next(output, responseCode);
    }
}

function updateUser(username, password, name, phone, email, next) {
    var output = {};
    var errorCode = '400';
    var responseCode = 400;
    var message = '';
    var data = '';
    try {
        if (username === undefined || username === '' ||
            password === undefined || password === '' ||
            name     === undefined || name     === '' ||
            phone    === undefined || phone    === '' ||
            email    === undefined || email    === '') {
                data = '';
                errorCode = getOutputFromErr({code: 'MISSING_INFORMATION_CREATE_NEW_USER'});
                message = 'Thông tin nhập vào chưa đủ. Vui lòng kiểm tra lại';
                responseCode = 400;

                output = {
                    data: data,
                    errorCode: errorCode,
                    message: message
                };
        
                next(output, responseCode);
        } else {
            userSUC.updateUser(username, password, name, phone, email, (err, results) => {
                if (err) {
                    errorCode = getOutputFromErr(err);
                    responseCode = 400;
                    data = '';
                    message = 'Yêu cầu không hợp lệ';
                } else {
                    var rowMatched = results.message.split('Rows matched: ')[1].split('')[0];
                    if (results.affectedRows == 1) {
                        errorCode = '200';
                        responseCode = 200;
                        data = '';
                        message = 'Thành công';
                    } else {
                        if (rowMatched === '1') {
                            errorCode = '400_099';
                            responseCode = 400;
                            data = '';
                            message = 'Yêu cầu không hợp lệ';
                        } else {
                            errorCode = '400_098';
                            responseCode = 400;
                            data = '';
                            message = 'Thông tin nhập vào không đúng. Vui lòng kiểm tra lại';
                        }
                    }
                }

                output = {
                    data: data,
                    errorCode: errorCode,
                    message: message
                };
    
                next(output, responseCode);
            });
        }
    } catch (err) {
        responseCode = 500;
        errorCode = '500';
        data = '';
        message = 'Lỗi hệ thống';

        next(output, responseCode);
    }
}

function deleteUser(username, next) {
    var output = {};
    var errorCode = '400';
    var responseCode = 400;
    var message = '';
    var data = '';
    try {
        if (username === undefined || username === '') {
                data = '';
                errorCode = getOutputFromErr({code: 'MISSING_INFORMATION_CREATE_NEW_USER'});
                message = 'Thông tin nhập vào chưa đủ. Vui lòng kiểm tra lại';
                responseCode = 400;

                output = {
                    data: data,
                    errorCode: errorCode,
                    message: message
                };
        
                next(output, responseCode);
        } else {
            userSUC.deleteUser(username, (err, results) => {
                if (err) {
                    errorCode = getOutputFromErr(err);
                    responseCode = 400;
                    data = '';
                    message = 'Yêu cầu không hợp lệ';
                } else {
                    if (results.affectedRows == 1) {
                        errorCode = '200';
                        responseCode = 200;
                        data = '';
                        message = 'Thành công';
                    } else {
                        errorCode = '400';
                        responseCode = 400;
                        data = '';
                        message = 'Yêu cầu không hợp lệ';
                    }
                }

                output = {
                    data: data,
                    errorCode: errorCode,
                    message: message
                };
    
                next(output, responseCode);
            });
        }
    } catch (err) {
        responseCode = 500;
        errorCode = '500';
        data = '';
        message = 'Lỗi hệ thống';

        next(output, responseCode);
    }
}

function getOutputFromErr(err) {
    var errorCode = '';
    console.log(err.code);
    if (err.code === 'ECONNREFUSED') {
        // disconnect to mysql
        errorCode = '400_002';
    }
    if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
        errorCode = '400_003';
    }
    if (err.code === 'PROTOCOL_ENQUEUE_HANDSHAKE_TWICE') {
        errorCode = '400_004';
    }
    if (err.code === 'MISSING_INFORMATION_CREATE_NEW_USER') {
        errorCode = '400_005';
    }
    if (err.code === 'ER_DUP_ENTRY') {
        errorCode = '400_006';
    }
    return errorCode;
}

module.exports = {
    getAllUsers:            getAllUsers,
    getUserByUsername:      getUserByUsername,
    insertNewUser:          insertNewUser,
    updateUser:             updateUser,
    deleteUser:             deleteUser
}