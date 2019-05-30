/**
 * index.js
 * Returns the sum of two numbers
 * only if the first number is greater or equal than the second number
 */

'use strict'

const vandium = require('vandium')
var mysql = require('mysql');
var mysql_host = '127.0.0.1',
    mysql_dbname = '********',
    mysql_user = '*******',
    mysql_password = '********';

var res;

var connection;
function createSingleConnection() {
    connection = mysql.createConnection({
        host       : mysql_host,
        user       : mysql_user,
        password   : mysql_password,
        database   : mysql_dbname
    });

    connection.on('error', (err) => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            createSingleConnection();
            console.log(`Reconnected`);
        } else {
            throw err;
        }
    });
}
createSingleConnection();

function execQuery(query) {
    connection
        .query(query)
        .on('error', function(err){
            console.log("MySQL Select Error");
            return Promise.reject(
                new Error('sql...')
            )
        })
        .on('result', function(rows){
            console.log("MySQL Select Success");
            res = rows;
        })
        .on('end', function(){
            console.log("MySQL Select End");
            console.log(res);
            connection.end();
        });
}

async function responseQuery() {
    await execQuery("select * from news;");
    return res;
}

exports.handler = vandium.api()
    .GET((event) => {
        // QueryString
        let os =  event.queryStringParameters.os;
        if(os === null){
            return Promise.reject(
                new Error('os...')
            )
        }
        return responseQuery();
    });
