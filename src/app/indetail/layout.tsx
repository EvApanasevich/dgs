import { getServerSession } from 'next-auth/next';
import { authConfig } from '../../../configs/auth';
import Link from 'next/link';
import { getUserSettings } from '../../../lib/actions/user_settings.actions';

export default async function InDetailLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authConfig);
  const userSettings = await getUserSettings(session?.user.id);

  return (
    <div className="flex-1 pt-8 sm:pt-4">
      <div className="border-b border-gray-300 pb-5 pt-2.5">
        <Link
          href="/review"
          className="font-semibold border border-gray-600 text-stone-50 hover:bg-stone-50 hover:text-orange-600 bg-gray-600 px-3 py-2 rounded transition-all sm:text-xs"
        >
          {userSettings.language === 'RU' ? '<< Вернуться к списку доступных объектов' : '<< Go back to the list of available objects'}
        </Link>
      </div>
      {children}
    </div>
  );
}
