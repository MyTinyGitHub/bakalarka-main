import { useState } from "react";
import Grid from "../components/Grid/grid";
import ModalContainer from "../components/UI/Modal/ModalContainer";
import { UINavbar } from "../components/UI/Navbar/drop-down-menu";
import CurrentOperation from "../components/UI/CurrentOperation/current-operation";
import StepByStepDisplayer from "../components/UI/StepByStepDisplay/StepByStepDisplayer";
import Footer from "../components/UI/Footer/Footer";
import { DebugProvider } from "../components/UI/StepByStepDisplay/StepByStepContext";

export default function Home() {
  const STYLE = {
    overflow: "hidden",

  }

  return (
    <div>
      <DebugProvider>
        <UINavbar/>
        <CurrentOperation />

        <div style={STYLE}>
          <StepByStepDisplayer/>
          <Grid />
        </div>

        <ModalContainer />
        <Footer/>
      </DebugProvider>
    </div>
  );
}
