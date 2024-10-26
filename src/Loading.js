import "./Loading.css";
import animation from "./loading.gif";

function Loading(props) {
  return (
    <>
      <section className="Loading">
        <img src={animation} />
      </section>
    </>
  );
}

export default Loading;
