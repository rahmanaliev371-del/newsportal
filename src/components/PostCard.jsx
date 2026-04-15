import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function PostCard({ post }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favs')) || [];
    setIsFav(favs.some(i => i.id === post.id));
  }, [post.id]);

  const toggle = (e) => {
    e.preventDefault();
    let favs = JSON.parse(localStorage.getItem('favs')) || [];
    if (isFav) favs = favs.filter(i => i.id !== post.id);
    else favs.push(post);
    localStorage.setItem('favs', JSON.stringify(favs));
    setIsFav(!isFav);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="post-card-wrapper">
      <Link to={`/detail/${post.id}`} className="post-link">
        <div className="post">
          <h1 className="title">{post.title}</h1>
          <p className="category-tag">{post.category}</p>
        </div>
      </Link>
      <button onClick={toggle} className="fav-btn" style={{ color: isFav ? '#ff6b00' : '#ccc' }}>
        {isFav ? '★' : '☆'}
      </button>
    </div>
  );
}
export default PostCard;