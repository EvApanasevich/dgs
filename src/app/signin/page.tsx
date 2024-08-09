import { SignInForm } from '@/components/signin_form/SignInForm';
import { getUserSettings } from '../../../lib/actions/user_settings.actions';
import { getServerSession } from 'next-auth/next';
import { authConfig } from '../../../configs/auth';

export default async function SignIn() {
  const session = await getServerSession(authConfig);
  //const userSettings = await getUserSettings(session?.user.id);

  return (
    <div className="flex justify-center pt-44">
      <SignInForm lang={'RU'} />
    </div>
  );
}
