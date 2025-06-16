export const convertToHtml = (text) => {
    if(!text) return '';
    return text
    // tel: 링크 변환 (숫자만 있는 형식)
    .replace(/tel:(\d{2,4}-?\d{3,4}-?\d{4})/gi, (match, p1) => {
      return `<a href="tel:${p1}" style="color: #1976d2;">${p1}</a>`;
    })
    // mailto: 링크 변환
    .replace(/mailto:([^\s]+)/gi, (match, p1) => {
      return `<a href="mailto:${p1}" style="color: #1976d2;">${p1}</a>`;
    })
    // http / https 링크 변환
    .replace(/(https?:\/\/[^\s]+)/gi, (match) => {
      return `<a href="${match}" target="_blank" rel="noopener noreferrer" style="color: #1976d2;">${match}</a>`;
    })
    // 줄바꿈을 <br>로 변환
    .replace(/\n/g, '<br/>');
}