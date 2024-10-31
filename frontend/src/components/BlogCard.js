import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = () => {
  return (
    <div className='col-3'>
      <div className="blog-card">
        <div className="card-image">
          <img src="images/blog-1.jpg" className='img-fluid' alt="blog" />
        </div>
        <div className="blog-content">
          <p className='date'>31-10-2024</p>
          <h5 className='title'>A beautifull Sunday Morning</h5>
          <p className='desc'>Mua hàng trên Shopee luôn là một trải nghiệm ấn tượng. Dù bạn đang có nhu cầu mua bất kỳ mặt hàng</p>
          <Link to="/" className='button'>Read More</Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard