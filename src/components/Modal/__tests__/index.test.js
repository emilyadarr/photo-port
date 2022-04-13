import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Modal from "..";

const mockToggleModal = jest.fn();
const currentPhoto = {
  name: "Park bench",
  category: "landscape",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie",
  index: 1,
};

afterEach(cleanup);

describe("Modal component", () => {
  it("renders", () => {
    // baseline render component test
    render(<Modal onClose={mockToggleModal} currentPhoto={currentPhoto} />);
  });
  // snapshot test
  it("matches snapshot DOM node structure", () => {
    const { asFragment } = render(
      <Modal onClose={mockToggleModal} currentPhoto={currentPhoto} />
    );

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="modalBackdrop"
        >
          <div
            class="modalContainer"
          >
            <h3
              class="modalTitle"
            >
              Park bench
            </h3>
            <img
              alt="landscape"
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ultricie
            </p>
            <button
              type="button"
            >
              Close this modal
            </button>
          </div>
        </div>
      </DocumentFragment>
    `);
  });
});

describe("Click Event", () => {
  it("calls onClose handler", () => {
    const { getByText } = render(
      <Modal onClose={mockToggleModal} currentPhoto={currentPhoto} />
    );
    fireEvent.click(getByText("Close this modal"));

    expect(mockToggleModal).toHaveBeenCalledTimes(1);
  });
});
