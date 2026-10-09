import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import BrandsSection from '../components/BrandsSection';
import ServicesSection from '../components/ServicesSection';
import EarningsSection from '../components/EarningsSection';
import MiniGame from '../components/MiniGame';
import ContactSection from '../components/ContactSection';
import CampaignModal from '../components/CampaignModal';

export default function Home() {
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [campaignModalType, setCampaignModalType] = useState('Brand');

  const openBrandModal = () => { setCampaignModalType('Brand'); setIsCampaignModalOpen(true); };
  const openStudentModal = () => { setCampaignModalType('Student'); setIsCampaignModalOpen(true); };

  return (
    <>
      <HeroSection onOpenCampaignModal={openBrandModal} onOpenAmbassadorModal={openStudentModal} />
      <BrandsSection />
      <ServicesSection onOpenCampaignModal={openBrandModal} />
      <EarningsSection onOpenAmbassadorModal={openStudentModal} />
      <MiniGame onOpenCampaignModal={openBrandModal} />
      <ContactSection />

      <CampaignModal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
        defaultType={campaignModalType}
      />
    </>
  );
}
