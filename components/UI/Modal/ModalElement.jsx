

export default function ModalElement({title, image, description}) {

    return <div className="modal-element">
      <h2>{ title }</h2>
      <p>{ image }</p>
      <p>{ description }</p>
    </div>
}