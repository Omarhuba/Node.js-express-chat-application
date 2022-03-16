let currentTimestamp = Date.now();

setInterval( () => {
  fetch('/messages?after='+currentTimestamp)
    .then(res => res.text())
    .then(html => {
      const messageConrainer = document.querySelector(".messages");
      messageConrainer.innerHTML = html + messageConrainer.innerHTML;
      currentTimestamp = Date.now();
    });
}, 1000);
