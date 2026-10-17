import { CollegePage } from './CollegePage';

interface StudentPageProps {
  onNavigateToCompanies?: (targetSection?: string) => void;
  onNavigatePage?: (page: 'home' | 'colleges' | 'companies', targetSection?: string) => void;
}

export function StudentPage({ onNavigateToCompanies, onNavigatePage }: StudentPageProps) {
  const handleNavigate = (page: 'home' | 'colleges' | 'companies', targetSection?: string) => {
    if (onNavigatePage) {
      onNavigatePage(page, targetSection);
    } else if (page === 'companies' && onNavigateToCompanies) {
      onNavigateToCompanies(targetSection);
    }
  };

  return (
    <CollegePage
      onNavigatePage={handleNavigate}
    />
  );
}

export default StudentPage;
