import Button from "@/components/ui/button";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

export default function HomePage() {
  return (
    <Container className="py-20">
      <SectionTitle
        subtitle="Insurance"
        title="Welcome to Insurance System"
        description="Professional reusable component setup completed."
      />

      <div className="flex justify-center">
        <Button>Get Started</Button>
      </div>
    </Container>
  );
}