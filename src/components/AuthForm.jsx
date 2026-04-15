import { useState } from "react"; // React-тан тек useState қалады
import { useNavigate } from "react-router-dom"; // useNavigate осы жерден келуі керек
import axios from "axios";

function AuthForm({ mode }) {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const url = `https://2d5332eb682df4c1.mokky.dev/${mode === 'register' ? 'register' : 'auth'}`;
      const { data } = await axios.post(url, formData);
      localStorage.setItem('user', JSON.stringify(data.data || data));
      alert(mode === 'register' ? 'Тіркелу сәтті!' : 'Қош келдіңіз!');
      navigate('/');
    } catch (err) {
      alert('Қате: ' + (err.response?.data?.message || 'Деректерді тексеріңіз'));
    }
  };

  
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{mode === 'register' ? 'Регистрация' : 'Войти'}</h2>
        {mode === 'register' && (
          <input type="text" placeholder="Аты-жөніңіз" className="auth-input" 
          onChange={e => setFormData({...formData, fullName: e.target.value})} />
        )}
        <input type="email" placeholder="Email" className="auth-input" 
        onChange={e => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Құпия сөз" className="auth-input" 
        onChange={e => setFormData({...formData, password: e.target.value})} />
        <button className="auth-submit" onClick={handleSubmit}>
          {mode === 'register' ? 'Тіркелу' : 'Кіру'}
        </button>
      </div>
    </div>
  );
}


export default AuthForm;