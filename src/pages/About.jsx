import { Link, Outlet } from "react-router";

function About() {
  return (
    <>
      <div>General About</div>
      <div className="my-3">
        <Link
          className="btn btn-sm bg-indigo-700 text-white"
          to={"/about/company"}
        >
          about company
        </Link>
        <Link className="btn btn-sm bg-indigo-700 text-white" to={"/about/me"}>
          about me
        </Link>
      </div>
      <Outlet />
    </>
  );
}

export default About;
