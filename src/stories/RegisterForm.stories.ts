import RegisterForm from "@/components/RegisterForm.vue";
import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Forms/RegisterForm",
  component: RegisterForm,
  argTypes: {
    email: { control: "text" },
    password: { control: "text" },
  },
} as Meta<typeof RegisterForm>;

const Template: StoryFn<typeof RegisterForm> = (args) => ({
  components: { RegisterForm },
  setup() {
    return { args };
  },
  template: '<RegisterForm v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  email: "",
  password: "",
};

export const InvalidEmail = Template.bind({});
InvalidEmail.args = {
  email: "invalid-email",
  password: "password123",
};

export const InvalidPassword = Template.bind({});
InvalidPassword.args = {
  email: "test@example.com",
  password: "123",
};
