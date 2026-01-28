import { useState, type FC } from 'react';
import { CircularProgress } from '@mui/material';

import { Page } from '@/components/Page.tsx';
import { Header } from '@/components/Header/Header.tsx';
import { Page_my } from '@/components/Page_my/Page_my.tsx';
import { SectionPage } from '@/components/SectionPage/SectionPage.tsx';

import { TabbarMenu } from '../../components/TabbarMenu/TabbarMenu.tsx';





export const RecomendationsPage: FC = () => {
  const [loading] = useState(false);

 

  if (loading) {
    return (
      <Page back={false}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <CircularProgress sx={{ color: '#4ade80' }} />
        </div>
      </Page>
    );
  }

  return (
    <Page back={false}>
      
      <Page_my>
        <SectionPage>
          <Header title="Май рекомендасьон" subtitle="места, которые стоит посетить" />
        </SectionPage>
        
        <SectionPage>
          <Header subtitle="в разработке!" />
        </SectionPage>

        
      </Page_my>
      <TabbarMenu />
    </Page>
  );
};
