import {useState} from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
      e.preventDefault();

      const authObject = { 'Project-ID': process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID, 'User-Name': username, 'User-Secret': password};  
      
      try {
        // Login
        await axios.get(process.env.REACT_APP_AXIOS_URL, {
          headers: authObject
        });
        // Successfull
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        // Reloaden damit der localStorage gesaved wird!
        window.location.reload();
      } catch (error) {
        setError('Oops, die Eingabe Ihrer Benutzerdaten sind falsch!');
      }
  }

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Ollis Chat Anwendung</h1>
        <form onSubmit={handleSubmit}>
          <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              placeholder="Benutzername"
              required
          />
          <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Passwort"
              required
          />
          <div align="center">
            <button type="submit" className="button">
              <span>Login Chat</span>
            </button>
          </div>
          <h2 className="error">{error}</h2>
        </form>
      </div>
    </div>
  )
}

export default LoginForm;