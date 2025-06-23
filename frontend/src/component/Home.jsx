import {Link} from 'react-router-dom'
function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 text-primary mb-4">Railway Reservation System</h1>
      <p className="lead mb-5">Book, Check, and Cancel your train tickets with ease</p>
      <div className="d-flex justify-content-center gap-3 flex-wrap">
        <Link to="/login" className="btn btn-outline-primary btn-lg">
          Login
        </Link>
        <Link to="/signup" className="btn btn-outline-success btn-lg">
          Signup
        </Link>
        <Link to="/trains" className="btn btn-outline-info btn-lg">
          View Trains
        </Link>
        <Link to="/book" className="btn btn-outline-warning btn-lg">
          Book Ticket
        </Link>
        <Link to="/check" className="btn btn-outline-dark btn-lg">
          Check Ticket
        </Link>
        <Link to="/cancel" className="btn btn-outline-danger btn-lg">
          Cancel Ticket
        </Link>
      </div>
    </div>
  );
}
export default Home;