export default function CategoryFilter(props) {
    const { isChecked, color } = props;

    return (
        <div className={`flex max-md:grid max-md:grid-cols-3 `}>
            <label htmlFor="kategori1" className={`${color} ${isChecked ? 'border border-4 border-slate-500' : ''}`} >contoh</label>
            <input type="checkbox" id="kategori1" className="hidden" />
        </div>
    );
}