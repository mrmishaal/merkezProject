import Button from '../components/Button';
import Card from '../components/Card';
import SectionHeading from '../components/SectionHeading';

function Admissions() {
  return (
    <section className="py-16">
      <div className="container-shell">
        <SectionHeading eyebrow="Admissions" title="Join Merkezel Burhan School" description="Simple and transparent admissions for Kindergarten, Primary, and Secondary." />
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <h3 className="text-xl font-semibold text-primary">1. Submit Inquiry</h3>
            <p className="mt-3 text-slate-600">Contact the admissions office for grade availability and required documents.</p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-primary">2. Entrance Assessment</h3>
            <p className="mt-3 text-slate-600">Students complete age-appropriate assessments and an interview when required.</p>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-primary">3. Final Registration</h3>
            <p className="mt-3 text-slate-600">Complete registration, payment setup, and orientation scheduling.</p>
          </Card>
        </div>
        <div className="mt-10 rounded-xl2 bg-primary px-8 py-12 text-center text-white shadow-soft">
          <h2 className="text-3xl font-bold text-white">Enroll Your Child Today!</h2>
          <p className="mt-3 text-blue-100">Our admissions team is ready to support your family step by step.</p>
          <Button to="/contact" variant="accent" className="mt-6">Start Admission</Button>
        </div>
      </div>
    </section>
  );
}

export default Admissions;
