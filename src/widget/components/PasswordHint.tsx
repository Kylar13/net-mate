import * as React from "react";

import { Header } from "./Header";
import { PasswordHeader, Lock } from "../../assets";

interface Props {
  style?: React.CSSProperties;
  onBackPressed: () => void;
}

export const PasswordHint = (props: Props) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const [passwordHint, setPasswordHint] = React.useState("No password set");
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  React.useEffect(() => {
    chrome.storage.sync.get(["passwordHint"], async (result) => {
      if (!result.passwordHint.hint) {
        setPasswordHint("No password set");
        return;
      }
      setPasswordHint(result.passwordHint.hint);
    });
  }, []);

  return (
    <div style={{ ...props.style, flexDirection: "column" }}>
      <button
        style={{
          display: "flex",
          border: "none",
          outline: "none",
          marginLeft: 16,
          paddingTop: 16,
          fontSize: 16,
          fontFamily: "Rubik",
          backgroundColor: "transparent",
        }}
        onClick={props.onBackPressed}
      >{`<  Back to Menu`}</button>
      <Header style={{ display: "flex", paddingTop: 20, paddingBottom: 20 }} img={PasswordHeader} />
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
      <p
        style={{
          marginBottom: 32,
          fontFamily: "Rubik",
          fontSize: 16,
          color: "white",
          marginLeft: 56,
          marginRight: 56,
        }}
      >
        Remember to show it to no one, and change them often!
      </p>
      <div
        style={{
          height: 182,
          marginBottom: isPressed ? 20 : 16,
          backgroundColor: passwordVisible ? "#D44A85" : "#990F4B",
          borderRadius: 9,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 56,
          marginRight: 56,
        }}
      >
        {passwordVisible ? (
          <p style={{ fontFamily: "Rubik", fontSize: 24, color: "white" }}>{passwordHint}</p>
        ) : (
          <img src={Lock} />
        )}
      </div>
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "blue",
          height: 48,
          marginBottom: isPressed ? 20 : 24,
          borderRadius: 5,
          fontFamily: "Rubik",
          fontSize: 16,
          color: "white",
          boxShadow: isPressed ? "0px 0px 0px #9E9E9E" : "0px 4px 0px #140374",
          border: "none",
          outline: "none",
          marginLeft: 56,
          marginRight: 56,
        }}
        onMouseDown={() => {
          setIsPressed(true);
          setPasswordVisible(true);
        }}
        onMouseUp={() => {
          setIsPressed(false);
          setPasswordVisible(false);
        }}
      >
        Show me a hint!
      </button>
    </div>
  );
};
