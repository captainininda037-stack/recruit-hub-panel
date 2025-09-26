import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  ThumbsUp, 
  ThumbsDown, 
  Share2,
  Calendar,
  Award,
  Target,
  Users
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const Analytics = () => {
  const [timeFilter, setTimeFilter] = useState("7d");

  // Mock analytics data - in real app, fetch from API
  const overviewStats = {
    totalViews: 12547,
    viewsGrowth: 12.5,
    totalLikes: 892,
    likesGrowth: 8.3,
    totalDislikes: 45,
    dislikesGrowth: -15.2,
    totalShares: 234,
    sharesGrowth: 22.1,
    clickThroughRate: 15.8,
    ctrGrowth: 5.7
  };

  // Top performing jobs data
  const topJobs = [
    {
      id: 1,
      title: "SSC CGL Notification 2024",
      category: "SSC",
      views: 2845,
      likes: 234,
      dislikes: 12,
      shares: 89,
      ctr: 23.5,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=80&h=80&fit=crop"
    },
    {
      id: 2,
      title: "Bank PO Recruitment",
      category: "Banking",
      views: 1967,
      likes: 187,
      dislikes: 8,
      shares: 67,
      ctr: 18.9,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop"
    },
    {
      id: 3,
      title: "Railway Technician Jobs",
      category: "Railway",
      views: 1654,
      likes: 145,
      dislikes: 15,
      shares: 43,
      ctr: 16.2,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=80&h=80&fit=crop"
    },
    {
      id: 4,
      title: "Government Software Engineer",
      category: "Govt Job",
      views: 1432,
      likes: 156,
      dislikes: 7,
      shares: 52,
      ctr: 14.8,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
    },
    {
      id: 5,
      title: "Defense Officer Recruitment",
      category: "Defense",
      views: 1287,
      likes: 98,
      dislikes: 3,
      shares: 31,
      ctr: 12.4,
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=80&h=80&fit=crop"
    }
  ];

  // Chart data for views over time
  const viewsData = [
    { date: "Sep 20", views: 420, likes: 32, shares: 12 },
    { date: "Sep 21", views: 532, likes: 41, shares: 18 },
    { date: "Sep 22", views: 687, likes: 55, shares: 22 },
    { date: "Sep 23", views: 759, likes: 62, shares: 28 },
    { date: "Sep 24", views: 834, likes: 71, shares: 31 },
    { date: "Sep 25", views: 901, likes: 85, shares: 35 },
    { date: "Sep 26", views: 1123, likes: 98, shares: 42 }
  ];

  // Category performance data
  const categoryData = [
    { name: "SSC", value: 28, color: "#3B82F6" },
    { name: "Banking", value: 22, color: "#10B981" },
    { name: "Railway", value: 18, color: "#F59E0B" },
    { name: "Govt Job", value: 16, color: "#EF4444" },
    { name: "Defense", value: 10, color: "#8B5CF6" },
    { name: "Others", value: 6, color: "#6B7280" }
  ];

  // Engagement trends
  const engagementData = [
    { month: "Jun", likes: 450, shares: 120, ctr: 12.3 },
    { month: "Jul", likes: 567, shares: 145, ctr: 14.1 },
    { month: "Aug", likes: 723, shares: 189, ctr: 15.8 },
    { month: "Sep", shares: 234, ctr: 15.8 }
  ];

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <TrendingUp className="w-4 h-4 text-success" />
    ) : (
      <TrendingDown className="w-4 h-4 text-destructive" />
    );
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? "text-success" : "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Job engagement metrics and performance insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="dashboard-card dashboard-card-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{overviewStats.totalViews.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </div>
              <Eye className="w-8 h-8 text-primary opacity-20" />
            </div>
            <div className={`flex items-center gap-1 text-sm mt-2 ${getGrowthColor(overviewStats.viewsGrowth)}`}>
              {getGrowthIcon(overviewStats.viewsGrowth)}
              <span>{Math.abs(overviewStats.viewsGrowth)}%</span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card dashboard-card-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{overviewStats.totalLikes.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Likes</div>
              </div>
              <ThumbsUp className="w-8 h-8 text-success opacity-20" />
            </div>
            <div className={`flex items-center gap-1 text-sm mt-2 ${getGrowthColor(overviewStats.likesGrowth)}`}>
              {getGrowthIcon(overviewStats.likesGrowth)}
              <span>{Math.abs(overviewStats.likesGrowth)}%</span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card dashboard-card-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{overviewStats.totalDislikes}</div>
                <div className="text-sm text-muted-foreground">Dislikes</div>
              </div>
              <ThumbsDown className="w-8 h-8 text-destructive opacity-20" />
            </div>
            <div className={`flex items-center gap-1 text-sm mt-2 ${getGrowthColor(overviewStats.dislikesGrowth)}`}>
              {getGrowthIcon(overviewStats.dislikesGrowth)}
              <span>{Math.abs(overviewStats.dislikesGrowth)}%</span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card dashboard-card-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{overviewStats.totalShares}</div>
                <div className="text-sm text-muted-foreground">Total Shares</div>
              </div>
              <Share2 className="w-8 h-8 text-warning opacity-20" />
            </div>
            <div className={`flex items-center gap-1 text-sm mt-2 ${getGrowthColor(overviewStats.sharesGrowth)}`}>
              {getGrowthIcon(overviewStats.sharesGrowth)}
              <span>{Math.abs(overviewStats.sharesGrowth)}%</span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card dashboard-card-hover">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{overviewStats.clickThroughRate}%</div>
                <div className="text-sm text-muted-foreground">Click Rate</div>
              </div>
              <Target className="w-8 h-8 text-purple-500 opacity-20" />
            </div>
            <div className={`flex items-center gap-1 text-sm mt-2 ${getGrowthColor(overviewStats.ctrGrowth)}`}>
              {getGrowthIcon(overviewStats.ctrGrowth)}
              <span>{Math.abs(overviewStats.ctrGrowth)}%</span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Over Time Chart */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Engagement Trends</CardTitle>
            <CardDescription>Daily views, likes, and shares over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="likes" stroke="hsl(var(--success))" strokeWidth={2} />
                <Line type="monotone" dataKey="shares" stroke="hsl(var(--warning))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Views distribution by job category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Jobs */}
      <Card className="dashboard-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-warning" />
                Top Performing Jobs
              </CardTitle>
              <CardDescription>Jobs with highest engagement metrics</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topJobs.map((job, index) => (
              <div
                key={job.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-card-hover transition-colors"
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  {index + 1}
                </div>

                {/* Job Image */}
                <img
                  src={job.image}
                  alt={job.title}
                  className="w-12 h-12 rounded-lg object-cover border"
                />

                {/* Job Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{job.title}</h3>
                  <Badge variant="outline" className="bg-primary-light text-primary">
                    {job.category}
                  </Badge>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold">{job.views.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <Eye className="w-3 h-3" />
                      Views
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-success">{job.likes}</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      Likes
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-warning">{job.shares}</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <Share2 className="w-3 h-3" />
                      Shares
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary">{job.ctr}%</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <Target className="w-3 h-3" />
                      CTR
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Comparison */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Monthly Engagement Comparison</CardTitle>
          <CardDescription>Track engagement growth month over month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="likes" fill="hsl(var(--success))" name="Likes" radius={[4, 4, 0, 0]} />
              <Bar dataKey="shares" fill="hsl(var(--warning))" name="Shares" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;