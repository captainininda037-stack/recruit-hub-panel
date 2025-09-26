import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar,
  Filter,
  MoreHorizontal,
  ExternalLink
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

// Mock data - in real app, fetch from API
const mockJobs = [
  {
    id: 1,
    title: "Software Engineer - Government Sector",
    subtitle: "Central Government Recruitment 2024",
    category: "Govt Job",
    fromDate: "2024-09-01",
    toDate: "2024-10-15",
    applicationLink: "https://example.com/apply/1",
    views: 324,
    likes: 28,
    applications: 45,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    status: "active",
    createdAt: "2024-08-15"
  },
  {
    id: 2,
    title: "Bank PO Recruitment 2024",
    subtitle: "State Bank Officer Position",
    category: "Banking",
    fromDate: "2024-09-10",
    toDate: "2024-10-20",
    applicationLink: "https://example.com/apply/2",
    views: 567,
    likes: 42,
    applications: 67,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
    status: "active",
    createdAt: "2024-08-20"
  },
  {
    id: 3,
    title: "SSC CGL Notification",
    subtitle: "Staff Selection Commission Combined Graduate Level",
    category: "SSC",
    fromDate: "2024-10-01",
    toDate: "2024-11-01",
    applicationLink: "https://example.com/apply/3",
    views: 892,
    likes: 78,
    applications: 123,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&fit=crop",
    status: "active",
    createdAt: "2024-09-01"
  },
  {
    id: 4,
    title: "Railway Technician Jobs",
    subtitle: "Indian Railways Recruitment Board",
    category: "Railway",
    fromDate: "2024-08-15",
    toDate: "2024-09-15",
    applicationLink: "https://example.com/apply/4",
    views: 445,
    likes: 32,
    applications: 89,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=150&h=150&fit=crop",
    status: "expired",
    createdAt: "2024-08-01"
  }
];

const JobList = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { toast } = useToast();

  const categories = ["Govt Job", "Banking", "SSC", "Railway", "Defense", "Police"];

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || job.category === categoryFilter;
    const matchesStatus = !statusFilter || job.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = (jobId: number) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    toast({
      title: "Job Deleted",
      description: "The job posting has been deleted successfully."
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-success-foreground";
      case "expired":
        return "bg-destructive text-destructive-foreground";
      case "draft":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const isExpired = (toDate: string) => {
    return new Date(toDate) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Job Management</h2>
          <p className="text-muted-foreground mt-1">
            Manage all job postings and their performance
          </p>
        </div>
        <Button asChild className="gradient-primary shadow-primary hover:opacity-90">
          <Link to="/jobs/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Job
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("");
                setStatusFilter("");
              }}
              className="w-full md:w-auto"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{jobs.length}</div>
            <div className="text-sm text-muted-foreground">Total Jobs</div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">
              {jobs.filter(job => job.status === "active").length}
            </div>
            <div className="text-sm text-muted-foreground">Active Jobs</div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">
              {jobs.filter(job => isExpired(job.toDate)).length}
            </div>
            <div className="text-sm text-muted-foreground">Expired Jobs</div>
          </CardContent>
        </Card>
        <Card className="dashboard-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">
              {jobs.reduce((sum, job) => sum + job.applications, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Applications</div>
          </CardContent>
        </Card>
      </div>

      {/* Jobs Table/Grid */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Job Listings</CardTitle>
          <CardDescription>
            {filteredJobs.length} of {jobs.length} jobs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                {searchTerm || categoryFilter || statusFilter ? "No jobs found matching your filters" : "No jobs created yet"}
              </div>
              <Button asChild>
                <Link to="/jobs/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Job
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="border rounded-lg p-4 hover:bg-card-hover transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Job Image */}
                    <div className="shrink-0">
                      <img
                        src={job.image}
                        alt={job.title}
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                    </div>

                    {/* Job Details */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">
                            {job.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {job.subtitle}
                          </p>
                        </div>
                        
                        {/* Actions */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/jobs/edit/${job.id}`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            {job.applicationLink && (
                              <DropdownMenuItem asChild>
                                <a
                                  href={job.applicationLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  View Application
                                </a>
                              </DropdownMenuItem>
                            )}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Job</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{job.title}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(job.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Job Meta */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(job.fromDate).toLocaleDateString()} - {new Date(job.toDate).toLocaleDateString()}
                        </div>
                        <Badge className={getStatusColor(isExpired(job.toDate) ? "expired" : job.status)}>
                          {isExpired(job.toDate) ? "Expired" : job.status}
                        </Badge>
                        <Badge variant="outline" className="bg-primary-light text-primary">
                          {job.category}
                        </Badge>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          <span>{job.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>👍</span>
                          <span>{job.likes} likes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>📝</span>
                          <span>{job.applications} applications</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JobList;