export default function CategoryFilter(props) {
    const { } = props;

    return (
        <div className="flex max-md:grid max-md:grid-cols-3 ">
            <label htmlFor="kategori1" className="violet-blue" >contoh</label>
            <input type="checkbox" id="kategori1" className="hidden" />

            <label htmlFor="kategori2" className="cyan-blue">Cyan to Blue</label>
            <input type="checkbox" id="kategori2" className="hidden" />

            <label htmlFor="kategori3" className="green-blue">Green to Blue</label>
            <input type="checkbox" id="kategori3" className="hidden" />

            <label htmlFor="kategori4" className="purple-pink">Purple to Pink</label>
            <input type="checkbox" id="kategori4" className="hidden" />

            <label htmlFor="kategori5" className="pink-orange">Pink to Orange</label>
            <input type="checkbox" id="kategori5" className="hidden" />

            <label htmlFor="kategori6" className="teal-lime">Teal to Lime</label>
            <input type="checkbox" id="kategori6" className="hidden" />

            <label htmlFor="kategori7" className="red-yellow">Red to Yellow</label>
            <input type="checkbox" id="kategori7" className="hidden" />
        </div>
    );
}