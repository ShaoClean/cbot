/**
 * epg解密完成回调
 */
window.electronAPI.showTranslateResult((event, resList) => {
    console.log('resList', resList);
    const body = document.querySelector('body');

    const div = document.createElement('div');
    const p = document.createElement('p');

    p.innerText = '翻译结果 :' + resList;
    div.appendChild(p);
    body.appendChild(div);
});
