import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileText, 
  Eye, 
  ThumbsUp, 
  Plus, 
  TrendingUp,
  Calendar,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data - in real app, fetch from API
  const stats = {
    totalJobs: 24,
    totalUsers: 1247,
    totalViews: 8942,
    totalLikes: 653,
    activeJobs: 18,
    pendingApplications: 89
  };

  const recentJobs = [
    {
      id: 1,
      title: "Software Engineer - Government Sector",
      category: "Govt Job",
      applications: 45,
      views: 324,
      likes: 28,
      deadline: "2024-10-15"
    },
    {
      id: 2,
      title: "Bank PO Recruitment 2024",
      category: "Banking",
      applications: 67,
      views: 567,
      likes: 42,
      deadline: "2024-10-20"
    },
    {
      id: 3,
      title: "SSC CGL Notification",
      category: "SSC",
      applications: 123,
      views: 892,
      likes: 78,
      deadline: "2024-11-01"
    }
  ];

  const quickActions = [
    {
      title: "Create New Job",
      description: "Add a new job posting",
      icon: Plus,
      href: "/jobs/new",
      color: "bg-primary text-primary-foreground"
    },
    {
      title: "View All Jobs",
      description: "Manage existing jobs",
      icon: FileText,
      href: "/jobs",
      color: "bg-success text-success-foreground"
    },
    {
      title: "User Analytics",
      description: "Check user engagement",
      icon: Users,
      href: "/users",
      color: "bg-warning text-warning-foreground"
    },
    {
      title: "Performance Insights",
      description: "View detailed analytics",
      icon: TrendingUp,
      href: "/analytics",
      color: "bg-purple-500 text-white"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome back, Admin</h2>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your job notifications today.
          </p>
        </div>
        <Button asChild className="gradient-primary shadow-primary hover:opacity-90">
          <Link to="/jobs/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Job
          </Link>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="dashboard-card dashboard-card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobs}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeJobs} active jobs
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-card dashboard-card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-success">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-card dashboard-card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-success">
              +8% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="dashboard-card dashboard-card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLikes}</div>
            <p className="text-xs text-success">
              +15% engagement rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card key={action.title} className="dashboard-card hover-lift cursor-pointer">
              <CardContent className="p-4">
                <Link to={action.href} className="block">
                  <div className={`inline-flex p-3 rounded-lg ${action.color} mb-3`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold mb-1">{action.title}</h4>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Jobs Table */}
      <Card className="dashboard-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Job Posts</CardTitle>
              <CardDescription>
                Your latest job postings and their performance
              </CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link to="/jobs">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium">Job Title</th>
                  <th className="text-left py-3 font-medium">Category</th>
                  <th className="text-center py-3 font-medium">Applications</th>
                  <th className="text-center py-3 font-medium">Views</th>
                  <th className="text-center py-3 font-medium">Likes</th>
                  <th className="text-left py-3 font-medium">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {recentJobs.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-medium">{job.title}</td>
                    <td className="py-3">
                      <span className="inline-flex px-2 py-1 bg-primary-light text-primary text-xs rounded-full">
                        {job.category}
                      </span>
                    </td>
                    <td className="py-3 text-center">{job.applications}</td>
                    <td className="py-3 text-center">{job.views}</td>
                    <td className="py-3 text-center">{job.likes}</td>
                    <td className="py-3 text-muted-foreground">
                      {new Date(job.deadline).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;