import Navbar from "../components/Navbar";

export default function Learn(){
  const modules=["Budget Basics","Saving","Investing","Credit"];

  return(
    <>
      <Navbar/>
      <div className="container mt-4">
        <h3>Learning Modules</h3>
        <div className="row">
          {modules.map(m=>(
            <div className="col-md-3" key={m}>
              <div className="card-dark mb-3">
                {m}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
