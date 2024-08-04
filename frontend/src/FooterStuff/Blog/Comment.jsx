import React from "react";

const Comment = ({comment}) => {
    return(
        <div>
            <p>{comment.comment}</p>
            <p>By : {comment.username}</p>

        </div>

    )
};

export default Comment;