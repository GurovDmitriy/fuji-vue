import { FConfigProvider } from "@/config"
import { FIconLoadingLine, FIconVue } from "@/icons"
import FIconLoading from "@/icons/FIconLoading.vue"
import "@/styles/main.scss"
import type { Meta, StoryObj } from "@storybook/vue3"
import FButton from "./FButton.vue"

const meta: Meta<typeof FButton> = {
  component: FButton,
}

export default meta
type Story = StoryObj<typeof FButton>

export const Default: Story = {
  render: (args) => ({
    components: { FButton: FButton, FConfigProvider },
    setup() {
      return { args }
    },
    template: `
      <FConfigProvider>
        <FButton v-bind="args">button</FButton>
      </FConfigProvider>
    `,
  }),

  args: {
    type: "solid",
    size: "m",
    color: "primary",
    status: "default",
    iconPosition: "left",
  },
}

export const Icon: Story = {
  render: (args) => ({
    components: { FButton: FButton, FConfigProvider, FIconVue },
    setup() {
      return { args }
    },
    template: `
      <FConfigProvider>
        <FButton v-bind="args">
          <template #icon><FIconVue/></template>
          button
        </FButton>
      </FConfigProvider>
    `,
  }),

  args: {
    type: "solid",
    size: "m",
    color: "primary",
    status: "default",
    iconPosition: "left",
  },
}

export const IconSlotLoading: Story = {
  render: (args) => ({
    components: { FButton: FButton, FConfigProvider, FIconLoadingLine },
    setup() {
      return { args }
    },
    template: `
      <FConfigProvider>
        <FButton v-bind="args">
          <template #iconLoading><FIconLoadingLine/></template>
          button
        </FButton>
      </FConfigProvider>
    `,
  }),

  args: {
    type: "solid",
    size: "m",
    color: "primary",
    status: "loading",
    iconPosition: "left",
  },
}

export const IconConfigLoading: Story = {
  render: (args) => ({
    components: { FButton: FButton, FConfigProvider, FIconLoading },
    setup() {
      return { args, config: { iconLoading: FIconLoading } }
    },
    template: `
      <FConfigProvider :config="config">
        <FButton v-bind="args">
          button
        </FButton>
      </FConfigProvider>
    `,
  }),

  args: {
    type: "solid",
    size: "m",
    color: "primary",
    status: "loading",
    iconPosition: "left",
  },
}

export const Link: Story = {
  render: (args) => ({
    components: { FButton: FButton, FConfigProvider },
    setup() {
      return { args }
    },
    template: `
      <FConfigProvider>
        <FButton v-bind="args" as="a">button</FButton>
      </FConfigProvider>
    `,
  }),

  args: {
    type: "solid",
    size: "m",
    color: "primary",
    status: "default",
    iconPosition: "left",
  },
}
