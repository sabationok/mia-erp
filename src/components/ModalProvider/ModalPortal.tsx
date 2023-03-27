import ReactDOM from 'react-dom';

interface ModalPortalProps {
  portalId?: string;
  children: React.ReactNode;
}
const ModalPortal = (props: ModalPortalProps) => {
  const modalRef = document.getElementById(props?.portalId || 'modal');

  return modalRef ? ReactDOM.createPortal(props.children, modalRef) : null;
};

export default ModalPortal;
