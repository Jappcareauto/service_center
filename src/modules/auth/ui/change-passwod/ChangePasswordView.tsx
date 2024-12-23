import PrimaryButton from '@/shared/generics/buttons/PrimaryButton'
import InputPasseord from '@/shared/generics/inputs/InputPasseord'
import UnAuthenticatePageLayout from '@/shared/generics/layouts/UnAuthenticatePageLayout'

const ChangePasswordView = () => {
  return (
    <UnAuthenticatePageLayout>
      <h1 className="mb-12">Change Password</h1>
      <form>
        <div className='flex flex-col gap-y-6'>
          <InputPasseord
            name="password"
            label="New Password"
            placeholder="Password"
          />
          <InputPasseord
            name="password"
            label="Confirm Password"
            placeholder="Password"
          />
        </div>
        <PrimaryButton
          className="w-full mt-14"
        >
          Sign In
        </PrimaryButton>
      </form>
    </UnAuthenticatePageLayout>
  )
}

export default ChangePasswordView
