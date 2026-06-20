import Hero from '@/components/Hero';
import FeatureGrid from '@/components/FeatureGrid';
import DataGridPreview from '@/components/DataGridPreview';
import ProductHighlight from '@/components/ProductHighlight';
import FAQ from '@/components/FAQ';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <DataGridPreview />
      <ProductHighlight />
      <FAQ />
    </>
  );
}
