import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LocalJobsList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for local jobs
  const [localJobs] = useState([
    {
      id: 1,
      title: "Local Shop Assistant",
      location: "Downtown Area",
      category: "Retail",
      status: "Active",
      postedDate: "2024-01-15",
      applicants: 12
    },
    {
      id: 2,
      title: "Restaurant Server",
      location: "East Side",
      category: "Hospitality",
      status: "Active",
      postedDate: "2024-01-14",
      applicants: 8
    },
    {
      id: 3,
      title: "Delivery Driver",
      location: "City Center",
      category: "Logistics",
      status: "Closed",
      postedDate: "2024-01-10",
      applicants: 25
    }
  ]);

  const handleDelete = (id: number, title: string) => {
    toast({
      title: "Job Deleted",
      description: `"${title}" has been removed from local jobs.`
    });
  };

  const filteredJobs = localJobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Local Jobs</h1>
          <p className="text-muted-foreground">Manage local job postings in your area</p>
        </div>
        <Button 
          onClick={() => navigate("/local-jobs/new")}
          className="gradient-primary shadow-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Local Job
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardDescription>Total Local Jobs</CardDescription>
            <CardTitle className="text-3xl">{localJobs.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardDescription>Active Jobs</CardDescription>
            <CardTitle className="text-3xl">
              {localJobs.filter(j => j.status === "Active").length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="dashboard-card">
          <CardHeader className="pb-3">
            <CardDescription>Total Applicants</CardDescription>
            <CardTitle className="text-3xl">
              {localJobs.reduce((sum, job) => sum + job.applicants, 0)}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Search Local Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>All Local Jobs</CardTitle>
          <CardDescription>
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead>Applicants</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      No local jobs found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          {job.location}
                        </div>
                      </TableCell>
                      <TableCell>{job.category}</TableCell>
                      <TableCell>
                        <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{job.postedDate}</TableCell>
                      <TableCell>{job.applicants}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate(`/local-jobs/edit/${job.id}`)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(job.id, job.title)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocalJobsList;
