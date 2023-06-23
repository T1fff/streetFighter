import createElement from '../../helpers/domHelper';

function getModalContainer() {
    return document.getElementById('root');
}
function hideModal() {
    const modal = document.getElementsByClassName('modal-layer')[0];
    modal?.remove();
}

function createHeader(title, onClose) {
    const headerElement = createElement({ tagName: 'div', className: 'modal-header' });
    const titleElement = createElement({ tagName: 'span' });
    const closeButton = createElement({ tagName: 'div', className: 'close-btn' });

    titleElement.innerText = title;
    titleElement.style.fontSize = '2.5rem'; 
    titleElement.style.color = '#f5f5f5';
    titleElement.style.textShadow = '2px 2px 1px black';
    titleElement.style.margin = '0 auto';
    titleElement.style.fontFamily = "'VT323', monospace ";
    titleElement.style.letterSpacing = '3px';

    closeButton.innerText = '×';
    closeButton.style.color = '#f5f5f56b'

    const close = () => {
        hideModal();
        onClose();
    };
    closeButton.addEventListener('click', close);
    headerElement.append(titleElement, closeButton);

    return headerElement;
}

function createModal({ title, bodyElement, onClose }) {
    const layer = createElement({ tagName: 'div', className: 'modal-layer' });
    const modalContainer = createElement({ tagName: 'div', className: 'modal-root' });
    const header = createHeader(title, onClose);

    modalContainer.append(header, bodyElement);
    layer.append(modalContainer);

    /* Modal Container Styles */
    modalContainer.style.background = 'linear-gradient(142deg, rgba(255,201,0,1) 13%, rgba(124,0,0,1) 100%)';
    modalContainer.style.borderRadius = '5px';
    modalContainer.style.boxShadow = '0px 2px 3px black';
    modalContainer.style.color = '#f5f5f5';
    modalContainer.style.fontFamily = "'VT323', monospace ";
    modalContainer.style.fontSize = '2rem';
    modalContainer.style.textAlign = 'center';
    modalContainer.style.paddingBottom = '0.5rem';



    return layer;
}

export default function showModal({ title, bodyElement, onClose = () => {} }) {
    const root = getModalContainer();
    const modal = createModal({ title, bodyElement, onClose });

    root.append(modal);
}
