import SupportDocPage from '@/components/SupportDocPage';
import { userGuide } from '@/lib/support-docs';

export default function UserGuidePage() {
  return <SupportDocPage doc={userGuide} />;
}
