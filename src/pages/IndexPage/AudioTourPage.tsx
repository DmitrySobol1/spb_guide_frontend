import { useState, useEffect, type FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '@/axios';
import { CircularProgress } from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

import { Page } from '@/components/Page.tsx';
// import { Header } from '@/components/Header/Header.tsx';
import { Header2 } from '@/components/Header2/Header2.tsx';
import { Text } from '@/components/Text/Text.tsx';
import { Title } from '@/components/Title/Title.tsx';
import { ActionButton } from '@/components/ActionButton/ActionButton.tsx';
import { StepNavigation } from '@/components/StepNavigation/StepNavigation.tsx';
import { Page_my } from '@/components/Page_my/Page_my.tsx';
import { TabbarMenu } from '../../components/TabbarMenu/TabbarMenu.tsx';
import { SectionPage } from '@/components/SectionPage/SectionPage.tsx';

interface PodStep {
  type: 'text' | 'img' | 'audio' | 'video';
  titlePodStep?: string;
  descriptionPodStep?: string;
  description2PodStep?: string;
  src?: string;
  podstepNumber: number;
  isClickable?: boolean;
  linkClickable?: string;
}

interface AudioTourStep {
  _id: string;
  linkTo_audioTour: string;
  stepNumber: number;
  titleStep?: string;
  descriptionStep?: string;
  pod_steps: PodStep[];
}

export const AudioTourPage: FC = () => {
  const { tourId, stepNumber } = useParams<{
    tourId: string;
    stepNumber: string;
  }>();
  const navigate = useNavigate();

  const [steps, setSteps] = useState<AudioTourStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedPodStep, setCopiedPodStep] = useState<number | null>(null);

  const currentStepNum = Number(stepNumber) || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/audioTourSteps/${tourId}`);
        setSteps(data);
      } catch (error) {
        console.error('Ошибка при загрузке данных аудиотура:', error);
      } finally {
        setLoading(false);
      }
    };

    if (tourId) {
      fetchData();
    }
  }, [tourId]);

  if (loading) {
    return (
      <Page back={true}>
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

  const currentStep = steps.find((step) => step.stepNumber === currentStepNum);
  const hasNextStep = steps.some(
    (step) => step.stepNumber === currentStepNum + 1,
  );

  if (!currentStep) {
    return (
      <Page back={true}>
        <div style={{ padding: 20, textAlign: 'center' }}>
          <p>Шаг не найден</p>
        </div>
      </Page>
    );
  }

  const handleNext = () => {
    navigate(`/audio-tour/${tourId}/${currentStepNum + 1}`);
  };

  const handleCopyToClipboard = async (text: string, podstepNumber: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPodStep(podstepNumber);
      setTimeout(() => setCopiedPodStep(null), 3000);
    } catch (error) {
      console.error('Ошибка копирования в буфер обмена:', error);
    }
  };

  const sortedPodSteps = [...currentStep.pod_steps].sort(
    (a, b) => a.podstepNumber - b.podstepNumber,
  );

  return (
    <Page back={true}>
      <Page_my>
        <SectionPage>
          {/* <Header2 title={tour?.title || ''} /> */}
          <Header2
            title={currentStep.titleStep || ''}
            subtitle={currentStep.descriptionStep || ''}
          />

          <StepNavigation
            totalSteps={steps.length}
            currentStep={currentStepNum}
            onStepClick={(step) => navigate(`/audio-tour/${tourId}/${step}`)}
          />
        </SectionPage>

        {/* <WrapperTour> */}

        {/* <SectionPage>
          <Header2
            title={currentStep.titleStep || ''}
            subtitle={currentStep.descriptionStep || ''}
          />
        </SectionPage> */}

        

        {sortedPodSteps.map((podStep) => (
          <SectionPage key={podStep.podstepNumber}>
            {podStep.titlePodStep && (
              <Title text={podStep.titlePodStep} />
            )}
            
            {podStep.descriptionPodStep && (
              <>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  {podStep.isClickable && (
                    <ContentCopyOutlinedIcon
                      sx={{ fontSize: 20, color: '#666', cursor: 'pointer', marginTop: '2px' }}
                      onClick={() => handleCopyToClipboard(podStep.descriptionPodStep!, podStep.podstepNumber)}
                    />
                  )}
                  <Text
                    text={podStep.descriptionPodStep}
                    isClickable={podStep.isClickable}
                    onClick={podStep.isClickable
                      ? () => handleCopyToClipboard(podStep.descriptionPodStep!, podStep.podstepNumber)
                      : undefined
                    }
                  />
                </div>
                {podStep.isClickable && copiedPodStep === podStep.podstepNumber && (
                  <Text hometext={'Адрес скопирован. Можно вставить в навигатор'}></Text>
                )}
              </>
            )}

            {podStep.type === 'img' && podStep.src && (
              <img
                src={podStep.src}
                alt={podStep.titlePodStep || ''}
                style={{ width: '100%', borderRadius: 12, marginBottom: 12 }}
              />
            )}

            {podStep.type === 'video' && podStep.src && (
              <>
              {/* <video
                src={podStep.src}
                controls
                style={{ width: '100%', borderRadius: 12, marginBottom: 12 }}
              /> */}
              <div style={{ position: 'relative', paddingTop: '56.25%', width: '100%' }}>
                <iframe
                  src={podStep.src}
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                  frameBorder="0"
                  allowFullScreen
                  style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}
                />
              </div>
              </>
            )}

            {podStep.type === 'audio' && podStep.src && (
              <audio
                src={podStep.src}
                controls
                style={{ width: '100%', marginBottom: 12 }}
              />
            )}

            

            {podStep.description2PodStep && (
              <>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  {podStep.isClickable && (
                    <ContentCopyOutlinedIcon
                      sx={{ fontSize: 20, color: '#666', cursor: 'pointer', marginTop: '2px' }}
                      onClick={() => handleCopyToClipboard(podStep.description2PodStep!, podStep.podstepNumber)}
                    />
                  )}
                  <Text
                    text={podStep.description2PodStep}
                    isClickable={podStep.isClickable}
                    onClick={podStep.isClickable
                      ? () => handleCopyToClipboard(podStep.description2PodStep!, podStep.podstepNumber)
                      : undefined
                    }
                  />
                </div>
                {podStep.isClickable && copiedPodStep === podStep.podstepNumber && (
                  <Text hometext={'Адрес скопирован. Можно вставить в навигатор'}></Text>
                )}
              </>
            )}
          </SectionPage>
        ))}

        

        {hasNextStep && (
          <ActionButton onClick={handleNext} style={{ marginTop: 24 }}>
            Далее
          </ActionButton>
        )}
        {/* </WrapperTour> */}
      </Page_my>
      <TabbarMenu />
    </Page>
  );
};
