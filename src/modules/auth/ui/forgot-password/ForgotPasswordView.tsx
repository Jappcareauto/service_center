import PrimaryButton from '@/shared/generics/buttons/PrimaryButton';
import Input from '@/shared/generics/inputs/Input';
import UnAuthenticatePageLayout from '@/shared/generics/layouts/UnAuthenticatePageLayout';
import { useForgotPassword } from './useForgotPassword';

const ForgotPasswordView = () => {
  const {
    handleSendMail
  } = useForgotPassword();
  return (
    <UnAuthenticatePageLayout>
      <h1 className="mb-12">Forgot password</h1>
      <Input
        name="email"
        label="Email"
        placeholder="Email"
      />
      <PrimaryButton
        onClick={handleSendMail}
        className="w-full mt-14"
      >
        Send email
      </PrimaryButton>
    </UnAuthenticatePageLayout>
  )
}

export default ForgotPasswordView
