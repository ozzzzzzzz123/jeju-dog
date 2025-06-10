/* common.js */
document.addEventListener('DOMContentLoaded', () => {
  const BGM_SRC = 'https://github.com/ozzzzzzzz123/jeju-dog/blob/main/back.mp3';      // 음악 파일 경로
  const KEY     = 'bgmPos';        // localStorage 키

  // 1) 오디오 엘리먼트 생성
  const audio = new Audio(BGM_SRC);
  audio.loop = true;               // 무한 반복
  audio.volume = 0.6;              // 초기 볼륨 (원하는 대로)
  document.body.appendChild(audio);

  // 2) 이전 위치 복원
  const savedTime = localStorage.getItem(KEY);
  if (savedTime) audio.currentTime = parseFloat(savedTime);

  // 3) 자동 재생 시도
  const playBgm = () => audio.play().catch(() => {
    /* 브라우저가 사용자 제스처 없이 재생을 막을 때 */
    const btn = document.createElement('button');
    btn.textContent = '▶ 배경음악 켜기';
    Object.assign(btn.style, {
      position:'fixed', bottom:'20px', right:'20px',
      padding:'10px 16px', fontSize:'1rem', zIndex:9999
    });
    btn.onclick = () => { audio.play(); btn.remove(); };
    document.body.appendChild(btn);
  });
  playBgm();

  // 4) 페이지를 떠나기 직전에 위치 저장
  window.addEventListener('pagehide', () => {
    localStorage.setItem(KEY, audio.currentTime);
  });
});
