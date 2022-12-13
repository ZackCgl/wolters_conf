/** @jest-environment jsdom */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./index";
import Header from "../Components/Header";
import Index from "./";
import Footer from "../Components/Footer";

describe("Home", () => {
  it("renders the footer component", () => {
    render(<Footer />);
  });
});
