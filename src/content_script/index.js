console.log('HELLO WORLD');
// window.alert('HELLO WORLD');

// window.onload = () => {
//     console.log('LOADED');
//     // document.body.style.backgroundColor = "orange";
// };

// window.location.reload();
// window.addEventListener('load', () => {
//     console.log('loaded');
// });
const script = document.createElement('script');
script.textContent = `window.addEventListener('load', () => {
    console.log('loaded');
});`;
document.head.appendChild(script);