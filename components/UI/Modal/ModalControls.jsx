
export default function ModalControls ({size, index, setIndex, children}) {
    const disableNextButton = index + 1 >= size;
    const disableBackButton = index == 0;

    const addIndex = () => setIndex(index + 1);
    const subIndex = () => setIndex(index - 1);

    return <div className="modal-controls">
        {children}
    <button disabled = { disableBackButton } onClick={subIndex}> Back </button>
    {index + 1 } / {size}
    <button disabled = { disableNextButton } onClick={addIndex}> Next </button>
    </div>
}