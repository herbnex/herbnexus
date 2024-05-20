import * as Layouts from "@herbnexus/components/layouts";
import * as Register from "@herbnexus/components/register";

const RegisterPage = () => {
  return (
    <Layouts.Auth>
      <Register.Form />
    </Layouts.Auth>
  );
};

export default RegisterPage;
