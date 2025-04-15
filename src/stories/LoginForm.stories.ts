import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import LoginForm from "@/components/LoginForm.vue";
import { ref } from "vue";
import type { Meta, StoryFn } from "@storybook/vue3";

// Định nghĩa kiểu cho các props
interface LoginFormArgs {
  user_name: string;
  password: string;
}

export default {
  title: "Components/LoginForm",
  component: LoginForm,
  argTypes: {
    user_name: { control: "text" },
    password: { control: "text" },
  },
} as Meta;

// Cập nhật Template với kiểu đúng cho 'args'
const Template: StoryFn<LoginFormArgs> = (args) => ({
  components: { LoginForm },
  setup() {
    const user_name = ref(args.user_name);
    const password = ref(args.password);
    return { user_name, password };
  },
  template:
    '<LoginForm :user_name="user_name" :password="password" :emailInvalid="emailInvalid" :passwordInvalid="passwordInvalid" />',
});

export const Default = Template.bind({});
Default.args = {
  user_name: "",
  password: "",
};

export const EmailInvalid = Template.bind({});
EmailInvalid.args = {
  user_name: "invalidemailtoolong@example.com",
  password: "Password123",
};

export const PasswordInvalid = Template.bind({});
PasswordInvalid.args = {
  user_name: "user@example.com",
  password: "short",
};

export const BothInvalid = Template.bind({});
BothInvalid.args = {
  user_name: "invalidemailtoolong@example.com",
  password: "short",
};
