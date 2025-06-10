/* common.js */
document.addEventListener('DOMContentLoaded', () => {
  const BGM_SRC = 'back.mp3';   // 또는 'media/back.mp3'
  const KEY     = 'bgmPos';

  const audio = new Audio(BGM_SRC);
  audio.loop   = true;
  audio.volume = 0.6;
  document.body.appendChild(audio);

  const saved = localStorage.getItem(KEY);
  if (saved) audio.currentTime = parseFloat(saved);

  const tryPlay = () =>
    audio.play().catch(() => {
      const btn = document.createElement('button');
      btn.textContent = '▶ 배경음악 켜기';
      Object.assign(btn.style, {
        position: 'fixed', bottom: '20px', right: '20px',
        padding: '10px 16px', fontSize: '1rem', zIndex: 9999
      });
      btn.onclick = () => { audio.play(); btn.remove(); };
      document.body.appendChild(btn);
    });

  tryPlay();

  window.addEventListener('pagehide', () =>
    localStorage.setItem(KEY, audio.currentTime)
  );
});
