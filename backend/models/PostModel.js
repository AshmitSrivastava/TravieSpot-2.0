const mssql = require('mssql');
const dbConfig = require('../dbConfig');
const { get } = require('../routes/blogRoutes');

async function createPost(userId , title , content){
    const pool = await mssql.connect(dbConfig);
    await pool.request()
        .input('userId', mssql.Int, userId)
        .input('title', mssql.NVarChar, title)
        .input('content', mssql.NVarChar, content)
        .query('INSERT INTO dbo.posts(userId, title , content) VALUES (@userId, @title , @content)');
}

async function getPosts(userId){
    const pool = await mssql.connect(dbConfig);
    const result = await pool.request()
                    .query('SELECT p.id, p.title, p.content, p.createdAt, u.username FROM dbo.posts p JOIN dbo.users u ON p.userId = u.id ORDER BY p.createdAt DESC');
    return result.recordset;
};

module.exports = {createPost, getPosts}; 