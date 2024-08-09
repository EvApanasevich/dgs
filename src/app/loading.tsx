import { Loading } from '@/components/loading/Loading';

export default function LoadingMain() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Loading width={'w-10'} height={'h-10'} />
    </div>
  );
}
