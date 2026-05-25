import SupportDocPage from '@/components/SupportDocPage';
import { searchGuide } from '@/lib/support-docs';

export default function SearchGuidePage() {
  return <SupportDocPage doc={searchGuide} />;
}
