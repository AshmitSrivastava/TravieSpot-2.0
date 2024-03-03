import React from 'react'
import './ReviewForm.css'


const ReviewForm = () => {
  return (
    <div>
        <>
        <div className="review_form_content">Your Reviews Matter to us! <br/>
        <p id='review_form_content_p'> Please help us improve our website with your suggestions!</p><br />
        </div>
        <div class="review_maincontainer">
    <video src="pexels-cottonbro-9694804 (2160p).mp4" autoplay loop muted/>
        <div class="review_container">
            <h2 id='review_h2'>Please Leave your Review!</h2>
            <form action="https://formspree.io/f/xayrqywq" method="POST" id='review_form_form'>
                <div class="review_box">
                    <input type="text" required name="username"/>
                    <label for="username" >Username</label>
                </div>

                <div class="review_box">
                    <input type="email"  required name="email"/>
                    <label for="email">Email</label>
                </div>

                <div class="review_box">
                    <textarea id = "review_textarea"name="review" cols="35" rows="10" placeholder="Start Typing here🤗" required></textarea>

                </div>

                <button id='review_submit_button'>Submit</button>


            </form>

        </div>
        </div>
        
        
        </>
    </div>
  )
}

export default ReviewForm
