import { useState } from "react";
import "./Input.css";

function Input(props) {
  const [userInput, setUserInput] = useState("");
  function handleUserInput(e) {
    setUserInput(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (userInput == "") {
      return;
    } else if (userInput.length < 25) {
      alert("Please enter a valid 25 character ID");
      return;
    } else {
      props.onID(userInput);
    }
  }
  return (
    <>
      <section className="Input">
        <section className="Input-instructions">
          Enter your{" "}
          <span
            className="Input-tooltip"
            data-text="Your user ID is a 26 character alphanumeric string included in your unique URL:
          https://www.pricecharting.com/user/[userIDisHERE]"
          >
            PriceCharting user ID
          </span>{" "}
          below:
        </section>
        <br />
        <section className="Input-entry">
          <form className="Input-form" id="form" onSubmit={handleSubmit}>
            <input
              className="Input-textBox"
              type="text"
              maxLength={26}
              id="textBox"
              name="textBox"
              onChange={handleUserInput}
              value={userInput}
            />
            &nbsp;{" "}
            <button className="Input-submit" id="submit">
              Submit
            </button>
          </form>
        </section>
      </section>
    </>
  );
}

export default Input;
