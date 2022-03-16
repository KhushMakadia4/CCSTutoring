export default function Create() {
  return (
    <div>

        <h1>CREATE A POST</h1>
        <hr></hr>
        <br></br>
      <div className="mb-3 pt-0">
        <input
          id="dayNum"
          type="text"
          placeholder="Title"
          className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
        />
      </div>
      <div className="mb-3 pt-0">
        <input
          id="dayName"
          type="text"
          placeholder="Description"
          className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
        />
      </div>
    </div>
  );
}
