/* common.js  (HTML <head> 에 <script src="common.js" defer> 한 줄만 있으면 됨) */
document.addEventListener('DOMContentLoaded', () => {
  const BGM_SRC = 'back.mp3';  // 또는 'media/back.mp3'
  const KEY     = 'bgmPos';

  const audio = new Audio(BGM_SRC);
  audio.loop   = true;
  audio.volume = 0.6;
  audio.autoplay = true;       // ▶ 자동재생 요청
  document.body.appendChild(audio);

  // 이전 위치 복원
  const saved = localStorage.getItem(KEY);
  if (saved) audio.currentTime = parseFloat(saved);

  // 자동재생이 브라우저 정책 때문에 막히면(무음으로라도) 일단 재생해 둠
  audio.play().catch(() => {
    audio.muted = true;        // ① 일단 음소거 상태로 재생 허용
    audio.play().finally(() => {
      // ② 사용자가 처음 클릭/스크롤하면 음량 복구
      const unmute = () => { audio.muted = false; window.removeEventListener('pointerdown', unmute); };
      window.addEventListener('pointerdown', unmute, { once: true });
    });
  });

  // 페이지 떠날 때 현재 위치 저장
  window.addEventListener('pagehide', () =>
    localStorage.setItem(KEY, audio.currentTime)
  );
});

