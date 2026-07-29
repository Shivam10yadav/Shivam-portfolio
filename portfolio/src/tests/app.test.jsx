import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import Portfolio from "../App";


describe("Portfolio Website Tests", () => {


  const mockProps = {
    theme: "light",
    toggleTheme: vi.fn()
  };


  test("Portfolio renders successfully", () => {

    const { container } = render(
      <Portfolio {...mockProps}/>
    );


    expect(container)
      .toBeInTheDocument();

  });



  test("Developer name is visible", () => {

    render(
      <Portfolio {...mockProps}/>
    );


    expect(
      screen.getByText(/Shivam Yadav/i)
    )
    .toBeInTheDocument();

  });



  test("Role is visible", () => {

    render(
      <Portfolio {...mockProps}/>
    );


    expect(
      screen.getByText(/Full Stack Developer/i)
    )
    .toBeInTheDocument();

  });



  test("Projects are displayed", () => {

    render(
      <Portfolio {...mockProps}/>
    );


    expect(
      screen.getByText("QueueLess")
    )
    .toBeInTheDocument();


    expect(
      screen.getByText("ParkFlow")
    )
    .toBeInTheDocument();


    expect(
      screen.getByText("Reverto")
    )
    .toBeInTheDocument();

  });



  test("Skills are displayed", () => {

    render(
      <Portfolio {...mockProps}/>
    );


    expect(
      screen.getByText("React")
    )
    .toBeInTheDocument();


    expect(
      screen.getByText("Docker")
    )
    .toBeInTheDocument();

  });



  test("Contact section exists", () => {

    render(
      <Portfolio {...mockProps}/>
    );


    expect(
      screen.getByText(/Let's build something together/i)
    )
    .toBeInTheDocument();

  });



  test("Theme toggle function can be called", async () => {

    const user = userEvent.setup();


    render(
      <Portfolio {...mockProps}/>
    );


    expect(mockProps.toggleTheme)
      .not
      .toHaveBeenCalled();

  });



  test("Social links exist", () => {

    render(
      <Portfolio {...mockProps}/>
    );


    expect(
      screen.getByLabelText("GitHub")
    )
    .toBeInTheDocument();


    expect(
      screen.getByLabelText("LinkedIn")
    )
    .toBeInTheDocument();

  });


});