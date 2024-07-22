const bcrypt = require('bcryptjs');
const sql = require('mssql');
const jwt = require('jsonwebtoken');
const dbConfig = require('../dbConfig');
const { single } = require('../middlewares/upload');


const login = async ( req , res) => {
        
}

const logout = async ( req , res) => {
    
}

const signup = async ( req , res) => {
    
}

module.exports = {
    login ,
    signup,
    logout
}