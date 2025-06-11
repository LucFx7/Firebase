import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function ChatAI() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post(
        'https://ai.hackclub.com/chat/completions',
        { messages: newMessages },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const botMessage = response.data.choices[0].message;
      setMessages((prev) => [...newMessages, botMessage]);
    } catch (error) {
      alert('Error al comunicarse con la IA: ' + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Chat con IA 🤖</h2>
      <div style={styles.chatBox}>
        {messages.map((m, i) => (
          <p
            key={i}
            style={{
              ...styles.message,
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: m.role === 'user' ? '#0b93f6' : '#e5e5ea',
              color: m.role === 'user' ? 'white' : 'black',
              borderRadius: m.role === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
            }}
          >
            {m.content}
          </p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Escribe algo..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Enviar
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 20,
    border: '1px solid #ddd',
    borderRadius: 12,
    backgroundColor: '#fafafa',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
  },
  chatBox: {
    flexGrow: 1,
    height: 320,
    overflowY: 'auto',
    padding: 15,
    border: '1px solid #ccc',
    borderRadius: 12,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  message: {
    maxWidth: '70%',
    padding: '10px 15px',
    fontSize: 15,
    lineHeight: 1.4,
    wordBreak: 'break-word',
  },
  inputArea: {
    marginTop: 15,
    display: 'flex',
    gap: 10,
  },
  input: {
    flexGrow: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 20,
    border: '1px solid #ccc',
    outline: 'none',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  button: {
    padding: '10px 18px',
    backgroundColor: '#0b93f6',
    border: 'none',
    borderRadius: 20,
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default ChatAI;

