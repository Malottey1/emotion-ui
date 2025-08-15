// app/src/state/emotionMachine.ts
export type Mood = 'joy'|'neutral'|'sad'|'angry'|'fear'|'surprise'|'disgust'
export function moodToTheme(m: Mood){
  switch(m){
    case 'joy': return 'bg-gradient-to-br from-yellow-100 to-amber-200'
    case 'sad': case 'fear': return 'bg-gradient-to-br from-slate-100 to-blue-200'
    case 'angry': return 'bg-neutral-100'
    case 'surprise': return 'bg-gradient-to-br from-violet-100 to-fuchsia-200'
    default: return 'bg-white'
  }
}