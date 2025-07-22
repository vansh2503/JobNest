import { useParams } from "react-router-dom";
import JobApplicationForm from "@/components/JobApplicationForm";

const mockJobs = {
  job1: { title: "Senior React Developer", company: "TechCorp Inc." },
  job2: { title: "UX/UI Designer", company: "DesignHub" },
  // ... other job info
};

const JobApplicationPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const job = mockJobs[jobId || ""];

  if (!job) return <div>Job not found</div>;

  return (
    <div className="max-w-xl mx-auto py-10">
      <JobApplicationForm
        jobId={jobId!}
        jobTitle={job.title}
        companyName={job.company}
      />
    </div>
  );
};

export default JobApplicationPage;
