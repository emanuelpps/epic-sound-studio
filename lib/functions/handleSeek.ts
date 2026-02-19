export default function handleSeek(
  e: React.ChangeEvent<HTMLInputElement>,
  duration: number,
) {
  const newProgressPercent = parseFloat(e.target.value);
  const newTime = (newProgressPercent / 100) * duration;

  const audio = document.querySelector("audio") as HTMLAudioElement;
  if (audio) {
    audio.currentTime = newTime;
  }
}
