import { useState } from "react";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/components/ui/use-toast";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Calendar, MapPin, DollarSign, FileText,
} from "lucide-react";

const PostOpening = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: "",
    department: "",
    location: "",
    salaryRange: "",
    experience: "",
    deadline: "",
    description: "",
    requirements: "",
    benefits: "",
    registrationFee: "",
  });

  const { user } = useUser();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user._id) {
      console.error("User not found or missing _id");
      return;
    }

    const jobData = {
      jobTitle: formData.jobTitle,
      jobType: formData.jobType,
      department: formData.department,
      location: formData.location,
      salaryRange: formData.salaryRange,
      experience: formData.experience,
      deadline: formData.deadline,
      description: formData.description,
      requirements: formData.requirements,
      benefits: formData.benefits,
      registrationFee: formData.registrationFee,
      postedBy: user._id,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      const result = await response.json();
      console.log("✅ Job posted:", result);
    } catch (error) {
      console.error("❌ Job posting failed:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg py-4 px-6 text-center">
          <h1 className="text-2xl font-bold text-white">Post Openings</h1>
        </div>
      </div>

      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg">
          <CardTitle className="flex items-center text-xl text-slate-800">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Job Details
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-sm font-medium text-slate-700">Job Title *</Label>
                <Select
                  value={formData.jobTitle}
                  onValueChange={(value) => setFormData({ ...formData, jobTitle: value })}
                >
                  <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select Job Title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Senior Frontend Developer">Senior Frontend Developer</SelectItem>
                    <SelectItem value="Backend Engineer">Backend Engineer</SelectItem>
                    <SelectItem value="UX Designer">UI Designer</SelectItem>
                    <SelectItem value="Product Manager">Product Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Job Type */}
              <div className="space-y-2">
                <Label htmlFor="jobType" className="text-sm font-medium text-slate-700">Job Type *</Label>
                <Select
                  value={formData.jobType}
                  onValueChange={(value) => setFormData({ ...formData, jobType: value })}
                >
                  <SelectTrigger className="border-slate-300 focus:border-blue-500">
                    <SelectValue placeholder="Select Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label htmlFor="department" className="text-sm font-medium text-slate-700">Department</Label>
                <Input
                  id="department"
                  placeholder="e.g., Engineering"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-slate-700">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="location"
                    placeholder="e.g., San Francisco, CA"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Salary Range */}
              <div className="space-y-2">
                <Label htmlFor="salaryRange" className="text-sm font-medium text-slate-700">Salary Range</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="salaryRange"
                    placeholder="e.g., $80,000 - $120,000"
                    value={formData.salaryRange}
                    onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                    className="pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-sm font-medium text-slate-700">Experience Required</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => setFormData({ ...formData, experience: value })}
                >
                  <SelectTrigger className="border-slate-300 focus:border-blue-500">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level (0–2 years)</SelectItem>
                    <SelectItem value="mid">Mid Level (2–5 years)</SelectItem>
                    <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                    <SelectItem value="executive">Executive Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-sm font-medium text-slate-700">Application Deadline</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Registration Fee */}
              <div className="space-y-2">
                <Label htmlFor="registrationFee" className="text-sm font-medium text-slate-700">Registration Fee</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="registrationFee"
                    placeholder="e.g., $50 (or leave blank if free)"
                    value={formData.registrationFee}
                    onChange={(e) => setFormData({ ...formData, registrationFee: e.target.value })}
                    className="pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Textareas */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-slate-700">Job Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[120px] border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements" className="text-sm font-medium text-slate-700">Requirements & Qualifications</Label>
                <Textarea
                  id="requirements"
                  placeholder="List required skills, education, certifications, and experience..."
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="min-h-[100px] border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits" className="text-sm font-medium text-slate-700">Benefits & Perks</Label>
                <Textarea
                  id="benefits"
                  placeholder="Health insurance, flexible hours, remote work options, etc..."
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  className="min-h-[80px] border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button type="button" variant="outline" className="px-6">
                Save as Draft
              </Button>
              <Button
                type="submit"
                className="px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Post Job Opening
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostOpening;
