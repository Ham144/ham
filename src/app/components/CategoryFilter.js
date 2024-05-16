export default function CategoryFilter(props) {
    const { isChecked, color, handleClicked, id, category } = props;

    return (
        <div className={`flex max-md:grid max-md:grid-cols-3 `} onClick={() => handleClicked(id)}>
            <label htmlFor="kategori1" className={`${color} ${isChecked ? 'border border-4 border-slate-500' : ''}`} >{category}</label>
            <input type="checkbox" id="kategori1" className="hidden" />
        </div>
    );
}