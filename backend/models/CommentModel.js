const mssql = require('mssql');
const dbConfig = require('../dbConfig');

async function addComment(userId, postId, content) {
    const pool = await mssql.connect(dbConfig);
    await pool.request()
        .input('userId', mssql.Int, userId)
        .input('postId', mssql.Int, postId)
        .input('content', mssql.NVarChar, content)
        .query("INSERT INTO dbo.comments (userId, postId, content) VALUES (@userId, @postId, @content)");
}

async function getComments(postId) {
    const pool = await mssql.connect(dbConfig);
    console.log("HELELEEO");
    const result = await pool.request()
        .input('postId', mssql.Int, postId)
        .query("SELECT * FROM dbo.comments WHERE postId = @postId");
    console.log(result.recordset);
    return result.recordset;
};

module.exports = { addComment, getComments };
