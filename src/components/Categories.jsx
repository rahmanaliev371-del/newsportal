import React from 'react';
import { Link } from 'react-router-dom';
import '../Assets/style/style.css';

function Categories() {
  const categoryData = [
    { id: 1, name: 'Все новости', icon: '🏠', slug: 'all' },
    { id: 2, name: 'Футбол', icon: '⚽', slug: 'football' },
    { id: 3, name: 'Баскетбол', icon: '🏀', slug: 'basketball' },
    { id: 4, name: 'Регби', icon: '🏈', slug: 'rugby' },
    { id: 5, name: 'Хоккей', icon: '🏒', slug: 'hockey' },
    { id: 6, name: 'Киберспорт', icon: '🎮', slug: 'esports' },
    { id: 7, name: 'Бокс', icon: '🥊', slug: 'box' },
    { id: 8, name: 'Mix Fight', icon: '🛑', slug: 'mmath' },
  ];

  return (
    <div className="categories-wrapper">
      <div className="orange-bar">Категории</div>
      <div className="grid-container">
        {categoryData.map((item) => (
          <Link to={`/?category=${item.slug}`} key={item.id} className="category-card-link">
            <div className="card">
              <div className="icon">{item.icon}</div>
              <p>{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;