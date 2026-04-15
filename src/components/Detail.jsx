import React, { useState, useEffect } from 'react';
import '../Assets/style/style.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Detail() {
  const [news, setNews] = useState({});
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPostAndComments() {
      try {
        // Постты алу
        const postRes = await axios.get(`https://2d5332eb682df4c1.mokky.dev/Posts/${id}`);
        setNews(postRes.data);

        // Осы постқа қатысты пікірлерді алу
        const commRes = await axios.get(`https://2d5332eb682df4c1.mokky.dev/comments?postId=${id}`);
        setComments(commRes.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchPostAndComments();
  }, [id]);

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(`https://2d5332eb682df4c1.mokky.dev/comments`, {
        postId: id,
        text: commentText,
        date: new Date().toLocaleString()
      });
      setComments([...comments, res.data]);
      setCommentText('');
    } catch (err) {
      alert("Пікір жіберу мүмкін болмады");
    }
  };

  return (
    <div className="detail-container">
      <div className="back-bar">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span className="back-icon">←</span> Назад
        </button>
      </div>

      <main className="detail-content">
        <h1 className="detail-title">{news.title}</h1>
        <p className="detail-date">{news.date}</p>

        <div className="detail-image-container">
          <img src={news.image} alt={news.title} className="detail-image" />
        </div>

        <p className="detail-source">
          Источник: <span className="source-link">{news.avtor}</span>
        </p>

        <div className="tag-container">
          <span className="category-tag">{news.category}</span>
        </div>

        {/* --- КОММЕНТАРИЙ БӨЛІМІ --- */}
        <div className="comments-section">
          <h3>Комментарии ({comments.length})</h3>
          
          <form className="comment-form" onSubmit={handleSendComment}>
            <textarea 
              value={commentText} 
              onChange={(e) => setCommentText(e.target.value)} 
              placeholder="Напишите комментарий..."
            />
            <button type="submit">Отправить</button>
          </form>

          <div className="comments-list">
            {comments.map(c => (
              <div key={c.id} className="comment-item">
                <p>{c.text}</p>
                <small>{c.date}</small>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Detail;