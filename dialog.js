function createModal(message, type, callback) {
  
  const existing = document.getElementById('customModal');
  if (existing) existing.remove();

  
  const modal = document.createElement('div');
  modal.id = 'customModal';
  modal.style.position = 'fixed';
  modal.style.inset = '0';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.background = 'rgba(0,0,0,0.5)';
  modal.style.zIndex = '9999';

  
  const box = document.createElement('div');
  box.style.background = '#121212';
  box.style.padding = '24px 32px';
  box.style.borderRadius = '12px';
  box.style.maxWidth = '90%';
  box.style.width = '360px';
  box.style.boxShadow = '0 10px 30px rgba(250,250,250,0.1)';
  box.style.textAlign = 'center';
  box.style.fontFamily = 'sans-serif';
  box.style.animation = 'fadeIn 0.2s ease';

  const msg = document.createElement('p');
  msg.textContent = message;
  msg.textContent.color = '#ffffff';
  msg.style.marginBottom = '16px';

  
  const btnGroup = document.createElement('div');
  btnGroup.style.display = 'flex';
  btnGroup.style.justifyContent = 'center';
  btnGroup.style.gap = '10px';

 
  const okBtn = document.createElement('button');
  okBtn.textContent = type === 'alert' ? 'OK' : 'Yes';
  okBtn.style.background = '#00b894'
  okBtn.style.color = '#fff';
  okBtn.style.border = 'none';
  okBtn.style.padding = '10px 18px';
  okBtn.style.borderRadius = '6px';
  okBtn.style.cursor = 'pointer';

  okBtn.onclick = () => {
    modal.remove();
    if (callback) callback(true);
  };

  btnGroup.appendChild(okBtn);

  
  if (type === 'confirm') {
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.background = '#e5e7eb';
    cancelBtn.style.color = '#111827';
    cancelBtn.style.border = 'none';
    cancelBtn.style.padding = '10px 18px';
    cancelBtn.style.borderRadius = '6px';
    cancelBtn.style.cursor = 'pointer';

    cancelBtn.onclick = () => {
      modal.remove();
      if (callback) callback(false);
    };

    btnGroup.appendChild(cancelBtn);
  }

  box.appendChild(msg);
  box.appendChild(btnGroup);
  modal.appendChild(box);
  document.body.appendChild(modal);
}


function alertCustom(message) {
  createModal(message, 'alert', null);
}


function confirmCustom(message, callback) {
  createModal(message, 'confirm', callback);
}


