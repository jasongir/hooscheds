export default function Home() {
  return (
    <>
      <div className="p-3 text-center bg-light">
        <h1 className="mb-3">Welcome to Hooscheds</h1>
        <h5 className="mb-3">Course Search</h5>
      </div>

      <div className="input-group">
        <div className="form-outline">
          <input type="search" id="form1" className="form-control" />
          <label className="form-label" htmlFor="form1">
            Search
          </label>
        </div>
        <button type="button" className="btn btn-primary">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </>
  );
}
