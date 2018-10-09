const sock = new SockJS('http://127.0.0.1:3000/echo');

sock.onopen = function() {
    // window.alert('open');
};

sock.onmessage = function(e) {
    if (e.data === 'change') {
        window.location.reload();
    }
    // sock.close();
};

sock.onclose = function() {
    window.alert('close');
};