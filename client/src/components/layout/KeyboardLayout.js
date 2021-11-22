import React, { useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";

const KeyboardLayout = () => {
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();

  return (
    <div>
      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        layoutName={layout}
        useTouchEvents={true}
        physicalKeyboardHighlight={true}
      />
    </div>
  );
};

export default KeyboardLayout;
