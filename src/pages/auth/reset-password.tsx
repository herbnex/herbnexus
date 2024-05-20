import * as Layouts from "@herbnexus/components/layouts";
import * as ResetPassword from "@herbnexus/components/reset-password";

const ResetPasswordPage = () => {
  return (
    <Layouts.Auth>
      <ResetPassword.Form />
    </Layouts.Auth>
  );
};

export default ResetPasswordPage;
