import showModal from './modal';

export default function showWinnerModal(fighter) {
    showModal({
        title: 'WINNER!',
        bodyElement: fighter.name,
        onClose: () => {
            document.location.href="/";
          }
      });
}
