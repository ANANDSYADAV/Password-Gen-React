import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  // useCallback is used to memorize the method in cache hence it helps in memoization (ie., memory optimization)
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += `~!@#$%^&*()-_+={}[]:|;<>,.?/"`;
    }

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // We can define how much text is to be selected
    // passwordRef.current?.setSelectionRange(1,3);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <h1>Password Generator</h1>
    <div id='total-cover'>
      <div id='input-button'>
        <input type="text" value={password} placeholder='Password' readOnly ref={passwordRef}/>
        <button onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div id='bottom-div'>
        <input type="range" min={6} max={100} value={length} onChange={(e) => { setLength(e.target.value)}} />
        <label>Length: {length}</label>
        <input type="checkbox" defaultChecked={numAllowed} onChange={() => {
          setNumAllowed((prev) => !prev)
        }} />
        <label>Number</label>
        <input type="checkbox" defaultChecked={charAllowed} onChange={() => {
          setCharAllowed((prev) => !prev)
        }} />
        <label>Character</label>
      </div>
    </div>
    </>
  )
}

export default App