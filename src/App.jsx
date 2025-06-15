import { useState, useCallback, useEffect,useRef } from 'react'
import './App.css'

function App() {

  const [length,setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword] = useState("");

  // useCallback(fn, dependencies) 
  // here dependencies are those var or state var whose will change call the fn function
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?";

    for(let i=1;i<length;i++){
      let idx = Math.floor(Math.random()*str.length);
      pass += str.charAt(idx);

    }
    setPassword(pass);
    
  },[length,numberAllowed,charAllowed,setPassword]);


  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,charAllowed,setPassword,passwordGenerator])

  const copyToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectRange(0,101)
    window.navigator.clipboard.writeText(password);
  },[password])

  const passwordRef = useRef(null);

  return (
    <>
      <h1 className='text-white text-4xl text-center'>Password Generator</h1>
      <div className='mx-auto bg-gray-700 w-[65vw] rounded-2xl text-orange-400 text-[18px]'>
        <div className='mx-auto pt-4 w-full flex justify-center items-center'>
          <input 
          type="text" 
          value={password}
          placeholder='password'
          readOnly
          ref={passwordRef}
          className='p-3 w-[60%] rounded-2xl bg-gray-100 outline-0'
          />
          <button className='h-full bg-emerald-700 text-white p-2 mx-1 rounded-2xl text-xl'
          onClick={copyToClipBoard}
          >Copy</button>
        </div>
        <div className='flex wrap gap-4 p-2'>
          <div>
            <input
              type="range"
              value={length}
              id="range"
              min={0}
              max={50}
              onChange={(e)=>setLength(e.target.value)}
            />
          <label htmlFor="range">Length: {length}</label>
          </div>
          <div>
          <input
            type="checkbox"
            defaultChecked = {numberAllowed}
            id="number"
            onChange={() => {
                setNumberAllowed(prev => !prev);
            }}
          />
          <label htmlFor="number">Number</label>
          </div>
          <div>
          <input
            type="checkbox"
            defaultChecked = {charAllowed}
            id="char"
            onChange={() => {
                setCharAllowed(prev => !prev);
            }}
          />
          <label htmlFor="char">Character</label>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App;
