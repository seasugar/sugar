import './App.css';
import React, {useState} from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  const fetchData = async () => {
    try {
      const number = parseInt (inputValue, 10);
      if(isNaN(number)) {
        alert("Enter a valid id");
        return;
      }

      const apiUrl = `https://jsonplaceholder.typicode.com/posts/${number}`;

      const res = await fetch(apiUrl);
      const data = await (res.json());
      
      setResponse(data);

      setHistory((prevHistory) => [
        ...prevHistory,
        {input:inputValue, output:data}
      ]);
      setInputValue('');

    } catch (error) {
      alert ("Failed");
      console.error(error);
    }
  };

  const reset = () => {
    setInputValue('');
    setResponse('');
    setHistory([]);
  };

  return (
    <div style={{ padding: '20px' }}>
        <h1>React API Request App</h1>

        {/* 입력 필드 */}
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a number"
            style={{ padding: '5px', marginRight: '10px' }} />
          <button onClick={fetchData}>Fetch Data</button>
        </div>

        {/* 응답 출력 */}
        {response && (
          <div style={{ marginTop: '20px' }}>
            <h2>API Response:</h2>
            <p>{JSON.stringify(response)}</p>
          </div>
        )}

        {/* 히스토리 출력 */}
        {history.length > 0 && (
          <div>
            <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Input</th>  {/* 입력값 컬럼 추가 */}
                  <th>User ID</th>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Body</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr key={index}>
                    <td>{item.input}</td>  {/* 입력값을 첫 번째 컬럼에 표시 */}
                    <td>{item.output.userId}</td>
                    <td>{item.output.id}</td>
                    <td>{item.output.title}</td>
                    <td>{item.output.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 화면 초기화 버튼 */}
        <button onClick={reset} style={{ marginTop: '20px', padding: '5px 10px' }}>
          Reset
        </button>
      </div>   
  );
}

export default App;
