export default function CategoryFilter(props) {
    const { categories, setCategories, color } = props;

    return (
        <div className="flex max-md:grid max-md:grid-cols-3 ">
            <label htmlFor="kategori1" className="violet-blue" >contoh</label>
            <input type="checkbox" id="kategori1" className="hidden" />

            <input type="checkbox" id="kategori7" className="hidden" />
        </div>
    );
}