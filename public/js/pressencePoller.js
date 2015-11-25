self.addEventListener('message', (event) => {
  self.postMessage('yo');
}, false);
