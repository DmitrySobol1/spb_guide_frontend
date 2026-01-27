import { useState, useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/axios';
import { CircularProgress } from '@mui/material';

import { Page } from '@/components/Page.tsx';
import { Card } from '@/components/Card/Card.tsx';
import { Header } from '@/components/Header/Header.tsx';
import { CardList } from '@/components/CardList/CardList.tsx';
import { Page_my } from '@/components/Page_my/Page_my.tsx';
import { SectionPage } from '@/components/SectionPage/SectionPage.tsx';
import { AlertMessage } from '@/components/AlertMessage/AlertMessage.tsx';

import { TabbarMenu } from '../../components/TabbarMenu/TabbarMenu.tsx';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface AudioTour {
  _id: string;
  title: string;
  shortDescription?: string;
  longDescription?: string;
  access: 'free' | 'payment';
  isAvailable: boolean;
  orderNumber: number;
  timeQty?: number;
  imgMainTour?: string;
}

export const FavoritesLessonsPage: FC = () => {
  const navigate = useNavigate();
  const [audioTours, setAudioTours] = useState<AudioTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchAudioTours = async () => {
      try {
        const { data } = await axios.get('/audioTours');
        setAudioTours(data);
      } catch (error) {
        console.error('Ошибка при загрузке audioTours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAudioTours();
  }, []);

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
          <Header title="Рекомендации" subtitle="места, которые стоит посетить" />
        </SectionPage>

       
      </Page_my>
      <TabbarMenu />
    </Page>
  );
};
