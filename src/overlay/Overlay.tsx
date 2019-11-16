import * as React from "react";
import { Modal } from "./components/Modal";
import { Core } from "../core/core";

export const Overlay = (props) => {

  let core;

  const [visible, setVisibility] = React.useState(false);
  
  React.useEffect(() =>{
    core = new Core();
    core.registerListener((info: any) => {
        console.log(info);
        setVisibility(true);
    });
    core.start();
  }, []);

  return (
    <Modal width={500} height={200} visible={visible} setVisibility={setVisibility}>
      Modal Content!
    </Modal>
  )
};
