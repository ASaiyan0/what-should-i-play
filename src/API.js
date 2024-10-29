import { useState } from "react";
import "./API.css";

function API(props) {
  const [userInput, setUserInput] = useState("");
  function handleUserInput(e) {
    setUserInput(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (userInput == "") {
      return;
    } else if (userInput.length < 40) {
      alert("Please enter a valid 40 character token");
      return;
    } else {
      props.onKey(userInput);
    }
  }
  return (
    <>
      <section className="API">
        <section className="API-instructions">
          Enter your{" "}
          <span
            className="API-tooltip"
            data-text="Your API token is a 40 character alphanumeric string provided on your Download page (only for premium users)"
          >
            API authentication token
          </span>{" "}
          below:
        </section>
        <br />
        <section className="API-entry">
          <form className="API-form" id="form" onSubmit={handleSubmit}>
            <input
              className="API-textBox"
              type="text"
              maxLength={40}
              id="textBox"
              name="textBox"
              onChange={handleUserInput}
              value={userInput}
            />
            &nbsp;{" "}
            <button className="API-submit" id="submit">
              Submit
            </button>
          </form>
        </section>
      </section>
    </>
  );
}

export default API;
