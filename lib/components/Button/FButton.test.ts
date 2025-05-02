import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import FButton from "./FButton.vue"

describe("FButton", () => {
  it("should be render default slot", () => {
    // Arrange
    const content = "button"
    const wrapper = mount(FButton, {
      slots: { default: content },
    })

    // Act
    const contentExpected = wrapper.text()

    // Assert
    expect(contentExpected).toContain(content)
  })
})
