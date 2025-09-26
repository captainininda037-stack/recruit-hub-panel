import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Upload, Save, ArrowLeft, ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const JobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    category: "",
    fromDate: undefined as Date | undefined,
    toDate: undefined as Date | undefined,
    applicationLink: "",
    description: "",
    image: null as File | null,
    imagePreview: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "Govt Job",
    "Central Govt Job", 
    "SSC",
    "Banking",
    "Railway",
    "Defense",
    "Police",
    "Teaching",
    "Medical",
    "Engineering"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please select an image smaller than 5MB."
        });
        return;
      }

      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.title || !formData.category || !formData.fromDate || !formData.toDate) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields."
      });
      setIsLoading(false);
      return;
    }

    if (formData.fromDate >= formData.toDate) {
      toast({
        variant: "destructive",
        title: "Invalid Dates",
        description: "From date must be before To date."
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: isEdit ? "Job Updated" : "Job Created",
      description: isEdit ? "Job posting has been updated successfully." : "New job posting has been created successfully."
    });

    navigate("/jobs");
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/jobs")}
          className="hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {isEdit ? "Edit Job Posting" : "Create New Job"}
          </h1>
          <p className="text-muted-foreground">
            {isEdit ? "Update the job posting details" : "Fill in the details to create a new job posting"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Basic Info */}
          <div className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the main details of the job posting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Software Engineer - Government Sector"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Job Subtitle</Label>
                  <Input
                    id="subtitle"
                    placeholder="e.g., Central Government Recruitment 2024"
                    value={formData.subtitle}
                    onChange={(e) => handleInputChange("subtitle", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange("category", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter job description, requirements, and other details..."
                    className="min-h-[120px] resize-none"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Application Details */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
                <CardDescription>
                  Set dates and application link
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>From Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.fromDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.fromDate ? (
                            format(formData.fromDate, "PPP")
                          ) : (
                            <span>Pick start date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.fromDate}
                          onSelect={(date) => handleInputChange("fromDate", date)}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>To Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.toDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.toDate ? (
                            format(formData.toDate, "PPP")
                          ) : (
                            <span>Pick end date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.toDate}
                          onSelect={(date) => handleInputChange("toDate", date)}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applicationLink">Application Link</Label>
                  <Input
                    id="applicationLink"
                    type="url"
                    placeholder="https://example.com/apply"
                    value={formData.applicationLink}
                    onChange={(e) => handleInputChange("applicationLink", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Image Upload */}
          <div className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Job Image</CardTitle>
                <CardDescription>
                  Upload an image for the job posting (optional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Image Preview */}
                  {formData.imagePreview ? (
                    <div className="relative">
                      <img
                        src={formData.imagePreview}
                        alt="Job preview"
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => handleInputChange("imagePreview", "")}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Drop an image here, or click to select
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG up to 5MB
                        </p>
                      </div>
                    </div>
                  )}

                  {/* File Input */}
                  <div>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => document.getElementById("image-upload")?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {formData.imagePreview ? "Change Image" : "Upload Image"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview Card */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  How this job will appear to users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 space-y-3">
                  {formData.imagePreview && (
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">
                      {formData.title || "Job Title"}
                    </h3>
                    {formData.subtitle && (
                      <p className="text-sm text-muted-foreground">
                        {formData.subtitle}
                      </p>
                    )}
                  </div>
                  {formData.category && (
                    <span className="inline-block px-2 py-1 bg-primary-light text-primary text-xs rounded">
                      {formData.category}
                    </span>
                  )}
                  {(formData.fromDate || formData.toDate) && (
                    <div className="text-xs text-muted-foreground">
                      {formData.fromDate && format(formData.fromDate, "MMM dd, yyyy")}
                      {formData.fromDate && formData.toDate && " - "}
                      {formData.toDate && format(formData.toDate, "MMM dd, yyyy")}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/jobs")}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="gradient-primary shadow-primary hover:opacity-90"
          >
            {isLoading ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                {isEdit ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {isEdit ? "Update Job" : "Create Job"}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;