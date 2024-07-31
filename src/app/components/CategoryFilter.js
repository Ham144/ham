export default function CategoryFilter(props) {
    const { isChecked, color, handleClicked, category } = props;

    return (
        <button className={`lg:flex max-md:rounded-md bg-transparent border-none max-md:p-2 `} onClick={() => handleClicked(category)}>
            <label htmlFor="kategori1" className={`${color} ${isChecked ? ' border-4 border-yellow-300 ' : ''}   max-md:w-full`} >{category}</label>
            <input type="checkbox" id="kategori1" className="hidden " />
        </button>
    );
}