import { Suspense } from 'react';
import MenuPageClient from './menu-page-client';

export default function MenuPage({
  params,
}: {
  params: { restaurantId: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MenuPageClient restaurantId={params.restaurantId} />
    </Suspense>
  );
}
