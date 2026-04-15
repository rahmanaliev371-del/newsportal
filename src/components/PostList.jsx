import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from './PostCard';

function PostList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const cat = searchParams.get('category') || 'all';

  useEffect(() => {
    setLoading(true);
    if (cat === 'favorites') {
      const saved = JSON.parse(localStorage.getItem('favs')) || [];
      setNews(saved);
      setLoading(false);
    } else {
      let url = 'https://2d5332eb682df4c1.mokky.dev/Posts';
      if (cat !== 'all') url += `?category=${cat}`;
      axios.get(url).then(res => {
        setNews(res.data);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [cat]);

  return (
    <div className="main-content">
      <h2 className="page-title">{cat === 'favorites' ? 'Мои избранные' : 'Новости'}</h2>
      <div className="posts-grid">
        {news.length > 0 ? news.map(p => <PostCard key={p.id} post={p} />) : <p>Бос...</p>}
      </div>
    </div>
  );
}
export default PostList;