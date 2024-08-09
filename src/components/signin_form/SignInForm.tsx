'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, MouseEventHandler, useState } from 'react';
import { Loading } from '../loading/Loading';

type SignInFormPropsType = {
  lang: string;
};

export function SignInForm({ lang }: SignInFormPropsType) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('ru');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/review';

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async event => {
    event.preventDefault();
    setErrorMessage(''); // Сбрасываем сообщение об ошибке перед отправкой формы

    try {
      const res = await signIn('credentials', {
        email: email,
        password: password,
        language: language,
        redirect: false,
      });

      if (!res?.ok) {
        setErrorMessage(lang === 'RU' ? 'Ошибка авторизации, попробуйте снова' : 'Authorization error, try again');
      } else {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error('Sign-in form error:', error);
      setErrorMessage(lang === 'RU' ? 'Ошибка авторизации, попробуйте снова' : 'Authorization error, try again');
    }
  };

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setEmail(e.currentTarget.value);
  };

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setPassword(e.currentTarget.value);
  };

  const changeLanguageHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setErrorMessage('');
    setLanguage(e.currentTarget.value);
  };

  return (
    <div className="relative flex flex-col w-72">
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute -top-20" role="alert">
          <span className="block text-center sm:inline">{errorMessage}</span>
        </div>
      )}
      <h3 className="text-center pb-6 font-bold text-2xl text-gray-700">Login</h3>
      <label className="text-orange-500 pb-1" htmlFor="email">
        {lang === 'RU' ? 'Логин для Metafleet:' : 'Login for Metafleet:'}
      </label>
      <input
        className="border-solid border border-gray-800 rounded px-3 py-2 mb-4"
        onChange={e => changeEmailHandler(e)}
        placeholder="email..."
        type="email"
        name="email"
        required
      />
      <label className="text-orange-500 pb-1" htmlFor="password">
        {lang === 'RU' ? 'Пароль для Metafleet:' : 'Password for Metafleet:'}
      </label>
      <input
        className="border-solid border border-gray-800 rounded px-3 py-2 mb-4"
        onChange={e => changePasswordHandler(e)}
        placeholder="password..."
        type="password"
        name="password"
        required
      />
      <label className="text-orange-500 pb-1" htmlFor="language">
        {lang === 'RU' ? 'Язык:' : 'Language:'}
      </label>
      <select className="bg-gray-200 rounded mb-4" name="language" form="auth" onChange={e => changeLanguageHandler(e)}>
        <option value="ru">RU</option>
        <option value="en">EN</option>
      </select>
      <button
        className="font-semibold border border-gray-600 text-stone-50 hover:bg-stone-50 hover:text-orange-600 bg-gray-600 px-3 py-2 rounded transition-all"
        onClick={handleSubmit}
      >
        {lang === 'RU' ? 'Войти' : 'Sign in'}
      </button>
    </div>
  );
}
