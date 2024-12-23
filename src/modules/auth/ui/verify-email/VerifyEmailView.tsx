import PrimaryButton from '@/shared/generics/buttons/PrimaryButton'
import InputOtp from '@/shared/generics/inputs/InputOtp'
import UnAuthenticatePageLayout from '@/shared/generics/layouts/UnAuthenticatePageLayout'

const VerifyEmailView = () => {
  return (
    <UnAuthenticatePageLayout>
      <h1 className="mb-12">Verify Email</h1>
      <form>
        <div className='font-medium'>
          <p>We’ve sent a verification email to</p>
          <p className='mb-6 text-primary'>email@email.com</p>
        </div>
        <InputOtp />
        <p className='mt-6'>Didn’t get the code? <span className='text-primary cursor-pointer'>Resend it</span></p>
        <PrimaryButton
          className='w-full mt-16'
        >
          Sign In
        </PrimaryButton>
      </form>
    </UnAuthenticatePageLayout>
  )
}

export default VerifyEmailView
