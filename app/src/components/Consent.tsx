// app/src/components/Consent.tsx
import { useState, useEffect } from 'react'

export default function Consent({ onAccept }:{ onAccept:()=>void }){
const [seen,setSeen]=useState(false)
useEffect(()=>{ setSeen(localStorage.getItem('consent')==='yes') },[])
if(seen) return null
return (
<div className="fixed inset-x-0 bottom-0 p-4 bg-white/90 backdrop-blur shadow">
<p className="text-sm">We use your webcam **locally** to adapt the interface. No images are stored or sent. You can pause anytime.</p>
<div className="mt-2 flex gap-2">
<button className="px-3 py-1 rounded-xl bg-black text-white" onClick={()=>{localStorage.setItem('consent','yes'); onAccept();}}>I agree</button>
<button className="px-3 py-1 rounded-xl" onClick={()=>{location.href='about:blank'}}>
Decline
</button>
</div>
</div>
)
}