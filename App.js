import React, { useState, useEffect } from 'react';
const ACCESS_CODE = 'SEERS2024';
const Tabs = { TODAY: 'Today', CAL: 'Calendar', TASKS: 'Tasks', REM: 'Reminders' };
export default function App() {
  const [code, setCode] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [active, setActive] = useState(Tabs.TODAY);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')||'[]'));
  const [newTask, setNewTask] = useState('');
  const [bell, setBell] = useState(false);
  useEffect(()=>{ const t=setInterval(()=>{ const n=new Date(); if(n.getMinutes()===0&&n.getSeconds()===0){setBell(true);setTimeout(()=>setBell(false),5000);} },1000); return ()=>clearInterval(t); },[]);
  useEffect(()=>{ localStorage.setItem('tasks', JSON.stringify(tasks)); },[tasks]);
  const addTask = ()=>{ if(newTask.trim()) { setTasks([...tasks,{id:Date.now(),text:newTask,done:false}]); setNewTask(''); }};
  const toggleTask=id=> setTasks(tasks.map(t=>t.id===id?{...t,done:!t.done}:t));
  const delTask=id=> setTasks(tasks.filter(t=>t.id!==id));
  if(!unlocked){
    return(<div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 p-4 text-center"><h1 className="text-3xl font-bold mb-4">Seers' Day Planner</h1><input className="border p-2 rounded mb-2" placeholder="Access Code" value={code} onChange={e=>setCode(e.target.value)}/><button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={()=>{if(code===ACCESS_CODE) setUnlocked(true); else alert('Invalid code');}}>Enter</button></div>);
  }
  return(<div className="min-h-screen flex flex-col">{bell && <div className="bg-yellow-200 text-center py-1">🔔 Bell Reminder</div>}<header className="bg-indigo-600 text-white p-3 flex justify-between"><span className="font-bold">Seers' Day Planner</span><nav className="space-x-2">{Object.values(Tabs).map(t=>(<button key={t} className={active===t?'underline':''} onClick={()=>setActive(t)}>{t}</button>))}</nav></header><main className="flex-1 p-4">{active===Tabs.TODAY && <Today />}...
}
const Today=()=>{ const cycles=[{range:'12:00–3:24',label:'ANALYZE'},{range:'3:25–6:50',label:'RELAX'},{range:'6:51–10:16',label:'CREATE'},{range:'10:17–1:41',label:'PRODUCE'},{range:'1:42–5:07',label:'MONEY'},{range:'5:08–8:33',label:'PATIENCE'},{range:'8:34–11:59',label:'RELAX'}]; return(<div><h2 className="text-lg font-semibold mb-2">Today's Emotional Cycles</h2><ul className="space-y-1">{cycles.map((c,i)=>(<li key={i}><strong>{c.range}</strong> – {c.label}</li>))}</ul></div>); }
const Calendar=()=>{ const now=new Date(); const days=new Date(now.getFullYear(),now.getMonth()+1,0).getDate(); return(<div><h2 className="text-lg font-semibold mb-2">{now.toLocaleString('default',{month:'long',year:'numeric'})}</h2><div className="grid grid-cols-7 gap-2 text-center">{Array.from({length:days},(_,i)=>(<div key={i} className="border py-1">{i+1}</div>))}</div></div>); }
const Tasks=({tasks,newTask,setNewTask,addTask,toggleTask,delTask})=>(<div><h2 className="text-lg font-semibold mb-2">Tasks</h2><div className="flex mb-2"><input className="border flex-1 p-1" value={newTask} onChange={e=>setNewTask(e.target.value)} placeholder="New task"/><button className="bg-indigo-600 text-white px-2" onClick={addTask}>Add</button></div><ul className="space-y-1">{tasks.map(t=>(<li key={t.id} className="flex justify-between"><span className={t.done?'line-through':''} onClick={()=>toggleTask(t.id)}>{t.text}</span><button onClick={()=>delTask(t.id)}>🗑️</button></li>))}</ul></div>);
const Reminders=()=>(<div><h2 className="text-lg font-semibold mb-2">Reminders</h2><p>Hourly bell + task alerts enabled.</p></div>);
